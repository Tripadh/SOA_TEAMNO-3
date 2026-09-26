/**
 * Realistic Mock Data for Apothecary Express Clinical Platform
 * Matching Stitch Project ID: 9259884318619257055
 */

export const systemStatus = {
  servicesOnline: 6,
  totalServices: 6,
  statusText: 'SERVICES ACTIVE: 6/6 ONLINE',
  nodeAudit: 'US-EAST-VA-09',
  securityLevel: 'SECURITY LEVEL 4',
  hsmStatus: 'Dual-Key HSM Active',
  lastSyncTime: '14:02 UTC',
  hsmVerification: 'Dual-Key Verified 14:02 UTC',
  pharmacist: {
    name: 'Dr. Evelyn Vance, PharmD',
    role: 'Chief Clinical Pharmacist',
    license: 'RPH-884920',
    avatarText: 'EV'
  }
};

export const microservicesRegistry = [
  {
    id: 'svc-gateway',
    name: 'Spring Cloud Gateway',
    port: 8080,
    role: 'API Routing & JWT Validation',
    latency: '12ms',
    uptime: '99.98%',
    status: 'ONLINE',
    discovery: 'EUREKA-REGISTERED'
  },
  {
    id: 'svc-eureka',
    name: 'Eureka Discovery Server',
    port: 8761,
    role: 'Service Registry & Heartbeat',
    latency: '8ms',
    uptime: '100%',
    status: 'ONLINE',
    discovery: 'CLUSTER-PRIMARY'
  },
  {
    id: 'svc-medicine',
    name: 'Medicine Catalog Service',
    port: 8081,
    role: 'Regulatory Formulary & Stock DB',
    latency: '15ms',
    uptime: '99.95%',
    status: 'ONLINE',
    discovery: 'EUREKA-REGISTERED'
  },
  {
    id: 'svc-order',
    name: 'Order & Telemetry Service',
    port: 8082,
    role: 'Dispatch & Cold-Chain Telemetry',
    latency: '18ms',
    uptime: '99.92%',
    status: 'ONLINE',
    discovery: 'EUREKA-REGISTERED'
  },
  {
    id: 'svc-coldchain',
    name: 'Cold-Chain IoT Vault Service',
    port: 8083,
    role: 'Real-Time Temperature & GPS Stream',
    latency: '11ms',
    uptime: '99.99%',
    status: 'ONLINE',
    discovery: 'EUREKA-REGISTERED'
  },
  {
    id: 'svc-ledger',
    name: 'Cryptographic Ledger Service',
    port: 8084,
    role: 'SHA-256 Chain of Custody & Audit',
    latency: '22ms',
    uptime: '100%',
    status: 'ONLINE',
    discovery: 'EUREKA-REGISTERED'
  }
];

export const pharmacyMetrics = [
  {
    id: 'metric-meds',
    title: 'Total Medicines',
    value: '1,248',
    delta: '+14 this week',
    deltaType: 'positive',
    icon: 'medication',
    subtext: '99.2% in active formulary'
  },
  {
    id: 'metric-orders',
    title: 'Active Orders',
    value: '86',
    delta: '+8 in transit',
    deltaType: 'positive',
    icon: 'package_2',
    subtext: '14 cold-chain priority'
  },
  {
    id: 'metric-stock',
    title: 'Low Stock Alerts',
    value: '12',
    delta: 'Critical Lot Replenishment',
    deltaType: 'critical',
    icon: 'warning',
    subtext: '3 emergency orders auto-drafted'
  },
  {
    id: 'metric-fulfillment',
    title: 'Fulfillment Rate',
    value: '99.4%',
    delta: '+1.4% vs SLA target',
    deltaType: 'positive',
    icon: 'verified',
    subtext: 'Zero cold-chain deviations'
  }
];

export const inventoryMovementChart = {
  unitsIngested: '4,892',
  unitsDispensed: '4,110',
  bufferExpansion: '+782',
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Dispensed Stock', values: [310, 390, 420, 580, 520, 610] },
    { name: 'Stock Added', values: [420, 480, 510, 640, 590, 720] },
    { name: 'Stock Reserved', values: [180, 210, 240, 310, 290, 360] }
  ]
};

export const fulfillmentFunnel = [
  { stage: '1. Prescribed', count: '142 Orders', pct: '100%', color: '#712edd' },
  { stage: '2. Clinical Validation', count: '128 Verified', pct: '90%', color: '#8b4ef7' },
  { stage: '3. Cold-Chain Pack', count: '98 Sealed', pct: '69%', color: '#a77bf9' },
  { stage: '4. In Transit', count: '86 En Route', pct: '61%', color: '#bdc2ff' },
  { stage: '5. Handshake Delivered', count: '74 Confirmed', pct: '52%', color: '#10b981' }
];

export const recentOrdersSummary = [
  {
    orderId: '#AE-1082',
    medicine: 'Atorvastatin Calcium 20mg',
    stage: 'In Transit',
    stageType: 'warning',
    eta: 'ETA 14:30 EST',
    carrier: 'MedExpress Fleet #07',
    temp: '18.4°C Ambient'
  },
  {
    orderId: '#AE-1081',
    medicine: 'Humira Pen 40mg/0.8mL',
    stage: 'Cold-Chain Pack',
    stageType: 'protocol',
    eta: 'Sealed & Monitored',
    carrier: 'CryoVault Spec #2',
    temp: '3.8°C Controlled'
  },
  {
    orderId: '#AE-1080',
    medicine: 'Metformin HCl 500mg',
    stage: 'Delivered',
    stageType: 'optimal',
    eta: 'Custody Confirmed',
    carrier: 'Mercy General Node',
    temp: '21.0°C Ambient'
  }
];

export const inventoryAlerts = [
  {
    id: 'alt-1',
    title: 'Amoxicillin 500mg Trihydrate',
    status: 'Low Stock Alert',
    statusType: 'critical',
    detail: '24 units remaining in primary dispensing carousel. Buffer depleted.',
    reorderRef: '#RO-8912',
    actionText: 'Authorize Lot Replenish'
  },
  {
    id: 'alt-2',
    title: 'Insulin Glargine 100 U/mL',
    status: 'Cold-Chain Warning',
    statusType: 'warning',
    detail: 'Vault sensor 04 reading 7.9°C (Safe threshold: 2.0°C - 8.0°C). Automated compressor ramp initiated.',
    reorderRef: '#SENSOR-V04',
    actionText: 'Inspect Cryo Node'
  },
  {
    id: 'alt-3',
    title: 'Omeprazole DR 20mg Pellets',
    status: 'Batch Replenished',
    statusType: 'optimal',
    detail: 'Lot #LOT-9824-VA with 890 units released into Tier-1 formulation catalog following 21 CFR Part 11 audit.',
    reorderRef: '#LOT-9824-VA',
    actionText: 'View Release Hash'
  }
];

export const medicineCatalog = [
  {
    id: 'med-1',
    name: 'Paracetamol 500mg',
    activeIngredient: 'Acetaminophen Active Core',
    manufacturer: 'GlaxoSmithKline Healthcare',
    category: 'Over The Counter (OTC)',
    ndc: '50458-578-01',
    lotNumber: 'LOT-PR-4011',
    dosageForm: 'Oral Tablet',
    stock: 4820,
    minThreshold: 800,
    storageTemp: '15°C – 25°C Ambient',
    price: 4.25,
    unit: '100 tab box',
    status: 'Optimal Stock',
    statusType: 'optimal',
    badge: 'OTC Form',
    icon: 'medication',
    iconBg: '#ebddff',
    iconColor: '#712edd',
    sparkline: [42, 45, 48, 52, 50, 56, 58],
    description: 'First-line antipyretic and analgesic oral solid dosage form with validated dissolution profile.'
  },
  {
    id: 'med-2',
    name: 'Amoxicillin Trihydrate 500mg',
    activeIngredient: 'Trihydrate Beta-Lactam',
    manufacturer: 'Pfizer Clinical Operations',
    category: 'Prescription Only (Rx)',
    isCritical: true,
    ndc: '00093-3109-53',
    lotNumber: 'LOT-AM-8912',
    dosageForm: 'Oral Capsule',
    stock: 24,
    minThreshold: 200,
    storageTemp: '20°C – 25°C Controlled',
    price: 12.80,
    unit: '50 cap bottle',
    status: 'Critical Low Stock',
    statusType: 'critical',
    badge: 'Rx Only',
    icon: 'vaccines',
    iconBg: '#ffdad6',
    iconColor: '#991b1b',
    sparkline: [85, 70, 55, 38, 30, 26, 24],
    description: 'Broad-spectrum aminopenicillin formulation indicated for severe bacterial infections. Quarantine buffer active.'
  },
  {
    id: 'med-3',
    name: 'Cetirizine HCl 10mg',
    activeIngredient: 'Second-Gen H1 Antagonist',
    manufacturer: 'Johnson & Johnson Med',
    category: 'Over The Counter (OTC)',
    ndc: '50580-726-30',
    lotNumber: 'LOT-CT-2204',
    dosageForm: 'Film-coated Tablet',
    stock: 1940,
    minThreshold: 400,
    storageTemp: '20°C – 25°C Ambient',
    price: 8.50,
    unit: '30 tab blister',
    status: 'Optimal Stock',
    statusType: 'optimal',
    badge: 'OTC Form',
    icon: 'science',
    iconBg: '#e2e8f8',
    iconColor: '#0c1352',
    sparkline: [30, 32, 34, 38, 42, 45, 48],
    description: 'Selective peripheral histamine H1-receptor antagonist for allergic rhinitis and chronic urticaria.'
  },
  {
    id: 'med-4',
    name: 'Azithromycin 250mg',
    activeIngredient: 'Macrolide Antibiotic',
    manufacturer: 'Teva Pharmaceuticals',
    category: 'Prescription Only (Rx)',
    ndc: '00093-7146-18',
    lotNumber: 'LOT-AZ-9930',
    dosageForm: 'Film-coated Tablet',
    stock: 612,
    minThreshold: 150,
    storageTemp: '15°C – 30°C Controlled Room',
    price: 28.40,
    unit: '6 tab Z-Pak',
    status: 'Sufficient Stock',
    statusType: 'optimal',
    badge: 'Rx Only',
    icon: 'biotech',
    iconBg: '#ebddff',
    iconColor: '#712edd',
    sparkline: [60, 58, 62, 65, 63, 67, 69],
    description: 'Sub-class azalide macrolide for systemic respiratory tract and dermatological bacterial infections.'
  },
  {
    id: 'med-5',
    name: 'Omeprazole DR 20mg',
    activeIngredient: 'Delayed-Release Pellets',
    manufacturer: 'AstraZeneca Formulation',
    category: 'Cold Chain Monitored',
    ndc: '68180-478-01',
    lotNumber: 'LOT-OM-6671',
    dosageForm: 'Delayed-Release Capsule',
    stock: 890,
    minThreshold: 250,
    storageTemp: '15°C – 30°C Light-Resistant',
    price: 14.10,
    unit: '28 cap bottle',
    status: 'Optimal Stock',
    statusType: 'optimal',
    badge: 'Institutional Rx',
    icon: 'healing',
    iconBg: '#e2e8f8',
    iconColor: '#712edd',
    sparkline: [40, 44, 46, 50, 55, 60, 64],
    description: 'Proton pump inhibitor formulated with enteric-coated granules for sustained intragastric pH control.'
  },
  {
    id: 'med-6',
    name: 'Ibuprofen 400mg',
    activeIngredient: 'NSAID Anti-inflammatory',
    manufacturer: 'Bayer Health Systems',
    category: 'Over The Counter (OTC)',
    ndc: '50090-0012-00',
    lotNumber: 'LOT-IB-5519',
    dosageForm: 'Film-coated Tablet',
    stock: 3450,
    minThreshold: 600,
    storageTemp: '20°C – 25°C Ambient',
    price: 6.75,
    unit: '100 tab bottle',
    status: 'High Velocity Stock',
    statusType: 'optimal',
    badge: 'OTC Form',
    icon: 'medication',
    iconBg: '#ebddff',
    iconColor: '#712edd',
    sparkline: [70, 75, 78, 82, 85, 89, 92],
    description: 'Propionic acid derivative NSAID with validated rapid-dissolution bioavailability kinetics.'
  }
];

export const masterTrackingOrder = {
  orderId: '#AE-1001',
  orderDate: 'September 26, 2026',
  origin: {
    hubName: 'Regional Hub Alpha',
    location: 'Richmond, VA Dispense Node',
    timestamp: '10:15 EST'
  },
  destination: {
    hospitalName: 'Mercy General Hospital',
    department: 'Inpatient Clinical Pharmacy Node',
    address: '2140 K Street NW, Washington, DC 20037',
    eta: '14:45 EST (32 min remaining)'
  },
  status: 'IN TRANSIT (COURIER #7)',
  statusType: 'warning',
  carrier: 'MedExpress CryoSecure Fleet #04',
  courierOfficer: 'Officer Marcus Kane (Badge #CS-409)',
  telemetry: {
    vaultTemp: '4.2°C',
    vaultTempThreshold: '2.0°C – 8.0°C (Safe Band)',
    humidity: '42% RH',
    batteryReserve: '94%',
    shockTilt: '0.02G (Nominal)',
    geofenceStatus: 'LOCKED & MONITORED',
    speed: '48 mph',
    currentLocation: 'I-95 Corridor / Mile Marker 142.4 N'
  },
  steps: [
    {
      step: 1,
      title: 'Order Received',
      timestamp: '10:15 EST',
      status: 'completed',
      detail: 'Requisition cryptographically signed via Spring Cloud Gateway.'
    },
    {
      step: 2,
      title: 'Clinical Review',
      timestamp: '10:42 EST',
      status: 'completed',
      detail: 'Formulary validation approved by Dr. Evelyn Vance, PharmD.'
    },
    {
      step: 3,
      title: 'Cold-Chain Packaging',
      timestamp: '11:30 EST',
      status: 'completed',
      detail: 'Lot sealed in calibrated cryogenic thermal transport container.'
    },
    {
      step: 4,
      title: 'Dispatch & Transit',
      timestamp: '12:15 EST',
      status: 'active',
      detail: 'Vehicle #04 en route with active telemetry and dual-key custody lock.'
    },
    {
      step: 5,
      title: 'Final Handshake Delivery',
      timestamp: 'Expected 14:45 EST',
      status: 'pending',
      detail: 'Mercy General Pharmacy dual-signature physical handoff required.'
    }
  ],
  manifest: [
    {
      name: 'Humira (adalimumab) 40mg/0.8mL Pen',
      ndc: '0074-3799-02',
      lot: 'LOT-HM-9021',
      qty: '4 Pens',
      temp: '2°C – 8°C Cryo Monitored',
      verification: 'Cryptographically Sealed',
      verificationStatus: 'optimal'
    },
    {
      name: 'Atorvastatin Calcium 20mg Tablets',
      ndc: '0071-0156-23',
      lot: 'LOT-AT-4412',
      qty: '90 Tabs',
      temp: '15°C – 25°C Ambient',
      verification: 'Barcode Verified',
      verificationStatus: 'optimal'
    },
    {
      name: 'Amoxicillin Trihydrate 500mg Capsules',
      ndc: '0093-3109-53',
      lot: 'LOT-AM-1108',
      qty: '40 Caps',
      temp: '20°C – 25°C Controlled',
      verification: 'Barcode Verified',
      verificationStatus: 'optimal'
    }
  ],
  pharmacistSignature: {
    signer: 'Dr. Evelyn Vance, PharmD',
    role: 'Chief Clinical Pharmacist',
    license: 'RPH-884920',
    timestamp: '2026-09-26T10:42:00Z',
    hash: 'SHA256: 8f4b1e9...c72a'
  },
  hospitalHandshake: {
    receiver: 'Mercy General Inpatient Node',
    chiefPharmacist: 'Dr. Robert Chen, PharmD',
    facilityId: 'MGH-RX-9901',
    status: 'Pending Courier Physical Arrival'
  }
};
