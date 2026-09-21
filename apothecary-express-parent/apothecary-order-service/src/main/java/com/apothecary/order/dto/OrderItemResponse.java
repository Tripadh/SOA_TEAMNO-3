package com.apothecary.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
    private Long orderItemId;
    private Long medicineId;
    private String medicineName;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;
}
