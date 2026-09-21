package com.apothecary.medicine.controller;

import com.apothecary.medicine.dto.MedicineRequest;
import com.apothecary.medicine.dto.MedicineResponse;
import com.apothecary.medicine.dto.StockUpdateRequest;
import com.apothecary.medicine.service.MedicineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
public class MedicineController {

    private final MedicineService medicineService;

    // Public APIs
    @GetMapping
    public ResponseEntity<List<MedicineResponse>> getAllMedicines() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineResponse> getMedicineById(@PathVariable Long id) {
        return ResponseEntity.ok(medicineService.getMedicineById(id));
    }

    // Admin APIs (protected by Gateway)
    @PostMapping
    public ResponseEntity<MedicineResponse> createMedicine(@Valid @RequestBody MedicineRequest request) {
        return new ResponseEntity<>(medicineService.createMedicine(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineResponse> updateMedicine(
            @PathVariable Long id,
            @Valid @RequestBody MedicineRequest request) {
        return ResponseEntity.ok(medicineService.updateMedicine(id, request));
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<MedicineResponse> updateStock(
            @PathVariable Long id,
            @Valid @RequestBody StockUpdateRequest request) {
        return ResponseEntity.ok(medicineService.updateStock(id, request));
    }

    // Internal inter-service APIs
    @PostMapping("/{id}/reserve")
    public ResponseEntity<Void> reserveStock(
            @PathVariable Long id,
            @RequestParam Integer quantity) {
        medicineService.reserveStock(id, quantity);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/restore")
    public ResponseEntity<Void> restoreStock(
            @PathVariable Long id,
            @RequestParam Integer quantity) {
        medicineService.restoreStock(id, quantity);
        return ResponseEntity.ok().build();
    }
}
