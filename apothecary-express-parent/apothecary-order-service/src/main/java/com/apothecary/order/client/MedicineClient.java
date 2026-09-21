package com.apothecary.order.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;

@FeignClient(name = "MEDICINE-SERVICE")
public interface MedicineClient {

    @GetMapping("/api/medicines/{id}")
    MedicineDto getMedicineById(@PathVariable("id") Long id);

    @PostMapping("/api/medicines/{id}/reserve")
    void reserveStock(@PathVariable("id") Long id, @RequestParam("quantity") Integer quantity);

    @PostMapping("/api/medicines/{id}/restore")
    void restoreStock(@PathVariable("id") Long id, @RequestParam("quantity") Integer quantity);
    
    // Using a nested static class/record for simplicity
    class MedicineDto {
        private Long medicineId;
        private String name;
        private BigDecimal price;

        public Long getMedicineId() { return medicineId; }
        public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
    }
}
