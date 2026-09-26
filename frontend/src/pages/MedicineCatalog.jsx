import { useState, useMemo } from 'react';
import MedicineCard from '../components/MedicineCard';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { medicineCatalog } from '../data/mockData';
import './MedicineCatalog.css';

const CATEGORIES = [
  'All Formulations',
  'Prescription Only (Rx)',
  'Over The Counter (OTC)',
  'Cold Chain Monitored'
];

export default function MedicineCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Formulations');
  const [sortBy, setSortBy] = useState('tier');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedMonograph, setSelectedMonograph] = useState(null);
  const [cartNotification, setCartNotification] = useState('');

  // Filtering & Sorting
  const filteredMedicines = useMemo(() => {
    return medicineCatalog.filter(med => {
      const matchesSearch = 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.ndc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.lotNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'All Formulations' ||
        med.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Prescription Only (Rx)' && med.badge === 'Rx Only') ||
        (selectedCategory === 'Over The Counter (OTC)' && med.badge === 'OTC Form');

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock-desc') return b.stock - a.stock;
      return 0; // Default tier order
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleAddToRequisition = (med) => {
    setCartNotification(`Requisition added: ${med.name} (${med.unit})`);
    setTimeout(() => setCartNotification(''), 3000);
  };

  const handleViewMonograph = (med) => {
    setSelectedMonograph(med);
  };

  const tableColumns = [
    {
      key: 'name',
      header: 'Formulation / Compound',
      render: (val, row) => (
        <div className="table-med-cell">
          <div 
            className="table-med-icon"
            style={{ backgroundColor: row.iconBg, color: row.iconColor }}
          >
            <span className="material-symbols-outlined">{row.icon}</span>
          </div>
          <div>
            <div className="font-label-nav font-bold text-on-surface">{val}</div>
            <div className="font-body-sm text-outline">{row.activeIngredient}</div>
          </div>
        </div>
      )
    },
    {
      key: 'ndc',
      header: 'NDC & Lot',
      render: (val, row) => (
        <div>
          <div className="font-label-code">{val}</div>
          <div className="font-label-code text-outline text-[11px]">{row.lotNumber}</div>
        </div>
      )
    },
    {
      key: 'dosageForm',
      header: 'Form & Temp',
      render: (val, row) => (
        <div>
          <div className="font-body-sm text-on-surface">{val}</div>
          <div className="font-label-code text-outline text-[11px]">{row.storageTemp}</div>
        </div>
      )
    },
    {
      key: 'stock',
      header: 'Stock Inventory',
      render: (val) => (
        <span className={`font-label-code font-bold ${val < 100 ? 'text-critical' : 'text-optimal'}`}>
          {val.toLocaleString()} units
        </span>
      )
    },
    {
      key: 'price',
      header: 'Requisition Price',
      render: (val, row) => (
        <div>
          <span className="font-label-code font-bold">${val.toFixed(2)}</span>
          <span className="font-body-sm text-outline text-[11px]"> /{row.unit}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (val, row) => (
        <StatusBadge label={val} type={row.statusType} showDot={true} />
      )
    },
    {
      key: 'actions',
      header: 'Requisition',
      align: 'right',
      render: (_, row) => (
        <button
          type="button"
          className="btn-primary table-add-btn"
          onClick={() => handleAddToRequisition(row)}
        >
          <span>Add</span>
        </button>
      )
    }
  ];

  return (
    <div className="page-container catalog-page">
      {/* ===================== TOP HEADER & ASYMMETRIC TELEMETRY ===================== */}
      <section className="catalog-header-grid">
        <div className="catalog-header-left">
          <div className="catalog-flags-row">
            <span className="font-label-code flag-pill">REGULATORY FORMULARY v4.9</span>
            <span className="dot dot-purple"></span>
            <span className="font-label-code text-outline">21 CFR PART 11 AUDITED</span>
          </div>

          <h1 className="font-display-hero catalog-title uppercase">
            Medicine<br />
            <span className="text-secondary">Catalog</span>
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            Explore verified pharmaceutical formulations, dosage forms, and live regional 
            inventory across licensed temperature-controlled dispensing nodes.
          </p>
        </div>

        {/* Level 2 Deep Navy Telemetry Card */}
        <div className="card-navy catalog-navy-telemetry">
          <div className="navy-ambient-glow"></div>
          <div className="telemetry-top">
            <div className="telemetry-badge">
              <span className="dot dot-success dot-pulse"></span>
              <span className="font-label-code text-secondary-fixed">EUREKA MED-SYNC ENGINE</span>
            </div>
            <span className="material-symbols-outlined text-secondary-fixed-dim">database</span>
          </div>

          <div className="telemetry-mid">
            <div className="font-metric-display text-surface-container-lowest leading-none">
              1,248
            </div>
            <div className="font-body-sm text-secondary-fixed-dim">Verified Clinical Actives</div>
          </div>

          <div className="telemetry-bottom-strip">
            <div className="mini-stat">
              <span className="font-label-code font-bold text-surface-container-lowest">24</span>
              <span className="font-body-sm text-secondary-fixed-dim">Cold-Chain Cryo</span>
            </div>
            <div className="mini-stat-pipe"></div>
            <div className="mini-stat">
              <span className="font-label-code font-bold text-optimal">99.8%</span>
              <span className="font-body-sm text-secondary-fixed-dim">Availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Notification Bar */}
      {cartNotification && (
        <div className="cart-notification-bar">
          <span className="material-symbols-outlined text-secondary">check_circle</span>
          <span className="font-label-nav text-on-surface">{cartNotification}</span>
        </div>
      )}

      {/* ===================== SEARCH & DYNAMIC FILTER HUB ===================== */}
      <section className="catalog-filters-card">
        <div className="filter-controls-top">
          {/* Search Bar */}
          <div className="catalog-search-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              placeholder="Search active formulations, NDC codes, generic compounds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="catalog-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="btn-icon clear-btn"
                onClick={() => setSearchQuery('')}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
            <kbd className="search-kbd hidden-xs">⌘K</kbd>
          </div>

          {/* Sort Selector */}
          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="tier">Sorting: Formulary Tier (Default)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-desc">Stock Volume: High to Low</option>
            </select>

            {/* View Mode Toggle */}
            <div className="view-toggle-group">
              <button
                type="button"
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table View"
              >
                <span className="material-symbols-outlined">table_rows</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-row">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Ribbon Summary */}
        <div className="filter-summary-ribbon">
          <span className="font-body-sm text-outline">
            Showing <strong className="text-on-surface">{filteredMedicines.length}</strong> of 1,248 clinical compounds
          </span>
          <span className="font-label-code text-secondary filter-tag-meta">
            ACTIVE FILTERS: {selectedCategory.toUpperCase()}
          </span>
        </div>
      </section>

      {/* ===================== MEDICINES PRESENTATION ===================== */}
      <section className="catalog-presentation-section">
        {viewMode === 'grid' ? (
          <div className="medicine-bento-grid">
            {filteredMedicines.map(med => (
              <MedicineCard
                key={med.id}
                medicine={med}
                onAddToRequisition={handleAddToRequisition}
                onViewMonograph={handleViewMonograph}
              />
            ))}
          </div>
        ) : (
          <DataTable
            columns={tableColumns}
            data={filteredMedicines}
            keyField="id"
          />
        )}
      </section>

      {/* ===================== BOTTOM CLINICAL ASSURANCE BANNER ===================== */}
      <section className="catalog-assurance-card">
        <div className="assurance-header">
          <span className="font-section-eyebrow text-secondary uppercase">Institutional Governance</span>
          <h3 className="font-headline-sm text-on-surface">Chain of Custody &amp; Formulation Security</h3>
        </div>

        <div className="assurance-grid">
          <div className="assurance-item">
            <span className="material-symbols-outlined text-secondary">fingerprint</span>
            <div>
              <h4 className="font-label-nav font-bold text-on-surface">SHA-256 Lot Serialization</h4>
              <p className="font-body-sm text-outline">
                Every unit carries a cryptographic hash tied to parent active pharmaceutical ingredient batches.
              </p>
            </div>
          </div>

          <div className="assurance-item">
            <span className="material-symbols-outlined text-secondary">verified</span>
            <div>
              <h4 className="font-label-nav font-bold text-on-surface">21 CFR Part 11 Audit Trail</h4>
              <p className="font-body-sm text-outline">
                Non-repudiable pharmacist release signatures recorded in immutable transaction ledgers.
              </p>
            </div>
          </div>

          <div className="assurance-item">
            <span className="material-symbols-outlined text-secondary">thermostat</span>
            <div>
              <h4 className="font-label-nav font-bold text-on-surface">Cold-Chain Cryptographic Handoff</h4>
              <p className="font-body-sm text-outline">
                Continuous IoT data loggers verify that temperature limits were unbroken throughout transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MONOGRAPH MODAL ===================== */}
      {selectedMonograph && (
        <div className="modal-backdrop" onClick={() => setSelectedMonograph(null)}>
          <div className="monograph-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="badge-formulary">{selectedMonograph.badge}</span>
                <h3 className="font-headline-md text-on-surface">{selectedMonograph.name}</h3>
                <span className="font-body-sm text-outline">{selectedMonograph.activeIngredient}</span>
              </div>
              <button 
                type="button" 
                className="btn-icon"
                onClick={() => setSelectedMonograph(null)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-meta-grid">
                <div>
                  <span className="font-section-eyebrow text-outline">NDC Identifier</span>
                  <div className="font-label-code">{selectedMonograph.ndc}</div>
                </div>
                <div>
                  <span className="font-section-eyebrow text-outline">Manufacturer</span>
                  <div className="font-body-sm font-semibold">{selectedMonograph.manufacturer}</div>
                </div>
                <div>
                  <span className="font-section-eyebrow text-outline">Storage Temperature</span>
                  <div className="font-label-code">{selectedMonograph.storageTemp}</div>
                </div>
                <div>
                  <span className="font-section-eyebrow text-outline">Available Stock</span>
                  <div className="font-label-code font-bold text-optimal">{selectedMonograph.stock} units</div>
                </div>
              </div>

              <div className="modal-section">
                <h4 className="font-label-nav font-bold text-on-surface">Clinical Description</h4>
                <p className="font-body-md text-on-surface-variant">{selectedMonograph.description}</p>
              </div>

              <div className="modal-section cryptographic-proof-box">
                <span className="font-section-eyebrow text-secondary uppercase">Cryptographic Audit Proof</span>
                <div className="font-label-code text-on-surface text-[11px] break-all">
                  SHA256: 9e88a4e320f92b7c4146a81e9f2a08c58df1890f9a239dc44c82b04f128e67
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setSelectedMonograph(null)}
              >
                Close Monograph
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  handleAddToRequisition(selectedMonograph);
                  setSelectedMonograph(null);
                }}
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Add to Requisition</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
