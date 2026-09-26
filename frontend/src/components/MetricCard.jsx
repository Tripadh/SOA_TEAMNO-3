import './MetricCard.css';

export default function MetricCard({
  title,
  value,
  delta,
  deltaType = 'positive',
  icon,
  subtext
}) {
  const getDeltaBadgeClass = () => {
    switch (deltaType) {
      case 'positive':
        return 'delta-positive';
      case 'critical':
        return 'delta-critical';
      case 'warning':
        return 'delta-warning';
      default:
        return 'delta-neutral';
    }
  };

  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <span className="font-section-eyebrow text-outline uppercase">{title}</span>
        {icon && (
          <div className="metric-icon-wrapper">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
      </div>

      <div className="metric-card-body">
        <div className="font-metric-display metric-card-value text-on-surface">
          {value}
        </div>
      </div>

      <div className="metric-card-footer">
        {delta && (
          <div className={`metric-delta-badge ${getDeltaBadgeClass()}`}>
            {deltaType === 'positive' && (
              <span className="material-symbols-outlined delta-arrow">trending_up</span>
            )}
            {deltaType === 'critical' && (
              <span className="material-symbols-outlined delta-arrow">emergency</span>
            )}
            <span>{delta}</span>
          </div>
        )}
        {subtext && (
          <span className="font-body-sm text-outline metric-subtext">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
