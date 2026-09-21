package com.apothecary.order.service;

import com.apothecary.order.client.MedicineClient;
import com.apothecary.order.dto.OrderItemRequest;
import com.apothecary.order.dto.OrderRequest;
import com.apothecary.order.dto.OrderResponse;
import com.apothecary.order.entity.Order;
import com.apothecary.order.entity.OrderStatus;
import com.apothecary.order.exception.UnauthorizedOrderAccessException;
import com.apothecary.order.repository.OrderRepository;
import feign.FeignException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private MedicineClient medicineClient;

    @InjectMocks
    private OrderService orderService;

    private OrderRequest orderRequest;
    private MedicineClient.MedicineDto medicineDto;
    private Order savedOrder;

    @BeforeEach
    void setUp() {
        OrderItemRequest itemRequest = new OrderItemRequest();
        itemRequest.setMedicineId(1L);
        itemRequest.setQuantity(2);

        orderRequest = new OrderRequest();
        orderRequest.setItems(List.of(itemRequest));

        medicineDto = new MedicineClient.MedicineDto();
        medicineDto.setMedicineId(1L);
        medicineDto.setName("Paracetamol");
        medicineDto.setPrice(new BigDecimal("50.00"));

        savedOrder = Order.builder()
                .orderId(100L)
                .userId(1L)
                .orderStatus(OrderStatus.CONFIRMED)
                .totalAmount(new BigDecimal("100.00"))
                .build();
    }

    @Test
    void testSuccessfulOrderCreation() {
        when(medicineClient.getMedicineById(1L)).thenReturn(medicineDto);
        doNothing().when(medicineClient).reserveStock(1L, 2);
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        OrderResponse response = orderService.createOrder(1L, orderRequest);

        assertNotNull(response);
        assertEquals(100L, response.getOrderId());
        verify(medicineClient, times(1)).reserveStock(1L, 2);
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void testInsufficientStockOrderCreation() {
        when(medicineClient.getMedicineById(1L)).thenReturn(medicineDto);
        
        FeignException.Conflict feignConflict = mock(FeignException.Conflict.class);
        doThrow(feignConflict).when(medicineClient).reserveStock(1L, 2);

        assertThrows(FeignException.Conflict.class, () -> orderService.createOrder(1L, orderRequest));
        
        verify(medicineClient, times(1)).reserveStock(1L, 2);
        verify(orderRepository, never()).save(any(Order.class));
    }

    @Test
    void testOrderOwnershipAuthorized() {
        when(orderRepository.findById(100L)).thenReturn(Optional.of(savedOrder));

        OrderResponse response = orderService.getOrderById(100L, 1L, "USER");

        assertNotNull(response);
        assertEquals(100L, response.getOrderId());
    }

    @Test
    void testOrderOwnershipUnauthorized() {
        when(orderRepository.findById(100L)).thenReturn(Optional.of(savedOrder));

        assertThrows(UnauthorizedOrderAccessException.class, () -> orderService.getOrderById(100L, 2L, "USER"));
    }

    @Test
    void testAdminOrderAccess() {
        when(orderRepository.findById(100L)).thenReturn(Optional.of(savedOrder));

        // Admin can access any order
        OrderResponse response = orderService.getOrderById(100L, 2L, "ADMIN");

        assertNotNull(response);
        assertEquals(100L, response.getOrderId());
    }
}
