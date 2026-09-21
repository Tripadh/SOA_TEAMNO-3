package com.apothecary.medicine.service;

import com.apothecary.medicine.dto.MedicineRequest;
import com.apothecary.medicine.dto.MedicineResponse;
import com.apothecary.medicine.dto.StockUpdateRequest;
import com.apothecary.medicine.entity.Medicine;
import com.apothecary.medicine.exception.InsufficientStockException;
import com.apothecary.medicine.exception.MedicineNotFoundException;
import com.apothecary.medicine.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public List<MedicineResponse> getAllMedicines() {
        return medicineRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public MedicineResponse getMedicineById(Long id) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found with ID: " + id));
        return mapToResponse(medicine);
    }

    public MedicineResponse createMedicine(MedicineRequest request) {
        Medicine medicine = Medicine.builder()
                .name(request.getName())
                .category(request.getCategory())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .prescriptionRequired(request.getPrescriptionRequired())
                .build();

        Medicine savedMedicine = medicineRepository.save(medicine);
        return mapToResponse(savedMedicine);
    }

    public MedicineResponse updateMedicine(Long id, MedicineRequest request) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new MedicineNotFoundException("Medicine not found with ID: " + id));

        medicine.setName(request.getName());
        medicine.setCategory(request.getCategory());
        medicine.setPrice(request.getPrice());
        medicine.setStockQuantity(request.getStockQuantity());
        medicine.setPrescriptionRequired(request.getPrescriptionRequired());

        Medicine updatedMedicine = medicineRepository.save(medicine);
        return mapToResponse(updatedMedicine);
    }

    public MedicineResponse updateStock(Long id, StockUpdateRequest request) {
        if (!medicineRepository.existsById(id)) {
            throw new MedicineNotFoundException("Medicine not found with ID: " + id);
        }
        
        medicineRepository.updateStock(id, request.getStockQuantity());
        
        return getMedicineById(id);
    }

    public void reserveStock(Long id, Integer quantity) {
        if (!medicineRepository.existsById(id)) {
            throw new MedicineNotFoundException("Medicine not found with ID: " + id);
        }

        int affectedRows = medicineRepository.reserveStock(id, quantity);
        
        if (affectedRows == 0) {
            throw new InsufficientStockException("Insufficient stock for medicine ID: " + id);
        }
    }

    public void restoreStock(Long id, Integer quantity) {
        if (!medicineRepository.existsById(id)) {
            throw new MedicineNotFoundException("Medicine not found with ID: " + id);
        }

        medicineRepository.restoreStock(id, quantity);
    }

    private MedicineResponse mapToResponse(Medicine medicine) {
        return MedicineResponse.builder()
                .medicineId(medicine.getMedicineId())
                .name(medicine.getName())
                .category(medicine.getCategory())
                .price(medicine.getPrice())
                .stockQuantity(medicine.getStockQuantity())
                .prescriptionRequired(medicine.getPrescriptionRequired())
                .createdAt(medicine.getCreatedAt())
                .updatedAt(medicine.getUpdatedAt())
                .build();
    }
}
