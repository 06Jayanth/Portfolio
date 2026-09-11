import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { PublicPortfolio } from './pages/PublicPortfolio';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <PortfolioProvider>
      <HashRouter>
        <Routes>
          {/* Public Portfolio - 100% View Only */}
          <Route path="/" element={<PublicPortfolio />} />

          {/* Private Admin Route - Login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Private Admin Route - Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </PortfolioProvider>
  );
}
