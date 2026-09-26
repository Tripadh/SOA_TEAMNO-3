import { Link } from 'react-router-dom';
import carouselLabImg from '../assets/images/carousel-lab.webp';
import coldChainVaultImg from '../assets/images/cold-chain-vault.webp';
import medicineVialsImg from '../assets/images/medicine-vials.webp';
import './ApothecaryHome.css';

export default function ApothecaryHome() {
  return (
    <div className="home-container">
      {/* ===================== HERO SECTION ===================== */}
      <section className="home-hero-section">
        <div className="ambient-glow-purple hero-glow-1"></div>
        <div className="ambient-glow-blue hero-glow-2"></div>

        <div className="hero-grid">
          {/* Left Column: Editorial Clinical Authority */}
          <div className="hero-left">
            <div className="architecture-micro-badge">
              <span className="dot dot-purple dot-pulse"></span>
              <span className="font-label-code">
                SPRING BOOT MICROSERVICES ARCHITECTURE // EUREKA DISCOVERY
              </span>
            </div>

            <h1 className="font-display-hero hero-title">
              PHARMACEUTICAL<br />
              <span className="text-secondary">OPERATIONS</span>
            </h1>

            <p className="font-body-lg hero-subtitle">
              Secure medicine discovery, intelligent cold-chain inventory management, and
              zero-trust order fulfillment — unified in one clinical intelligence platform.
            </p>

            <div className="hero-cta-group">
              <Link to="/catalog" className="btn-primary hero-btn-main">
                <span>Browse Medicines</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link to="/orders" className="btn-secondary hero-btn-track">
                <span className="material-symbols-outlined text-secondary">radar</span>
                <span>Track Order</span>
              </Link>
            </div>

            {/* Trust Badges & Clinical Verification */}
            <div className="trust-badges-card">
              <div className="trust-grid">
                <div className="trust-item">
                  <span className="material-symbols-outlined text-secondary">verified_user</span>
                  <div className="trust-text">
                    <span className="font-label-code font-bold">256-bit JWT</span>
                    <span className="font-body-sm text-outline">Auth Handshake</span>
                  </div>
                </div>

                <div className="trust-item trust-item-border">
                  <span className="material-symbols-outlined text-secondary">gavel</span>
                  <div className="trust-text">
                    <span className="font-label-code font-bold">21 CFR Part 11</span>
                    <span className="font-body-sm text-outline">FDA Validated</span>
                  </div>
                </div>

                <div className="trust-item trust-item-border">
                  <span className="material-symbols-outlined text-secondary">inventory_2</span>
                  <div className="trust-text">
                    <span className="font-label-code font-bold">GxP Validated</span>
                    <span className="font-body-sm text-outline">Audit-Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Clinical Telemetry Composition */}
          <div className="hero-right">
            <div className="telemetry-bento">
              {/* Card 1: Inventory Health Index with SVG Gauge */}
              <div className="bento-tile bento-white">
                <div className="bento-header">
                  <span className="font-section-eyebrow text-outline">Dispensary Health</span>
                  <span className="material-symbols-outlined text-secondary">monitoring</span>
                </div>
                <div className="gauge-composition">
                  <svg className="radial-gauge-svg" viewBox="0 0 120 120" width="100" height="100">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#E2E8F8" strokeWidth="10" />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="48" 
                      fill="none" 
                      stroke="#712EDD" 
                      strokeWidth="10"
                      strokeDasharray="301.6"
                      strokeDashoffset="18"
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                    <text x="60" y="65" textAnchor="middle" className="gauge-text">99.4%</text>
                  </svg>
                  <div className="gauge-legend">
                    <div className="font-label-code font-bold text-on-surface">Available Stock</div>
                    <div className="font-body-sm text-optimal">+0.2% vs baseline</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Cold-Chain Integrity Micro-tracker */}
              <div className="bento-tile bento-white">
                <div className="bento-header">
                  <span className="font-section-eyebrow text-outline">Cold-Chain Cryo Vault</span>
                  <span className="badge-optimal-dot">
                    <span className="dot dot-success dot-pulse"></span>
                    <span className="font-label-code text-optimal font-bold">NORMAL</span>
                  </span>
                </div>
                <div className="temp-display-block">
                  <div className="font-metric-display text-on-surface">4.2°C</div>
                  <span className="font-body-sm text-outline">Target Band: 2.0°C – 8.0°C</span>
                </div>
                <svg className="sparkline-full" viewBox="0 0 180 32" preserveAspectRatio="none">
                  <path 
                    d="M0,20 Q45,10 90,16 T180,12" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                  <line x1="0" y1="6" x2="180" y2="6" stroke="#C7C5D1" strokeDasharray="3 3" />
                  <line x1="0" y1="26" x2="180" y2="26" stroke="#C7C5D1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Card 3: Feature Navy Card (Spanning Two Columns) */}
              <div className="bento-tile bento-navy col-span-2">
                <div className="navy-tile-ambient"></div>
                <div className="navy-tile-header">
                  <div className="flex-center gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed">shield_lock</span>
                    <span className="font-label-code text-secondary-fixed tracking-wider uppercase">
                      Zero-Tolerance Chain of Custody
                    </span>
                  </div>
                  <span className="font-label-code text-secondary-fixed-dim">
                    SHA-256 LEDGER
                  </span>
                </div>

                <div className="navy-tile-content">
                  <h3 className="navy-tile-title">
                    Cryptographic Handoff &amp; Verified Lot Dispatch
                  </h3>
                  <p className="navy-tile-text">
                    All dispensary lot disbursements require dual-key biometric HSM verification 
                    before release into secondary logistics corridors.
                  </p>
                </div>

                <div className="navy-tile-footer">
                  <div className="navy-meta-pill">
                    <span className="dot dot-success"></span>
                    <span>Active Lot: #LOT-9824-VA</span>
                  </div>
                  <Link to="/orders" className="btn-pill-lavender">
                    <span>Inspect Manifest</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MICROSERVICES PIPELINE FLOW ===================== */}
      <section className="pipeline-section">
        <div className="section-header-centered">
          <div className="font-section-eyebrow text-secondary uppercase tracking-widest">
            Distributed Topology
          </div>
          <h2 className="font-headline-lg section-title uppercase">
            Zero-Trust Pharmaceutical Microservices Flow
          </h2>
          <p className="font-body-lg section-desc">
            End-to-end asynchronous order and stock deduction lifecycle engineered with Spring Boot, 
            Eureka Service Discovery, and Feign Client resilience.
          </p>
        </div>

        <div className="pipeline-grid">
          {/* Step 1 */}
          <div className="pipeline-card">
            <div className="pipeline-step-badge">STAGE 01</div>
            <div className="pipeline-icon-circle">
              <span className="material-symbols-outlined">router</span>
            </div>
            <h4 className="pipeline-card-title">Spring Cloud Gateway</h4>
            <div className="font-label-code pipeline-port">PORT: 8080 // EDGE</div>
            <p className="pipeline-card-desc">
              Performs edge JWT authentication, cryptographic request signing, rate limiting, 
              and dynamic reverse proxy routing.
            </p>
            <div className="pipeline-card-footer">
              <span className="dot dot-success"></span>
              <span className="font-label-code text-optimal">12ms Routing Latency</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="pipeline-card">
            <div className="pipeline-step-badge">STAGE 02</div>
            <div className="pipeline-icon-circle">
              <span className="material-symbols-outlined">hub</span>
            </div>
            <h4 className="pipeline-card-title">Eureka Service Registry</h4>
            <div className="font-label-code pipeline-port">PORT: 8761 // CLUSTER</div>
            <p className="pipeline-card-desc">
              Autonomous service registration, periodic cluster heartbeat validation, and 
              resilient client-side load balancing.
            </p>
            <div className="pipeline-card-footer">
              <span className="dot dot-success"></span>
              <span className="font-label-code text-optimal">6/6 Nodes Heartbeat OK</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="pipeline-card">
            <div className="pipeline-step-badge">STAGE 03</div>
            <div className="pipeline-icon-circle">
              <span className="material-symbols-outlined">medication</span>
            </div>
            <h4 className="pipeline-card-title">Medicine &amp; Order Services</h4>
            <div className="font-label-code pipeline-port">PORT: 8081 / 8082 // REST</div>
            <p className="pipeline-card-desc">
              Synchronous Feign client communication enforces 21 CFR Part 11 prescription 
              validation and doctor credentials checks.
            </p>
            <div className="pipeline-card-footer">
              <span className="dot dot-success"></span>
              <span className="font-label-code text-optimal">Feign RPC Protected</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="pipeline-card">
            <div className="pipeline-step-badge">STAGE 04</div>
            <div className="pipeline-icon-circle">
              <span className="material-symbols-outlined">sync_saved_locally</span>
            </div>
            <h4 className="pipeline-card-title">Stock Deduction Engine</h4>
            <div className="font-label-code pipeline-port">PORT: 8083 // ACID LOCK</div>
            <p className="pipeline-card-desc">
              Atomic transactional reduction locks inventory batch reservations and commits 
              immutable SHA-256 lot audit trails.
            </p>
            <div className="pipeline-card-footer">
              <span className="dot dot-success"></span>
              <span className="font-label-code text-optimal">Zero Double-Allocation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURE CAPABILITIES GRID ===================== */}
      <section className="features-section">
        <div className="section-header-left">
          <div className="font-section-eyebrow text-secondary uppercase tracking-widest">
            Institutional Capability
          </div>
          <h2 className="font-headline-lg section-title uppercase">
            Clinical Supply Infrastructure
          </h2>
          <p className="font-body-lg section-desc">
            Engineered to exceed FDA, cGMP, and European Pharmacopoeia regulatory governance.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-img-wrapper">
              <img 
                src={carouselLabImg} 
                alt="Automated medicine carousel in clinical laboratory" 
                className="feature-img"
              />
            </div>
            <div className="feature-body">
              <div className="feature-tag">HIGH VELOCITY DISPENSARY</div>
              <h3 className="feature-title">Automated Carousel Dispensing</h3>
              <p className="feature-text">
                Robotic picking carousels synchronized with digital formulary ledgers eliminate 
                human medication selection errors down to &lt;0.001%.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-img-wrapper">
              <img 
                src={coldChainVaultImg} 
                alt="Automated pharmaceutical cold chain storage vault" 
                className="feature-img"
              />
            </div>
            <div className="feature-body">
              <div className="feature-tag">TEMPERATURE GOVERNANCE</div>
              <h3 className="feature-title">High-Density Cryogenic Vaults</h3>
              <p className="feature-text">
                Continuous IoT dual-sensor logging guarantees that biologics and vaccines 
                remain strictly confined to the validated 2.0°C to 8.0°C band.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-img-wrapper">
              <img 
                src={medicineVialsImg} 
                alt="Prescription medicine glass vials with 2D DataMatrix barcodes" 
                className="feature-img"
              />
            </div>
            <div className="feature-body">
              <div className="feature-tag">SERIALIZATION ASSURANCE</div>
              <h3 className="feature-title">GS1 DataMatrix Lot Traceability</h3>
              <p className="feature-text">
                Every unit carries a serialized 2D matrix barcode cross-referenced against 
                the national pharmaceutical repository for counterfeit prevention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== QUICK ACTION BANNER ===================== */}
      <section className="cta-banner-section">
        <div className="cta-banner-card">
          <div className="cta-banner-left">
            <div className="cta-icon-avatar">
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-on-surface">
                Ready to access the clinical pharmaceutical catalog?
              </h3>
              <p className="font-body-sm text-outline">
                Over 12,000 verified stock lines active across North American distribution hubs.
              </p>
            </div>
          </div>
          <div className="cta-banner-actions">
            <Link to="/catalog" className="btn-primary">
              Launch Catalog
            </Link>
            <Link to="/orders" className="btn-secondary">
              Review Orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
