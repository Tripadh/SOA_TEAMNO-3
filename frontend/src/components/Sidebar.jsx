import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { systemStatus } from '../data/mockData';
import './Sidebar.css';

export default function Sidebar({ isOpen, onCloseMobile }) {
  const [activeMode, setActiveMode] = useState('operations');

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          {/* Operations / Customer Mode Switcher */}
          <div className="mode-switcher-container">
            <button
              type="button"
              className={`mode-btn ${activeMode === 'operations' ? 'active' : ''}`}
              onClick={() => setActiveMode('operations')}
            >
              Operations
            </button>
            <button
              type="button"
              className={`mode-btn ${activeMode === 'customer' ? 'active' : ''}`}
              onClick={() => setActiveMode('customer')}
            >
              Customer
            </button>
          </div>

          {/* Operational Protocol Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              Operational Protocol
            </div>

            <nav className="sidebar-nav">
              <NavLink
                to="/pharmacy"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
              >
                <span className="material-symbols-outlined link-icon">grid_view</span>
                <span className="link-label">Overview</span>
              </NavLink>

              <NavLink
                to="/catalog"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
              >
                <span className="material-symbols-outlined link-icon">medication</span>
                <span className="link-label">Medicines</span>
              </NavLink>

              <NavLink
                to="/orders"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
              >
                <span className="material-symbols-outlined link-icon">package_2</span>
                <span className="link-label">Orders &amp; Handshakes</span>
              </NavLink>

              <NavLink
                to="/clinical"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
              >
                <span className="material-symbols-outlined link-icon">insights</span>
                <span className="link-label">Clinical Intelligence</span>
              </NavLink>

              <NavLink
                to="/home"
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
              >
                <span className="material-symbols-outlined link-icon">home</span>
                <span className="link-label">Home Portal</span>
              </NavLink>
            </nav>
          </div>

          {/* Infrastructure Quick Telemetry Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              System Topologies
            </div>
            <div className="sidebar-quick-status">
              <div className="quick-status-item">
                <span className="dot dot-success"></span>
                <span>Eureka Discovery (8761)</span>
              </div>
              <div className="quick-status-item">
                <span className="dot dot-success"></span>
                <span>Spring Gateway (8080)</span>
              </div>
              <div className="quick-status-item">
                <span className="dot dot-success"></span>
                <span>Cold-Chain IoT (8083)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Node Audit Card */}
        <div className="sidebar-footer">
          <div className="node-audit-card">
            <div className="node-audit-header">
              <span className="node-audit-label">NODE AUDIT</span>
              <span className="dot dot-success dot-pulse"></span>
            </div>
            <div className="node-audit-id">{systemStatus.nodeAudit}</div>
            <div className="node-audit-subtext">{systemStatus.hsmStatus}</div>
          </div>
        </div>
      </aside>
    </>
  );
}
