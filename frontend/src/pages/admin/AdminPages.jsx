import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Mail, LogOut, Settings, Plus, Edit2, Trash2, X } from 'lucide-react';
import './Admin.css';
import './AdminModal.css';

const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Education Force Admin</h2>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({isActive}) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
            <LayoutDashboard size={20}/> Dashboard
          </NavLink>
          <NavLink to="/admin/courses" className={({isActive}) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
            <BookOpen size={20}/> Courses
          </NavLink>
          <NavLink to="/admin/inquiries" className={({isActive}) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
            <Users size={20}/> Inquiries
          </NavLink>
          <NavLink to="/admin/partners" className={({isActive}) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
            <LayoutDashboard size={20}/> Partners
          </NavLink>
          <NavLink to="/admin/footer" className={({isActive}) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
            <Settings size={20}/> Footer Setup
          </NavLink>
        </nav>
        <div className="admin-logout">
          <button className="btn-logout" onClick={onLogout}><LogOut size={20}/> Logout</button>
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

export const AdminDashboard = ({ onLogout }) => {
  return (
    <AdminLayout onLogout={onLogout}>
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
    </AdminLayout>
  );
};

export const AdminCourses = ({ onLogout }) => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'AI & Machine Learning', category: 'Technology', duration: '4 Years' },
    { id: 2, title: 'Data Analytics', category: 'Technology', duration: '3 Years' },
    { id: 3, title: 'Cyber Security & DF', category: 'Technology', duration: '4 Years' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', category: '', duration: '' });

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData(course);
    } else {
      setEditingCourse(null);
      setFormData({ title: '', category: '', duration: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...formData, id: c.id } : c));
    } else {
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="admin-flex-header">
        <h2 className="admin-page-title">Manage Courses</h2>
        <button className="btn-primary" onClick={() => openModal()}><Plus size={16} style={{display:'inline', marginBottom:'-3px'}}/> Add New Course</button>
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
            {courses.length === 0 && (
              <tr><td colSpan="4" style={{textAlign:'center', padding:'2rem'}}>No courses found.</td></tr>
            )}
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.duration}</td>
                <td>
                  <button className="btn-icon text-primary" onClick={() => openModal(course)}><Edit2 size={18}/></button>
                  <button className="btn-icon text-danger ml-2" onClick={() => handleDelete(course.id)}><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <button className="btn-close" onClick={closeModal}><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Course Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. B.Tech Computer Science" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Management">Management</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input type="text" required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 4 Years" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline-sm" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export const AdminFooter = ({ onLogout }) => {
  const [footerData, setFooterData] = useState({
    description: 'Education Force is a Section-8 non-profit organization committed to transforming IT education through industry-aligned programs and cutting-edge specializations.',
    address: '18, Vithal Plaza, 4th Floor, Opp. GEB Office, Dehgam Rd, Nava Naroda, Ahmedabad 382330',
    phone1: '+91 93775 77596',
    phone2: '+91 93775 77597',
    email: 'info@educationforce.com'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API save
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <h2 className="admin-page-title">Manage Footer Details</h2>
      <div className="admin-card">
        {isSaved && <div className="alert-success">Footer details updated successfully!</div>}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Footer Description</label>
            <textarea 
              rows="4"
              value={footerData.description} 
              onChange={e => setFooterData({...footerData, description: e.target.value})}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Office Address</label>
            <input 
              type="text" 
              value={footerData.address} 
              onChange={e => setFooterData({...footerData, address: e.target.value})}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group w-50">
              <label>Phone Number 1</label>
              <input 
                type="text" 
                value={footerData.phone1} 
                onChange={e => setFooterData({...footerData, phone1: e.target.value})}
                required
              />
            </div>
            <div className="form-group w-50">
              <label>Phone Number 2 (Optional)</label>
              <input 
                type="text" 
                value={footerData.phone2} 
                onChange={e => setFooterData({...footerData, phone2: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={footerData.email} 
              onChange={e => setFooterData({...footerData, email: e.target.value})}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary mt-4">Save Changes</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export const AdminPartners = ({ onLogout }) => {
  const [partners, setPartners] = useState([
    { id: 1, name: 'Gandhinagar University', programCount: 12, colorTheme: 'purple' },
    { id: 2, name: 'Vidhyadeep University', programCount: 13, colorTheme: 'blue' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', programCount: '', colorTheme: 'purple' });

  const openModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData(partner);
    } else {
      setEditingPartner(null);
      setFormData({ name: '', programCount: '', colorTheme: 'purple' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPartner) {
      setPartners(partners.map(p => p.id === editingPartner.id ? { ...formData, id: p.id } : p));
    } else {
      setPartners([...partners, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      setPartners(partners.filter(p => p.id !== id));
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="admin-flex-header">
        <h2 className="admin-page-title">Manage Partners</h2>
        <button className="btn-primary" onClick={() => openModal()}><Plus size={16} style={{display:'inline', marginBottom:'-3px'}}/> Add New Partner</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Partner Name</th>
              <th>Theme Color</th>
              <th>Programs Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.length === 0 && (
              <tr><td colSpan="4" style={{textAlign:'center', padding:'2rem'}}>No partners found.</td></tr>
            )}
            {partners.map(partner => (
              <tr key={partner.id}>
                <td>{partner.name}</td>
                <td><span style={{textTransform:'capitalize'}}>{partner.colorTheme}</span></td>
                <td>{partner.programCount} Programs</td>
                <td>
                  <button className="btn-icon text-primary" onClick={() => openModal(partner)}><Edit2 size={18}/></button>
                  <button className="btn-icon text-danger ml-2" onClick={() => handleDelete(partner.id)}><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingPartner ? 'Edit Partner' : 'Add New Partner'}</h3>
              <button className="btn-close" onClick={closeModal}><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>University Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Gandhinagar University" />
              </div>
              <div className="form-group">
                <label>Theme Color</label>
                <select required value={formData.colorTheme} onChange={e => setFormData({...formData, colorTheme: e.target.value})}>
                  <option value="purple">Purple</option>
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Programs</label>
                <input type="number" required value={formData.programCount} onChange={e => setFormData({...formData, programCount: e.target.value})} placeholder="e.g. 12" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline-sm" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
