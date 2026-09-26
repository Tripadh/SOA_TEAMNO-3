import { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import DataTable from '../components/DataTable';
import { masterTrackingOrder } from '../data/mockData';
import './OrderTracking.css';

export default function OrderTracking() {
  const [downloadNotification, setDownloadNotification] = useState('');

  const handleDownloadSlip = () => {
    setDownloadNotification('GxP Packing Slip for #AE-1001 generated and downloaded.');
    setTimeout(() => setDownloadNotification(''), 3500);
  };

  const handleManifestAudit = () => {
    setDownloadNotification('SHA-256 Cryptographic Manifest verified against FDA blockchain ledger.');
    setTimeout(() => setDownloadNotification(''), 3500);
  };

  const manifestColumns = [
    {
      key: 'name',
      header: 'Item & Formulation',
      render: (val) => (
        <div>
          <div className="font-label-nav font-bold text-on-surface">{val}</div>
          <span className="font-body-sm text-outline">Verified Bioequivalent Compound</span>
        </div>
      )
    },
    {
      key: 'ndc',
      header: 'NDC & Lot Code',
      render: (val, row) => (
        <div>
          <div className="font-label-code">{val}</div>
          <div className="font-label-code text-secondary font-bold text-[11px]">{row.lot}</div>
        </div>
      )
    },
    {
      key: 'qty',
      header: 'Requisition Qty',
      render: (val) => <span className="font-label-code font-bold">{val}</span>
    },
    {
      key: 'temp',
      header: 'Storage Specification',
      render: (val) => (
        <span className="font-label-code text-on-surface">{val}</span>
      )
    },
    {
      key: 'verification',
      header: 'Chain Custody',
      render: (val, row) => (
        <StatusBadge label={val} type={row.verificationStatus} showDot={true} />
      )
    }
  ];

  return (
    <div className="page-container tracking-page">
      {/* ===================== TOP HEADER & OPERATIONAL QUICKBAR ===================== */}
      <section className="tracking-header-row">
        <div className="tracking-header-left">
          <div className="tracking-badge-row">
            <span className="dot dot-purple"></span>
            <span className="font-section-eyebrow text-secondary uppercase">
              Chain-of-Custody Audit Active
            </span>
          </div>

          <h1 className="font-display-hero tracking-title uppercase">
            Order<br />
            <span className="text-secondary">Tracking</span>
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-xl">
            Real-time dispatch telemetry and verifiable cold-chain delivery milestones.
          </p>
        </div>

        <div className="tracking-quickbar">
          <button 
            type="button" 
            className="btn-secondary quickbar-btn"
            onClick={handleDownloadSlip}
          >
            <span className="material-symbols-outlined text-secondary">download</span>
            <span>Download GxP Packing Slip</span>
          </button>
          <button 
            type="button" 
            className="btn-primary quickbar-btn"
            onClick={handleManifestAudit}
          >
            <span className="material-symbols-outlined text-secondary-fixed">shield_lock</span>
            <span>Cryptographic Manifest</span>
          </button>
        </div>
      </section>

      {downloadNotification && (
        <div className="download-notification-bar">
          <span className="material-symbols-outlined text-secondary">verified</span>
          <span className="font-label-nav text-on-surface">{downloadNotification}</span>
        </div>
      )}

      {/* ===================== MASTER TRACKING CARD ===================== */}
      <section className="card-clinical master-tracking-card">
        {/* Order Summary Header */}
        <div className="master-header">
          <div className="master-header-left">
            <div className="flex-center gap-2">
              <span className="font-metric-display text-primary-container text-[28px] leading-none">
                {masterTrackingOrder.orderId}
              </span>
              <StatusBadge
                label={masterTrackingOrder.status}
                type="warning"
                pulse={true}
              />
            </div>
            <div className="route-sub-line font-body-sm text-outline">
              <span>{masterTrackingOrder.origin.hubName}</span>
              <span className="material-symbols-outlined text-[16px] text-secondary">arrow_forward</span>
              <span className="text-on-surface font-semibold">{masterTrackingOrder.destination.hospitalName}</span>
            </div>
          </div>

          <div className="master-header-right">
            <div className="eta-badge-box">
              <span className="font-label-code text-outline uppercase text-[10px]">Estimated Arrival</span>
              <span className="font-headline-sm text-secondary font-bold">
                {masterTrackingOrder.destination.eta}
              </span>
            </div>
            <div className="carrier-sub-text font-body-sm text-outline">
              {masterTrackingOrder.carrier} • {masterTrackingOrder.courierOfficer}
            </div>
          </div>
        </div>

        {/* Visual Step Timeline */}
        <div className="timeline-container">
          {masterTrackingOrder.steps.map((st, idx) => (
            <div 
              key={st.step} 
              className={`timeline-step ${st.status === 'completed' ? 'step-completed' : ''} ${st.status === 'active' ? 'step-active' : ''}`}
            >
              <div className="step-indicator-wrapper">
                <div className="step-circle">
                  {st.status === 'completed' ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : st.status === 'active' ? (
                    <span className="step-active-dot"></span>
                  ) : (
                    <span className="font-label-code">{st.step}</span>
                  )}
                </div>
                {idx < masterTrackingOrder.steps.length - 1 && (
                  <div className={`step-connector ${st.status === 'completed' ? 'connector-done' : ''}`} />
                )}
              </div>

              <div className="step-content">
                <div className="step-top-line">
                  <span className="font-label-nav font-bold text-on-surface">{st.title}</span>
                  <span className="font-label-code text-outline">{st.timestamp}</span>
                </div>
                <p className="font-body-sm text-outline step-detail">{st.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== BENTO GRID: ROUTE MAP & SENSORS ===================== */}
      <section className="grid-12 telemetry-bento-grid">
        {/* Abstract Route & Real-Time Telemetry Map (8 Cols) */}
        <div className="col-span-8 card-clinical map-card">
          <div className="map-card-header">
            <div>
              <span className="font-section-eyebrow text-secondary uppercase">
                Active Telemetry Vector
              </span>
              <h3 className="font-headline-sm text-on-surface">
                GPS Transit Corridor &amp; Safe Passage Lock
              </h3>
            </div>
            <div className="gps-live-badge">
              <span className="dot dot-success dot-pulse"></span>
              <span className="font-label-code text-optimal font-bold">
                {masterTrackingOrder.telemetry.speed} // LIVE SATELLITE FIX
              </span>
            </div>
          </div>

          {/* Minimalist Vector Route Canvas */}
          <div className="vector-route-canvas">
            <svg className="route-svg" viewBox="0 0 760 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="60%" stopColor="#712EDD" />
                  <stop offset="100%" stopColor="#C7C5D1" />
                </linearGradient>
              </defs>

              {/* Grid Background */}
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F0F3FF" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />

              {/* Main Route Polyline */}
              <path
                d="M 60 170 Q 200 130 360 110 T 520 60 L 700 40"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeDasharray="none"
                strokeLinecap="round"
              />

              {/* Node 1: Origin */}
              <circle cx="60" cy="170" r="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="3" />
              <text x="60" y="198" textAnchor="middle" className="route-node-label">Origin: Hub Alpha</text>

              {/* Node 2: Checkpoint 1 */}
              <circle cx="260" cy="132" r="5" fill="#712EDD" stroke="#FFFFFF" strokeWidth="2" />
              <text x="260" y="156" textAnchor="middle" className="route-node-label">Fredericksburg Node</text>

              {/* Active Courier Position with Radar Ring */}
              <circle cx="480" cy="74" r="18" fill="none" stroke="#712EDD" strokeWidth="1.5" opacity="0.4" className="radar-pulse-ring" />
              <circle cx="480" cy="74" r="8" fill="#712EDD" stroke="#FFFFFF" strokeWidth="3" />
              <text x="480" y="52" textAnchor="middle" className="route-courier-label font-label-code">
                COURIER #04 (48 mph)
              </text>

              {/* Node 3: Destination */}
              <circle cx="700" cy="40" r="8" fill="#0C1352" stroke="#FFFFFF" strokeWidth="3" />
              <text x="700" y="24" textAnchor="middle" className="route-node-label font-bold">Mercy General Node</text>
            </svg>

            <div className="current-corridor-strip">
              <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
              <span className="font-label-code text-on-surface">
                {masterTrackingOrder.telemetry.currentLocation}
              </span>
            </div>
          </div>

          {/* Bottom Telemetry Badges */}
          <div className="telemetry-badges-row">
            <div className="telemetry-badge-item">
              <span className="font-label-code text-outline uppercase">Vehicle Vault</span>
              <span className="font-headline-sm text-optimal font-bold">
                {masterTrackingOrder.telemetry.vaultTemp}
              </span>
              <span className="font-body-sm text-outline">Target: 2.0°C – 8.0°C</span>
            </div>
            <div className="telemetry-badge-pipe"></div>
            <div className="telemetry-badge-item">
              <span className="font-label-code text-outline uppercase">Battery Reserve</span>
              <span className="font-headline-sm text-on-surface font-bold">
                {masterTrackingOrder.telemetry.batteryReserve}
              </span>
              <span className="font-body-sm text-optimal">Thermal Active</span>
            </div>
            <div className="telemetry-badge-pipe"></div>
            <div className="telemetry-badge-item">
              <span className="font-label-code text-outline uppercase">Shock / Tilt</span>
              <span className="font-headline-sm text-on-surface font-bold">
                {masterTrackingOrder.telemetry.shockTilt}
              </span>
              <span className="font-body-sm text-optimal">Safe Transport</span>
            </div>
            <div className="telemetry-badge-pipe"></div>
            <div className="telemetry-badge-item">
              <span className="font-label-code text-outline uppercase">Geofence Status</span>
              <span className="font-label-nav text-secondary font-bold">
                {masterTrackingOrder.telemetry.geofenceStatus}
              </span>
              <span className="font-body-sm text-outline">SHA-256 Corridored</span>
            </div>
          </div>
        </div>

        {/* Cold-Chain Telemetry Card (4 Cols) */}
        <div className="col-span-4 card-clinical cold-chain-card">
          <div className="cold-card-header">
            <span className="font-section-eyebrow text-secondary uppercase">Cryo Monitoring</span>
            <h3 className="font-headline-sm text-on-surface">Cold-Chain Telemetry</h3>
          </div>

          <div className="cold-realtime-stats">
            <div className="cold-stat-box">
              <span className="font-label-code text-outline uppercase">Vault Core Temp</span>
              <div className="font-metric-display text-optimal leading-none">3.8°C</div>
              <span className="font-body-sm text-outline">Safe Band: 2.0°C – 8.0°C</span>
            </div>
            <div className="cold-stat-box">
              <span className="font-label-code text-outline uppercase">Vault Humidity</span>
              <div className="font-metric-display text-on-surface leading-none">
                {masterTrackingOrder.telemetry.humidity}
              </div>
              <span className="font-body-sm text-outline">Condensation Protected</span>
            </div>
          </div>

          {/* Micro Sparkline SVG for 6-Hour Temperature Drift */}
          <div className="drift-chart-wrapper">
            <div className="drift-header">
              <span className="font-label-code text-outline">6-HOUR THERMAL LOG</span>
              <span className="font-label-code text-optimal">±0.3°C DEVIATION</span>
            </div>
            <svg className="drift-sparkline-svg" viewBox="0 0 320 60" preserveAspectRatio="none">
              <rect x="0" y="8" width="320" height="44" fill="#F0F3FF" opacity="0.6" />
              <line x1="0" y1="8" x2="320" y2="8" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="52" x2="320" y2="52" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
              <path
                d="M 0 32 Q 50 30 100 35 T 200 28 T 320 30"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="drift-legend">
              <span className="font-body-sm text-outline">2.0°C Lower Threshold</span>
              <span className="font-body-sm text-outline">8.0°C Upper Threshold</span>
            </div>
          </div>

          {/* Chain Verification Status */}
          <div className="chain-verification-box">
            <div className="verification-row">
              <span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
              <div>
                <div className="font-label-nav font-bold text-on-surface">Dual-Key HSM Verified</div>
                <div className="font-label-code text-outline text-[11px]">Ledger Block #48192-BC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRESCRIBED ITEMS MANIFEST ===================== */}
      <section className="manifest-section">
        <div className="manifest-header">
          <div>
            <span className="font-section-eyebrow text-secondary uppercase">Cargo Manifest</span>
            <h3 className="font-headline-sm text-on-surface">Prescribed Medication Cargo Lines</h3>
          </div>
          <span className="font-label-code text-outline">3 Active Product Batches</span>
        </div>

        <DataTable
          columns={manifestColumns}
          data={masterTrackingOrder.manifest}
          keyField="name"
        />
      </section>

      {/* ===================== DUAL SIGNATURE & PROTOCOL ASSURANCE ===================== */}
      <section className="signatures-grid">
        {/* Pharmacist Release */}
        <div className="card-clinical signature-card">
          <div className="signature-header">
            <span className="material-symbols-outlined text-secondary">verified_user</span>
            <span className="font-section-eyebrow text-outline uppercase">Dispensing Release Authority</span>
          </div>
          <div className="signature-body">
            <h4 className="font-label-nav font-bold text-on-surface">
              {masterTrackingOrder.pharmacistSignature.signer}
            </h4>
            <div className="font-body-sm text-outline">
              {masterTrackingOrder.pharmacistSignature.role} • License: {masterTrackingOrder.pharmacistSignature.license}
            </div>
            <div className="signature-hash font-label-code">
              {masterTrackingOrder.pharmacistSignature.hash}
            </div>
          </div>
          <div className="signature-footer">
            <StatusBadge label="DIGITALLY SIGNED // 21 CFR PART 11" type="optimal" showDot={true} />
          </div>
        </div>

        {/* Receiving Node Protocol */}
        <div className="card-clinical signature-card">
          <div className="signature-header">
            <span className="material-symbols-outlined text-secondary">local_hospital</span>
            <span className="font-section-eyebrow text-outline uppercase">Receiving Clinical Node</span>
          </div>
          <div className="signature-body">
            <h4 className="font-label-nav font-bold text-on-surface">
              {masterTrackingOrder.hospitalHandshake.receiver}
            </h4>
            <div className="font-body-sm text-outline">
              {masterTrackingOrder.hospitalHandshake.chiefPharmacist} • Node ID: {masterTrackingOrder.hospitalHandshake.facilityId}
            </div>
            <div className="font-label-code text-on-surface-variant text-[12px] mt-1">
              Status: {masterTrackingOrder.hospitalHandshake.status}
            </div>
          </div>
          <div className="signature-footer">
            <StatusBadge label="AWAITING PHYSICAL DUAL-SIGNATURE" type="warning" showDot={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
