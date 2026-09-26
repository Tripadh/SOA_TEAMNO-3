import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ApothecaryHome from './pages/ApothecaryHome';
import PharmacyDashboard from './pages/PharmacyDashboard';
import MedicineCatalog from './pages/MedicineCatalog';
import OrderTracking from './pages/OrderTracking';
import ClinicalIntelligence from './pages/ClinicalIntelligence';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<ApothecaryHome />} />
          <Route path="/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/catalog" element={<MedicineCatalog />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/clinical" element={<ClinicalIntelligence />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
