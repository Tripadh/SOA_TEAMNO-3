import { NavLink } from 'react-router-dom';
import { systemStatus } from '../data/mockData';
import './Header.css';

export default function Header({ onToggleMobileSidebar }) {
  const { pharmacist } = systemStatus;

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Left Section: Mobile Menu + Brand + Top Navigation */}
        <div className="header-left">
          <button 
            type="button" 
            className="mobile-menu-btn"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <NavLink to="/home" className="header-brand">
            <img 
              src="/logo.svg" 
              alt="Apothecary Express Brand Logo" 
              className="brand-logo-img" 
            />
            <span className="brand-text">
              Apothecary<span className="brand-accent">Express</span>
            </span>
          </NavLink>

          <div className="header-divider hidden-md"></div>

          <nav className="header-nav hidden-lg">
            <NavLink 
              to="/home" 
              className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/pharmacy" 
              className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
            >
              Overview
            </NavLink>
            <NavLink 
              to="/catalog" 
              className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
            >
              Catalog
            </NavLink>
            <NavLink 
              to="/orders" 
              className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
            >
              My Orders
            </NavLink>
            <NavLink 
              to="/clinical" 
              className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
            >
              Clinical Intelligence
            </NavLink>
          </nav>
        </div>

        {/* Right Section: System Health + Search + Alerts + Profile */}
        <div className="header-right">
          <div className="service-status-pill hidden-md">
            <span className="dot dot-success dot-pulse"></span>
            <span className="service-status-text">SERVICES ACTIVE: 6/6 ONLINE</span>
          </div>

          <div className="header-search hidden-sm">
            <span className="material-symbols-outlined search-icon">search</span>
            <input 
              type="text" 
              placeholder="Global search formulary & orders..." 
              className="search-input"
            />
            <kbd className="search-kbd">⌘K</kbd>
          </div>

          <div className="header-actions">
            <button 
              type="button" 
              className="btn-icon notification-btn"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="notification-badge">3</span>
            </button>

            <div className="header-divider"></div>

            <div className="user-profile-widget">
              <div className="user-info hidden-xs">
                <div className="user-name">{pharmacist.name}</div>
                <div className="user-role">{pharmacist.role}</div>
              </div>
              <div className="user-avatar" title={pharmacist.name}>
                <span className="material-symbols-outlined">person</span>
              </div>
              <span className="material-symbols-outlined user-chevron hidden-xs">expand_more</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
