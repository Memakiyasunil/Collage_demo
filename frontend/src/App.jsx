import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import FloatingSocials from './components/FloatingSocials';
import Home from './pages/Home';
import About from './pages/About';
import Vision from './pages/Vision';
import CoreTeam from './pages/CoreTeam';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Partners from './pages/Partners';
import ServiceDetail from './pages/ServiceDetail';
import Careers from './pages/Careers';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminDashboard, AdminCourses, AdminFooter, AdminPartners } from './pages/admin/AdminPages';

// Simple Protected Route wrapper
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/core-team" element={<CoreTeam />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Login Route */}
          <Route 
            path="/admin/login" 
            element={
              isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin onLogin={() => setIsAuthenticated(true)} />
            } 
          />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/courses" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminCourses onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/footer" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminFooter onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/partners" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminPartners onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {!isAdminRoute && <FloatingSocials />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
