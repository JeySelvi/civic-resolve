
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import UserLoginPage from './pages/auth/UserLoginPage';
import UserRegisterPage from './pages/auth/UserRegisterPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import NewComplaintPage from './pages/user/NewComplaintPage';
import UserComplaintDetailsPage from './pages/user/UserComplaintDetailsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminComplaintDetailsPage from './pages/admin/AdminComplaintDetailsPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<UserLoginPage />} />
              <Route path="/register" element={<UserRegisterPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* User Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user']}><UserDashboardPage /></ProtectedRoute>} />
              <Route path="/new-complaint" element={<ProtectedRoute allowedRoles={['user']}><NewComplaintPage /></ProtectedRoute>} />
              <Route path="/complaints/:id" element={<ProtectedRoute allowedRoles={['user']}><UserComplaintDetailsPage /></ProtectedRoute>} />

              {/* Admin Protected Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>} />
              <Route path="/admin/complaints/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminComplaintDetailsPage /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
