import React from 'react';
import { LayoutDashboard, BookOpen, Users, Mail, LogOut } from 'lucide-react';
import './Admin.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Education Force Admin</h2>
        </div>
        <nav className="admin-nav">
          <a href="/admin" className="admin-nav-item active"><LayoutDashboard size={20}/> Dashboard</a>
          <a href="/admin/courses" className="admin-nav-item"><BookOpen size={20}/> Courses</a>
          <a href="/admin/inquiries" className="admin-nav-item"><Users size={20}/> Inquiries</a>
          <a href="/admin/contacts" className="admin-nav-item"><Mail size={20}/> Contacts</a>
        </nav>
        <div className="admin-logout">
          <button className="btn-logout"><LogOut size={20}/> Logout</button>
        </div>
      </div>
      <div className="admin-main">
        <div className="admin-header">
          <h3>Welcome, Admin</h3>
        </div>
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h2 className="admin-page-title">Dashboard Overview</h2>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h4>Total Courses</h4>
          <p className="stat-number">24</p>
        </div>
        <div className="admin-stat-card">
          <h4>Total Inquiries</h4>
          <p className="stat-number">156</p>
        </div>
        <div className="admin-stat-card">
          <h4>Contact Messages</h4>
          <p className="stat-number">48</p>
        </div>
      </div>
      
      <div className="admin-recent-activity">
        <h3>Recent Activity</h3>
        <p className="text-muted">No recent activity to display.</p>
      </div>
    </AdminLayout>
  );
};

export const AdminCourses = () => {
  return (
    <AdminLayout>
      <div className="admin-flex-header">
        <h2 className="admin-page-title">Manage Courses</h2>
        <button className="btn-primary">Add New Course</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AI & Machine Learning</td>
              <td>Technology</td>
              <td>4 Years</td>
              <td><button className="btn-text">Edit</button> | <button className="btn-text text-danger">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
