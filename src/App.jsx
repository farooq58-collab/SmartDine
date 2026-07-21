import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import MenuManagement from './pages/MenuManagement';
import VoiceAgentChat from './pages/VoiceAgentChat';
import TrendsDashboard from './pages/TrendsDashboard';
import ARPreview from './pages/ARPreview';
import OrdersKDS from './pages/OrdersKDS';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a2744',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
            },
            success: {
              iconTheme: { primary: '#2ecc8a', secondary: '#1a2744' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#1a2744' },
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="agent" element={<VoiceAgentChat />} />
            <Route path="trends" element={<TrendsDashboard />} />
            <Route path="ar" element={<ARPreview />} />
            <Route path="orders" element={<OrdersKDS />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
