import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="dashboard-root">
      <Header onToggleMobileSidebar={toggleMobileSidebar} />
      <Sidebar isOpen={isMobileSidebarOpen} onCloseMobile={closeMobileSidebar} />

      <div className="layout-content-wrapper">
        <main className="layout-main-canvas">
          <Outlet />
        </main>
        
        <footer className="app-footer">
          <div className="footer-inner">
            <div className="footer-left">
              <span className="font-section-eyebrow text-outline">Apothecary Express Architecture</span>
              <span className="footer-pipe">|</span>
              <span className="font-body-sm text-outline">
                © 2026 Regulated Pharmaceutical Network. 21 CFR Part 11 Compliant.
              </span>
            </div>
            <div className="footer-right">
              <span className="font-label-code text-outline">SECURITY LEVEL 4</span>
              <span className="font-label-code text-on-surface-variant font-semibold">DISPATCH TERMINAL VERIFIED</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
