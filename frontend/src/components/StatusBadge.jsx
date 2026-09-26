import './StatusBadge.css';

export default function StatusBadge({
  label,
  type = 'optimal',
  pulse = false,
  showDot = true,
  className = ''
}) {
  const getTypeClass = () => {
    switch (type) {
      case 'optimal':
      case 'success':
        return 'badge-optimal';
      case 'warning':
        return 'badge-warning';
      case 'critical':
      case 'error':
        return 'badge-critical';
      case 'protocol':
      case 'purple':
        return 'badge-protocol';
      default:
        return 'badge-neutral';
    }
  };

  const getDotClass = () => {
    switch (type) {
      case 'optimal':
      case 'success':
        return 'dot-success';
      case 'warning':
        return 'dot-warning';
      case 'critical':
      case 'error':
        return 'dot-critical';
      case 'protocol':
      case 'purple':
        return 'dot-purple';
      default:
        return 'dot-neutral';
    }
  };

  return (
    <span className={`badge-status ${getTypeClass()} ${className}`}>
      {showDot && (
        <span className={`dot ${getDotClass()} ${pulse ? 'dot-pulse' : ''}`} />
      )}
      <span>{label}</span>
    </span>
  );
}
