package com.apothecary.order.dto;

import com.apothecary.order.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderStatusUpdateRequest {
    
    @NotNull(message = "Order status is required")
    private OrderStatus status;
}
