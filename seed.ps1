$medicines = @(
    @{ name="Paracetamol 500mg"; category="Pain Relief"; price=25.50; stockQuantity=100; prescriptionRequired=$false },
    @{ name="Amoxicillin 250mg"; category="Antibiotics"; price=120.00; stockQuantity=50; prescriptionRequired=$true },
    @{ name="Cetirizine 10mg"; category="Allergy"; price=15.00; stockQuantity=200; prescriptionRequired=$false },
    @{ name="Omeprazole 20mg"; category="Digestion"; price=45.00; stockQuantity=80; prescriptionRequired=$false },
    @{ name="Ibuprofen 400mg"; category="Pain Relief"; price=35.00; stockQuantity=150; prescriptionRequired=$false },
    @{ name="Azithromycin 500mg"; category="Antibiotics"; price=250.00; stockQuantity=30; prescriptionRequired=$true },
    @{ name="Vitamin C 1000mg"; category="Supplements"; price=60.00; stockQuantity=300; prescriptionRequired=$false },
    @{ name="Aspirin 75mg"; category="Heart Health"; price=20.00; stockQuantity=120; prescriptionRequired=$false },
    @{ name="Atorvastatin 10mg"; category="Cholesterol"; price=180.00; stockQuantity=90; prescriptionRequired=$true },
    @{ name="Metformin 500mg"; category="Diabetes"; price=40.00; stockQuantity=110; prescriptionRequired=$true }
)

foreach ($med in $medicines) {
    $json = $med | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:8082/api/medicines" -Method Post -Body $json -ContentType "application/json"
}
