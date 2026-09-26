import { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import DataTable from '../components/DataTable';
import MetricCard from '../components/MetricCard';
import { microservicesRegistry, systemStatus } from '../data/mockData';
import './ClinicalIntelligence.css';

const LOT_LEDGER = [
  {
    lotId: 'LOT-HM-9021',
    medicine: 'Humira Pen 40mg/0.8mL',
    origin: 'Richmond VA Node',
    destination: 'Mercy General Hospital',
    hash: '8f4b1e9021c72a88301b',
    timestamp: '2026-09-26 11:30 EST',
    temp: '3.8°C (Nominal)',
    status: 'Cryptographically Released',
    statusType: 'optimal'
  },
  {
    lotId: 'LOT-AM-8912',
    medicine: 'Amoxicillin 500mg Trihydrate',
    origin: 'Baltimore MD Hub',
    destination: 'Tier-1 Inpatient Dispense',
    hash: '3d91cf028912ba44771e',
    timestamp: '2026-09-26 09:14 EST',
    temp: '21.4°C (Ambient)',
    status: 'Buffer Replenish Drafted',
    statusType: 'warning'
  },
  {
    lotId: 'LOT-PR-4011',
    medicine: 'Paracetamol 500mg Tablets',
    origin: 'Philadelphia PA Center',
    destination: 'Regional Formulary Pool',
    hash: '55bc711e4011ff889021',
    timestamp: '2026-09-26 08:00 EST',
    temp: '19.8°C (Ambient)',
    status: 'Verified In Stock',
    statusType: 'optimal'
  },
  {
    lotId: 'LOT-OM-9824',
    medicine: 'Omeprazole DR 20mg Pellets',
    origin: 'Raleigh NC Depot',
    destination: 'Virginia Clinical Center',
    hash: '77ae90149824cc331899',
    timestamp: '2026-09-26 06:45 EST',
    temp: '20.1°C (Ambient)',
    status: 'Batch Ingest Confirmed',
    statusType: 'optimal'
  }
];

const CRYO_VAULTS = [
  { id: 'VAULT-01', name: 'Cryogenic Vault 01 (Biologics)', temp: '3.6°C', status: 'optimal', range: '2.0°C – 8.0°C', load: '82%' },
  { id: 'VAULT-02', name: 'Cryogenic Vault 02 (Vaccines)', temp: '4.1°C', status: 'optimal', range: '2.0°C – 8.0°C', load: '64%' },
  { id: 'VAULT-03', name: 'Cryogenic Vault 03 (Insulin)', temp: '3.9°C', status: 'optimal', range: '2.0°C – 8.0°C', load: '91%' },
  { id: 'VAULT-04', name: 'Cryogenic Vault 04 (Specialty)', temp: '7.9°C', status: 'warning', range: '2.0°C – 8.0°C', load: '45%' }
];

export default function ClinicalIntelligence() {
  const [verificationFeedback, setVerificationFeedback] = useState('');

  const handleVerifyLot = (lot) => {
    setVerificationFeedback(`Cryptographic Proof Verified: Lot ${lot.lotId} hash [${lot.hash}] validated against Eureka Blockchain registry.`);
    setTimeout(() => setVerificationFeedback(''), 4000);
  };

  const ledgerColumns = [
    {
      key: 'lotId',
      header: 'Lot Identifier',
      render: (val) => (
        <span className="font-label-code font-bold text-secondary">{val}</span>
      )
    },
    {
      key: 'medicine',
      header: 'Formulation / Compound',
      render: (val) => (
        <span className="font-label-nav font-bold text-on-surface">{val}</span>
      )
    },
    {
      key: 'routing',
      header: 'Custody Routing',
      render: (_, row) => (
        <div className="font-body-sm text-outline">
          <span>{row.origin}</span> → <strong className="text-on-surface">{row.destination}</strong>
        </div>
      )
    },
    {
      key: 'hash',
      header: 'SHA-256 Proof',
      render: (val) => (
        <span className="font-label-code text-outline text-[11px]">
          SHA256:{val}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Audit State',
      render: (val, row) => (
        <StatusBadge label={val} type={row.statusType} showDot={true} />
      )
    },
    {
      key: 'action',
      header: 'Verify',
      align: 'right',
      render: (_, row) => (
        <button
          type="button"
          className="btn-secondary table-verify-btn"
          onClick={() => handleVerifyLot(row)}
        >
          <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
          <span>Verify</span>
        </button>
      )
    }
  ];

  return (
    <div className="page-container clinical-page">
      {/* ===================== HEADER ===================== */}
      <section className="clinical-header-row">
        <div className="clinical-header-left">
          <div className="flex-center gap-2">
            <span className="dot dot-purple dot-pulse"></span>
            <span className="font-section-eyebrow text-secondary uppercase">
              Clinical Intelligence Platform // Node Cluster Audit
            </span>
          </div>

          <h1 className="font-display-hero clinical-title uppercase">
            Clinical<br />
            <span className="text-secondary">Intelligence</span>
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            Cryptographic lot serialization verification, cold-chain telemetry logs, and 
            microservices service discovery health.
          </p>
        </div>

        <div className="clinical-node-meta">
          <div className="meta-pill-large">
            <span className="material-symbols-outlined text-secondary">shield</span>
            <div>
              <div className="font-label-code text-on-surface font-bold">NODE: {systemStatus.nodeAudit}</div>
              <div className="font-body-sm text-outline">{systemStatus.hsmStatus}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Feedback Banner */}
      {verificationFeedback && (
        <div className="clinical-feedback-bar">
          <span className="material-symbols-outlined text-secondary">verified</span>
          <span className="font-label-nav text-on-surface">{verificationFeedback}</span>
        </div>
      )}

      {/* ===================== TOP 4 CLINICAL METRICS ===================== */}
      <section className="metrics-grid">
        <MetricCard
          title="Verified Lots"
          value="1,248"
          delta="100% SHA-256 Verified"
          deltaType="positive"
          icon="verified"
          subtext="Zero lot discrepancies across ledger"
        />
        <MetricCard
          title="Cold Chain Excursions"
          value="0"
          delta="30-Day Zero Breach Target"
          deltaType="positive"
          icon="ac_unit"
          subtext="Continuous 2.0°C – 8.0°C logging"
        />
        <MetricCard
          title="HSM Dual-Key Signatures"
          value="4,892"
          delta="Zero-Latency Auth Handshake"
          deltaType="positive"
          icon="key"
          subtext="FIPS 140-2 Level 3 Validated"
        />
        <MetricCard
          title="Active Hospital Nodes"
          value="18"
          delta="All Nodes Online & Synced"
          deltaType="positive"
          icon="local_hospital"
          subtext="Eureka Multi-Zone Consensus"
        />
      </section>

      {/* ===================== SECTION 1: MICROSERVICES TOPOLOGY ===================== */}
      <section className="card-clinical topology-card">
        <div className="card-header-between">
          <div>
            <span className="font-section-eyebrow text-secondary uppercase">Cluster Health</span>
            <h3 className="font-headline-sm text-on-surface">Microservices Discovery Topology</h3>
          </div>
          <span className="badge-optimal font-label-code">EUREKA CLUSTER: 6/6 HEALTHY</span>
        </div>

        <div className="topology-grid">
          {microservicesRegistry.map(svc => (
            <div key={svc.id} className="topology-node">
              <div className="node-top">
                <span className="font-label-code font-bold text-on-surface">{svc.name}</span>
                <span className="badge-micro-online">ONLINE</span>
              </div>
              <div className="node-role font-body-sm text-outline">{svc.role}</div>
              <div className="node-stats">
                <div className="stat-unit">
                  <span className="font-label-code text-outline text-[10px]">PORT</span>
                  <span className="font-label-code font-bold text-primary-container">{svc.port}</span>
                </div>
                <div className="stat-unit">
                  <span className="font-label-code text-outline text-[10px]">LATENCY</span>
                  <span className="font-label-code font-bold text-optimal">{svc.latency}</span>
                </div>
                <div className="stat-unit">
                  <span className="font-label-code text-outline text-[10px]">UPTIME</span>
                  <span className="font-label-code font-bold text-on-surface">{svc.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SECTION 2: LOT SERIALIZATION LEDGER ===================== */}
      <section className="ledger-section">
        <div className="card-header-between">
          <div>
            <span className="font-section-eyebrow text-secondary uppercase">Cryptographic Audit Stream</span>
            <h3 className="font-headline-sm text-on-surface">Active Lot Serialization Ledger</h3>
          </div>
          <span className="font-label-code text-outline">21 CFR PART 11 COMPLIANT</span>
        </div>

        <DataTable
          columns={ledgerColumns}
          data={LOT_LEDGER}
          keyField="lotId"
        />
      </section>

      {/* ===================== SECTION 3: CRYOGENIC VAULTS ===================== */}
      <section className="card-clinical vaults-card">
        <div className="card-header-between">
          <div>
            <span className="font-section-eyebrow text-secondary uppercase">Thermal Integrity</span>
            <h3 className="font-headline-sm text-on-surface">Regional Cold-Chain Storage Vaults</h3>
          </div>
          <span className="font-label-code text-outline">TARGET RANGE: 2.0°C – 8.0°C</span>
        </div>

        <div className="vaults-grid">
          {CRYO_VAULTS.map(vault => (
            <div key={vault.id} className="vault-tile">
              <div className="vault-tile-top">
                <span className="font-label-code text-outline">{vault.id}</span>
                <StatusBadge label={vault.status === 'optimal' ? 'NOMINAL' : 'RAMPING'} type={vault.status} showDot={true} />
              </div>
              <h4 className="font-label-nav font-bold text-on-surface">{vault.name}</h4>
              <div className="vault-temp-row">
                <div className={`font-metric-display ${vault.status === 'warning' ? 'text-critical' : 'text-optimal'}`}>
                  {vault.temp}
                </div>
                <div className="vault-load-info">
                  <span className="font-label-code text-outline text-[11px]">CAPACITY LOAD</span>
                  <span className="font-label-code font-bold text-on-surface">{vault.load}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
