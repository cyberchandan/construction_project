import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { StickyActionBar } from './components/common/StickyActionBar';
import { useAuth } from './context/AuthContext';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { MaterialLabourServicePage } from './pages/public/MaterialLabourServicePage';
import { LabourOnlyServicePage } from './pages/public/LabourOnlyServicePage';
import { ProjectsGalleryPage } from './pages/public/ProjectsGalleryPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { CostCalculatorPage } from './pages/public/CostCalculatorPage';
import { NoidaLandingPage } from './pages/public/NoidaLandingPage';
import { GreaterNoidaLandingPage } from './pages/public/GreaterNoidaLandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminStaffPage } from './pages/admin/AdminStaffPage';

// Protected Admin Route Guard
const ProtectedAdminRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-slate-100 flex items-center justify-center font-bold text-forest-900">Loading Session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* Public Web Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/material-plus-labour" element={<MaterialLabourServicePage />} />
          <Route path="/services/labour-only" element={<LabourOnlyServicePage />} />
          <Route path="/projects" element={<ProjectsGalleryPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/cost-calculator" element={<CostCalculatorPage />} />
          <Route path="/locations/noida" element={<NoidaLandingPage />} />
          <Route path="/locations/greater-noida" element={<GreaterNoidaLandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          {/* Admin Auth & Dashboard Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedAdminRoute>
                <AdminLeadsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedAdminRoute>
                <AdminProjectsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/quotes"
            element={
              <ProtectedAdminRoute>
                <AdminQuotesPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute requiredRole="admin">
                <AdminSettingsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedAdminRoute requiredRole="admin">
                <AdminStaffPage />
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {!isAdminRoute && (
        <>
          <Footer />
          <StickyActionBar />
        </>
      )}
    </div>
  );
}

export default App;
