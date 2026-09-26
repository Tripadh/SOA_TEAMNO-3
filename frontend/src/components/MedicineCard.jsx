import StatusBadge from './StatusBadge';
import './MedicineCard.css';

export default function MedicineCard({
  medicine,
  onAddToRequisition,
  onViewMonograph
}) {
  const {
    name,
    activeIngredient,
    manufacturer,
    ndc,
    lotNumber,
    storageTemp,
    stock,
    price,
    unit,
    status,
    statusType,
    badge,
    icon,
    iconBg,
    iconColor,
    sparkline,
    isCritical
  } = medicine;

  // Render SVG Sparkline
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null;
    const maxVal = Math.max(...sparkline);
    const minVal = Math.min(...sparkline);
    const range = maxVal - minVal || 1;
    const width = 140;
    const height = 24;

    const points = sparkline.map((val, i) => {
      const x = (i / (sparkline.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    const strokeColor = statusType === 'critical' ? '#EF4444' : '#712EDD';

    return (
      <svg width={width} height={height} className="sparkline-svg" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className={`medicine-card ${isCritical ? 'critical-border' : ''}`}>
      {/* Top Header: Badge & Status */}
      <div className="medicine-card-header">
        <span className="badge-formulary">{badge}</span>
        <StatusBadge
          label={status}
          type={statusType}
          pulse={statusType === 'critical'}
        />
      </div>

      {/* Visual & Core Spec */}
      <div className="medicine-core-spec">
        <div 
          className="medicine-icon-box"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="medicine-titles">
          <h3 className="medicine-name" title={name}>{name}</h3>
          <p className="medicine-active" title={activeIngredient}>{activeIngredient}</p>
          <span className="medicine-manufacturer">{manufacturer}</span>
        </div>
      </div>

      {/* Micro Data Grid */}
      <div className="medicine-grid-meta">
        <div className="meta-item">
          <span className="meta-label">NDC IDENTIFIER</span>
          <span className="meta-value font-label-code">{ndc}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">BATCH LOT</span>
          <span className="meta-value font-label-code">{lotNumber}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">STORAGE TEMP</span>
          <span className="meta-value font-label-code">{storageTemp}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">AVAILABLE STOCK</span>
          <span className={`meta-value font-label-code ${stock < 100 ? 'text-critical' : 'text-optimal'}`}>
            {stock.toLocaleString()} units
          </span>
        </div>
      </div>

      {/* Live Telemetry / Sparkline */}
      <div className="medicine-sparkline-row">
        <div className="sparkline-label-group">
          <span className="sparkline-dot"></span>
          <span className="font-label-code text-outline">
            {isCritical ? 'REPLENISHMENT TRIGGERED' : '30-DAY VELOCITY'}
          </span>
        </div>
        {renderSparkline()}
      </div>

      {/* Card Footer */}
      <div className="medicine-card-footer">
        <div className="medicine-price-block">
          <div className="medicine-price">
            ${price.toFixed(2)}
            <span className="price-unit">/{unit}</span>
          </div>
          <button 
            type="button" 
            className="monograph-link"
            onClick={() => onViewMonograph?.(medicine)}
          >
            Monograph
          </button>
        </div>

        <button
          type="button"
          className={isCritical ? 'btn-urgent btn-action' : 'btn-primary btn-action'}
          onClick={() => onAddToRequisition?.(medicine)}
        >
          <span className="material-symbols-outlined action-icon">
            {isCritical ? 'lock_reset' : 'add_shopping_cart'}
          </span>
          <span>{isCritical ? 'Restock Requisition' : 'Add to Requisition'}</span>
        </button>
      </div>
    </div>
  );
}
