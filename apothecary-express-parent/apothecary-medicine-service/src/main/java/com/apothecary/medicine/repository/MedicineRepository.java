package com.apothecary.medicine.repository;

import com.apothecary.medicine.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Medicine m SET m.stockQuantity = m.stockQuantity - :quantity WHERE m.medicineId = :medicineId AND m.stockQuantity >= :quantity")
    int reserveStock(@Param("medicineId") Long medicineId, @Param("quantity") Integer quantity);

    @Modifying
    @Transactional
    @Query("UPDATE Medicine m SET m.stockQuantity = m.stockQuantity + :quantity WHERE m.medicineId = :medicineId")
    int restoreStock(@Param("medicineId") Long medicineId, @Param("quantity") Integer quantity);
    
    @Modifying
    @Transactional
    @Query("UPDATE Medicine m SET m.stockQuantity = :newStock WHERE m.medicineId = :medicineId")
    int updateStock(@Param("medicineId") Long medicineId, @Param("newStock") Integer newStock);
}
