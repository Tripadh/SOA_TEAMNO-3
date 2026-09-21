package com.apothecary.order.service;

import com.apothecary.order.client.MedicineClient;
import com.apothecary.order.dto.*;
import com.apothecary.order.entity.Order;
import com.apothecary.order.entity.OrderItem;
import com.apothecary.order.entity.OrderStatus;
import com.apothecary.order.exception.OrderNotFoundException;
import com.apothecary.order.exception.UnauthorizedOrderAccessException;
import com.apothecary.order.repository.OrderRepository;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final MedicineClient medicineClient;

    @Transactional
    public OrderResponse createOrder(Long userId, OrderRequest request) {
        log.info("Creating order for user ID: {}", userId);

        Order order = Order.builder()
                .userId(userId)
                .orderStatus(OrderStatus.CONFIRMED)
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItemRequest> successfullyReservedItems = new ArrayList<>();

        try {
            for (OrderItemRequest itemRequest : request.getItems()) {
                // 1. Get Medicine Info
                MedicineClient.MedicineDto medicine = medicineClient.getMedicineById(itemRequest.getMedicineId());

                // 2. Reserve Stock
                medicineClient.reserveStock(itemRequest.getMedicineId(), itemRequest.getQuantity());
                successfullyReservedItems.add(itemRequest);

                // 3. Calculate Subtotal
                BigDecimal subtotal = medicine.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
                totalAmount = totalAmount.add(subtotal);

                // 4. Create OrderItem
                OrderItem orderItem = OrderItem.builder()
                        .medicineId(medicine.getMedicineId())
                        .medicineName(medicine.getName())
                        .unitPrice(medicine.getPrice())
                        .quantity(itemRequest.getQuantity())
                        .subtotal(subtotal)
                        .build();

                order.addOrderItem(orderItem);
            }
        } catch (FeignException e) {
            log.error("Error during order creation, reverting successfully reserved items", e);
            // Compensation strategy: restore successfully reserved items
            for (OrderItemRequest reservedItem : successfullyReservedItems) {
                try {
                    medicineClient.restoreStock(reservedItem.getMedicineId(), reservedItem.getQuantity());
                } catch (Exception ex) {
                    log.error("Failed to restore stock for medicine ID: {} during compensation", reservedItem.getMedicineId(), ex);
                }
            }
            throw e; // Rethrow to be handled by GlobalExceptionHandler
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);
        log.info("Order successfully created with ID: {}", savedOrder.getOrderId());
        
        return mapToResponse(savedOrder);
    }

    public OrderResponse getOrderById(Long orderId, Long authenticatedUserId, String role) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));

        if (!role.equals("ADMIN") && !order.getUserId().equals(authenticatedUserId)) {
            throw new UnauthorizedOrderAccessException("You are not authorized to view this order.");
        }

        return mapToResponse(order);
    }

    public List<OrderResponse> getMyOrders(Long authenticatedUserId) {
        return orderRepository.findByUserId(authenticatedUserId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));

        order.setOrderStatus(status);
        Order savedOrder = orderRepository.save(order);
        
        return mapToResponse(savedOrder);
    }

    private OrderResponse mapToResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .orderItemId(item.getOrderItemId())
                        .medicineId(item.getMedicineId())
                        .medicineName(item.getMedicineName())
                        .unitPrice(item.getUnitPrice())
                        .quantity(item.getQuantity())
                        .subtotal(item.getSubtotal())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .orderStatus(order.getOrderStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .items(itemResponses)
                .build();
    }
}
