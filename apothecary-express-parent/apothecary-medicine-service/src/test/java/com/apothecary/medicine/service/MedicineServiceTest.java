package com.apothecary.medicine.service;

import com.apothecary.medicine.dto.MedicineRequest;
import com.apothecary.medicine.dto.MedicineResponse;
import com.apothecary.medicine.dto.StockUpdateRequest;
import com.apothecary.medicine.entity.Medicine;
import com.apothecary.medicine.exception.InsufficientStockException;
import com.apothecary.medicine.exception.MedicineNotFoundException;
import com.apothecary.medicine.repository.MedicineRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MedicineServiceTest {

    @Mock
    private MedicineRepository medicineRepository;

    @InjectMocks
    private MedicineService medicineService;

    private Medicine medicine;
    private MedicineRequest medicineRequest;

    @BeforeEach
    void setUp() {
        medicine = Medicine.builder()
                .medicineId(1L)
                .name("Paracetamol")
                .category("Pain Relief")
                .price(new BigDecimal("50.00"))
                .stockQuantity(100)
                .prescriptionRequired(false)
                .build();

        medicineRequest = new MedicineRequest();
        medicineRequest.setName("Paracetamol");
        medicineRequest.setCategory("Pain Relief");
        medicineRequest.setPrice(new BigDecimal("50.00"));
        medicineRequest.setStockQuantity(100);
        medicineRequest.setPrescriptionRequired(false);
    }

    @Test
    void testMedicineCreation() {
        when(medicineRepository.save(any(Medicine.class))).thenReturn(medicine);

        MedicineResponse response = medicineService.createMedicine(medicineRequest);

        assertNotNull(response);
        assertEquals("Paracetamol", response.getName());
        verify(medicineRepository, times(1)).save(any(Medicine.class));
    }

    @Test
    void testMedicineRetrieval() {
        when(medicineRepository.findById(1L)).thenReturn(Optional.of(medicine));

        MedicineResponse response = medicineService.getMedicineById(1L);

        assertNotNull(response);
        assertEquals(1L, response.getMedicineId());
        verify(medicineRepository, times(1)).findById(1L);
    }

    @Test
    void testMedicineRetrievalNotFound() {
        when(medicineRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(MedicineNotFoundException.class, () -> medicineService.getMedicineById(1L));
    }

    @Test
    void testStockUpdate() {
        when(medicineRepository.existsById(1L)).thenReturn(true);
        when(medicineRepository.updateStock(1L, 150)).thenReturn(1);
        when(medicineRepository.findById(1L)).thenReturn(Optional.of(medicine));

        StockUpdateRequest updateRequest = new StockUpdateRequest();
        updateRequest.setStockQuantity(150);

        medicineService.updateStock(1L, updateRequest);

        verify(medicineRepository, times(1)).updateStock(1L, 150);
    }

    @Test
    void testSuccessfulStockReservation() {
        when(medicineRepository.existsById(1L)).thenReturn(true);
        when(medicineRepository.reserveStock(1L, 10)).thenReturn(1);

        assertDoesNotThrow(() -> medicineService.reserveStock(1L, 10));
    }

    @Test
    void testInsufficientStockReservation() {
        when(medicineRepository.existsById(1L)).thenReturn(true);
        when(medicineRepository.reserveStock(1L, 110)).thenReturn(0); // Assuming stock is 100

        assertThrows(InsufficientStockException.class, () -> medicineService.reserveStock(1L, 110));
    }
}
