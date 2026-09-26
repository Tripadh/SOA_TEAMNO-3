import { useState } from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import StatusBadge from '../components/StatusBadge';
import {
  pharmacyMetrics,
  inventoryMovementChart,
  fulfillmentFunnel,
  recentOrdersSummary,
  inventoryAlerts,
  microservicesRegistry,
  systemStatus
} from '../data/mockData';
import './PharmacyDashboard.css';

export default function PharmacyDashboard() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditMessage, setAuditMessage] = useState('');

  const handleInitiateAudit = () => {
    setIsAuditing(true);
    setAuditMessage('Initiating automated lot ledger audit across 6 nodes...');
    setTimeout(() => {
      setIsAuditing(false);
      setAuditMessage('Audit Complete: 1,248 lots verified cryptographically. Zero discrepancies found.');
      setTimeout(() => setAuditMessage(''), 4000);
    }, 1500);
  };

  return (
    <div className="page-container pharmacy-page">
      {/* ===================== PAGE HEADER ===================== */}
      <div className="page-header-row">
        <div className="header-titles">
          <div className="header-eyebrow">
            <span className="dot dot-purple"></span>
            <span className="font-section-eyebrow text-secondary">
              Clinical Command Node // Tier-1 Central
            </span>
          </div>
          <h1 className="font-headline-lg lg-display-hero text-on-surface uppercase">
            Pharmacy<br />Operations
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            Real-time visibility across medicines, cold-chain inventory, and microservices 
            fulfillment telemetry.
          </p>
        </div>

        <div className="header-actions-group">
          <div className="hsm-sync-block hidden-sm">
            <span className="font-label-code text-outline uppercase">HSM Batch Sync</span>
            <span className="font-label-nav text-on-surface font-semibold">
              {systemStatus.hsmVerification}
            </span>
          </div>

          <button 
            type="button" 
            className="btn-primary audit-btn"
            onClick={handleInitiateAudit}
            disabled={isAuditing}
          >
            <span className={`material-symbols-outlined text-secondary-fixed ${isAuditing ? 'spin' : ''}`}>
              refresh
            </span>
            <span>{isAuditing ? 'Verifying Lots...' : 'Initiate Lot Audit'}</span>
          </button>
        </div>
      </div>

      {auditMessage && (
        <div className="audit-notification-bar">
          <span className="dot dot-success dot-pulse"></span>
          <span className="font-label-nav text-on-surface">{auditMessage}</span>
        </div>
      )}

      {/* ===================== TOP 4 METRIC CARDS ===================== */}
      <div className="metrics-grid">
        {pharmacyMetrics.map(metric => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            delta={metric.delta}
            deltaType={metric.deltaType}
            icon={metric.icon}
            subtext={metric.subtext}
          />
        ))}
      </div>

      {/* ===================== MAIN 65% / 35% GRID SECTION ===================== */}
      <div className="grid-12 pharmacy-main-grid">
        {/* COLUMN 1: Clinical Telemetry & Fulfillment Flow (8 cols) */}
        <div className="col-span-8 flex-col-gap">
          {/* Primary Chart Card: Inventory Movement & Stock Dynamics */}
          <div className="card-clinical chart-card">
            <div className="chart-card-header">
              <div>
                <span className="font-section-eyebrow text-secondary uppercase">
                  Telemetry Stream
                </span>
                <h3 className="font-headline-sm text-on-surface">
                  Inventory Movement &amp; Stock Dynamics
                </h3>
              </div>
              <div className="chart-legend-row">
                <div className="legend-item">
                  <span className="legend-bar-sample"></span>
                  <span className="font-body-sm text-outline">Dispensed Stock</span>
                </div>
                <div className="legend-item">
                  <span className="legend-line-sample purple-line"></span>
                  <span className="font-body-sm text-outline">Stock Added</span>
                </div>
                <div className="legend-item">
                  <span className="legend-line-sample navy-line"></span>
                  <span className="font-body-sm text-outline">Stock Reserved</span>
                </div>
              </div>
            </div>

            {/* Inline Technical SVG Multi-Tier Chart */}
            <div className="chart-svg-container">
              <svg className="inventory-svg" viewBox="0 0 720 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#712EDD" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#712EDD" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizon Gridlines */}
                <line x1="0" y1="40" x2="720" y2="40" stroke="#E2E8F8" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="720" y2="90" stroke="#E2E8F8" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="720" y2="140" stroke="#E2E8F8" strokeDasharray="3 3" />
                <line x1="0" y1="190" x2="720" y2="190" stroke="#E2E8F8" />

                {/* Dispensed Stock Bars */}
                <rect x="45" y="110" width="30" height="80" rx="4" fill="#E2E8F8" />
                <rect x="165" y="90" width="30" height="100" rx="4" fill="#E2E8F8" />
                <rect x="285" y="80" width="30" height="110" rx="4" fill="#E2E8F8" />
                <rect x="405" y="50" width="30" height="140" rx="4" fill="#E2E8F8" />
                <rect x="525" y="65" width="30" height="125" rx="4" fill="#E2E8F8" />
                <rect x="645" y="40" width="30" height="150" rx="4" fill="#E2E8F8" />

                {/* Stock Added Area Gradient */}
                <path
                  d="M60,80 L180,65 L300,55 L420,35 L540,45 L660,20 L660,190 L60,190 Z"
                  fill="url(#purpleAreaGrad)"
                />

                {/* Stock Added Line */}
                <path
                  d="M60,80 L180,65 L300,55 L420,35 L540,45 L660,20"
                  fill="none"
                  stroke="#712EDD"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Stock Reserved Line (Navy) */}
                <path
                  d="M60,140 L180,135 L300,125 L420,105 L540,110 L660,95"
                  fill="none"
                  stroke="#0C1352"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />

                {/* Data Focus Points */}
                <circle cx="660" cy="20" r="5" fill="#712EDD" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="420" cy="35" r="4" fill="#712EDD" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              {/* Monthly Time Markers */}
              <div className="chart-x-labels">
                {inventoryMovementChart.months.map(m => (
                  <span key={m} className="font-label-code text-outline">{m}</span>
                ))}
              </div>
            </div>

            {/* Visual Metric Callout Strip */}
            <div className="metric-callout-strip">
              <div className="strip-item">
                <span className="font-label-code text-outline uppercase">Units Ingested</span>
                <span className="font-headline-sm text-on-surface font-bold">
                  {inventoryMovementChart.unitsIngested}
                </span>
              </div>
              <div className="strip-divider"></div>
              <div className="strip-item">
                <span className="font-label-code text-outline uppercase">Units Dispensed</span>
                <span className="font-headline-sm text-on-surface font-bold">
                  {inventoryMovementChart.unitsDispensed}
                </span>
              </div>
              <div className="strip-divider"></div>
              <div className="strip-item">
                <span className="font-label-code text-outline uppercase">Buffer Expansion</span>
                <span className="font-headline-sm text-optimal font-bold">
                  {inventoryMovementChart.bufferExpansion}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Chart Card: Order Fulfillment Funnel */}
          <div className="card-clinical funnel-card">
            <div className="funnel-header">
              <div>
                <span className="font-section-eyebrow text-secondary uppercase">Pipeline Integrity</span>
                <h3 className="font-headline-sm text-on-surface">Order Fulfillment Funnel</h3>
              </div>
              <span className="font-label-code text-outline">Real-time Stage Dropoff</span>
            </div>

            <div className="funnel-bars-container">
              {fulfillmentFunnel.map((step) => (
                <div key={step.stage} className="funnel-step-row">
                  <div className="funnel-step-info">
                    <span className="font-label-nav text-on-surface font-semibold">{step.stage}</span>
                    <span className="font-label-code text-outline">{step.count}</span>
                  </div>
                  <div className="funnel-progress-track">
                    <div 
                      className="funnel-progress-fill"
                      style={{ 
                        width: step.pct, 
                        backgroundColor: step.color 
                      }}
                    ></div>
                  </div>
                  <span className="funnel-pct font-label-code">{step.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Horizontal Clinical Cards */}
          <div className="recent-orders-block">
            <div className="block-header">
              <div>
                <span className="font-section-eyebrow text-outline uppercase">Active Dispatches</span>
                <h3 className="font-headline-sm text-on-surface">Recent Orders in Pipeline</h3>
              </div>
              <Link to="/orders" className="btn-secondary text-sm">
                <span>View All Orders</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="orders-horizontal-list">
              {recentOrdersSummary.map(order => (
                <div key={order.orderId} className="order-horizontal-card">
                  <div className="order-badge-col">
                    <span className="font-label-code font-bold text-primary-container">
                      {order.orderId}
                    </span>
                    <StatusBadge
                      label={order.stage}
                      type={order.stageType}
                      showDot={true}
                    />
                  </div>

                  <div className="order-medicine-col">
                    <h4 className="font-label-nav text-on-surface font-bold truncate">
                      {order.medicine}
                    </h4>
                    <span className="font-body-sm text-outline">{order.carrier}</span>
                  </div>

                  <div className="order-meta-col">
                    <span className="font-label-code text-on-surface font-semibold">{order.eta}</span>
                    <span className="font-body-sm text-outline">{order.temp}</span>
                  </div>

                  <Link to="/orders" className="btn-icon" title="Track Dispatch">
                    <span className="material-symbols-outlined text-secondary">visibility</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2: Deep Navy Insight, Alerts & Mesh Telemetry (4 cols) */}
        <div className="col-span-4 flex-col-gap">
          {/* DARK NAVY HERO INSIGHT CARD */}
          <div className="card-navy navy-command-card">
            <div className="navy-card-glow"></div>
            <div className="navy-card-header">
              <span className="font-section-eyebrow text-secondary-fixed">
                ZERO-TOLERANCE CUSTODY ASSURANCE
              </span>
              <span className="material-symbols-outlined text-secondary-fixed-dim">verified_user</span>
            </div>

            <div className="navy-card-body">
              <h3 className="navy-card-title">100% Cryptographic Traceability</h3>
              <p className="navy-card-p">
                Every prescription batch is signed with SHA-256 ledger proof across regional 
                distribution nodes. Lot compliance certified for institutional dispatch.
              </p>
              <div className="navy-lot-pill">
                <span className="dot dot-success"></span>
                <span className="font-label-code">VERIFIED BATCH #LOT-9824-VA</span>
              </div>
            </div>

            <div className="navy-card-action">
              <button 
                type="button" 
                className="btn-urgent full-width"
                onClick={() => alert('Batch #LOT-9824-VA authorized for clinical dispatch.')}
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Authorize Lot Dispatch</span>
              </button>
            </div>
          </div>

          {/* Inventory Alerts & Cold-Chain Monitoring */}
          <div className="card-clinical alerts-card">
            <div className="alerts-card-header">
              <span className="font-section-eyebrow text-secondary uppercase">
                Critical Notifications
              </span>
              <h3 className="font-headline-sm text-on-surface">Active Facility Alerts</h3>
            </div>

            <div className="alerts-list">
              {inventoryAlerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-item-top">
                    <StatusBadge
                      label={alert.status}
                      type={alert.statusType}
                      pulse={alert.statusType === 'critical'}
                    />
                    <span className="font-label-code text-outline">{alert.reorderRef}</span>
                  </div>
                  <h4 className="alert-item-title">{alert.title}</h4>
                  <p className="alert-item-detail">{alert.detail}</p>
                  <button type="button" className="alert-action-btn">
                    <span>{alert.actionText}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Microservices Heartbeat Widget */}
          <div className="card-clinical heartbeat-card">
            <div className="heartbeat-card-header">
              <div className="flex-center gap-2">
                <span className="dot dot-success dot-pulse"></span>
                <span className="font-section-eyebrow text-outline uppercase">Services Cluster</span>
              </div>
              <span className="font-label-code text-optimal font-bold">ALL HEALTHY</span>
            </div>

            <div className="heartbeat-services-list">
              {microservicesRegistry.map(svc => (
                <div key={svc.id} className="heartbeat-row">
                  <div className="heartbeat-svc-left">
                    <span className="font-label-nav text-on-surface font-semibold">{svc.name}</span>
                    <span className="font-label-code text-outline">PORT {svc.port}</span>
                  </div>
                  <div className="heartbeat-svc-right">
                    <span className="font-label-code text-optimal">{svc.latency}</span>
                    <span className="badge-micro-online">ONLINE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
