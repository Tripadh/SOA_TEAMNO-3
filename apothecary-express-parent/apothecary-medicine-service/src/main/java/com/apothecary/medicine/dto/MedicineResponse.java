package com.apothecary.medicine.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicineResponse {
    private Long medicineId;
    private String name;
    private String category;
    private BigDecimal price;
    private Integer stockQuantity;
    private Boolean prescriptionRequired;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
