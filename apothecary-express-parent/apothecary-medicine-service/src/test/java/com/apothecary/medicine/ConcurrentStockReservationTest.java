package com.apothecary.medicine;

import com.apothecary.medicine.entity.Medicine;
import com.apothecary.medicine.repository.MedicineRepository;
import com.apothecary.medicine.service.MedicineService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class ConcurrentStockReservationTest {

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private MedicineRepository medicineRepository;

    private Long medicineId;

    @BeforeEach
    void setUp() {
        Medicine medicine = Medicine.builder()
                .name("Paracetamol")
                .category("Pain Relief")
                .price(new BigDecimal("50.00"))
                .stockQuantity(10) // Only 10 in stock
                .prescriptionRequired(false)
                .build();
        Medicine savedMedicine = medicineRepository.save(medicine);
        medicineId = savedMedicine.getMedicineId();
    }

    @AfterEach
    void tearDown() {
        medicineRepository.deleteAll();
    }

    @Test
    void testConcurrentStockReservationPreventsNegativeStock() throws InterruptedException {
        int numberOfThreads = 20; // 20 threads trying to reserve 1 item each
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfThreads);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);
        
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failCount = new AtomicInteger(0);

        for (int i = 0; i < numberOfThreads; i++) {
            executorService.submit(() -> {
                try {
                    medicineService.reserveStock(medicineId, 1);
                    successCount.incrementAndGet();
                } catch (Exception e) {
                    failCount.incrementAndGet();
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executorService.shutdown();

        Medicine updatedMedicine = medicineRepository.findById(medicineId).get();

        // Exactly 10 should succeed, 10 should fail, and stock should be 0, not negative
        assertEquals(10, successCount.get());
        assertEquals(10, failCount.get());
        assertEquals(0, updatedMedicine.getStockQuantity());
        assertTrue(updatedMedicine.getStockQuantity() >= 0);
    }
}
