import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import FloatingSocials from './components/FloatingSocials';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import { AdminDashboard, AdminCourses } from './pages/admin/AdminPages';
import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
      </Routes>
      {!isAdminRoute && <FloatingSocials />}
    </div>
  );
}

export default App;
