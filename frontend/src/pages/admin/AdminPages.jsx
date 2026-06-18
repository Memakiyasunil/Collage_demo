import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, Mail, LogOut, Settings,
  Plus, Edit2, Trash2, X, Briefcase, Check, ChevronRight,
  GraduationCap, MessageSquare, Handshake, RefreshCw, Eye
} from 'lucide-react';

const API = '/api';

// ─── Shared helpers ────────────────────────────────────────────────────────────
const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, options);
  return res.json();
};

// ─── Shared UI ─────────────────────────────────────────────────────────────────
const Badge = ({ label, color = 'sky' }) => {
  const colors = {
    sky: 'bg-sky-100 text-sky-700',
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    slate: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`inline-block py-0.5 px-2.5 rounded-full text-xs font-bold ${colors[color] || colors.slate}`}>
      {label}
    </span>
  );
};

const StatusToggle = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-xs font-bold border-none cursor-pointer transition-colors ${
      isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
    }`}
  >
    {isActive ? '● Active' : '○ Disabled'}
  </button>
);

const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
    <div className="bg-white w-full max-w-[820px] rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
      {children}
    </div>
  </div>
);

const ModalHeader = ({ title, onClose }) => (
  <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 sticky top-0 bg-white z-10">
    <h3 className="text-xl text-slate-900 font-bold">{title}</h3>
    <button
      className="bg-slate-100 border-none cursor-pointer text-slate-500 transition-colors hover:bg-red-100 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-full"
      onClick={onClose}
    >
      <X size={16} />
    </button>
  </div>
);

const FormField = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="block font-semibold text-slate-600 text-sm">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full p-3 border border-slate-200 rounded-lg text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 bg-white";

const ActionBtn = ({ icon: Icon, color = 'sky', onClick, title }) => {
  const colors = {
    sky: 'text-sky-500 hover:bg-sky-50',
    red: 'text-red-500 hover:bg-red-50',
  };
  return (
    <button
      title={title}
      className={`bg-transparent border-none cursor-pointer p-2 rounded-lg inline-flex items-center justify-center transition-colors ${colors[color]}`}
      onClick={onClick}
    >
      <Icon size={17} />
    </button>
  );
};

const EmptyRow = ({ cols, msg = 'No records found.' }) => (
  <tr>
    <td colSpan={cols} className="text-slate-400 px-6 py-12 text-center italic">
      {msg}
    </td>
  </tr>
);

const TableHead = ({ cols }) => (
  <thead>
    <tr>
      {cols.map((col, i) => (
        <th key={i} className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider px-6 py-4 border-b border-slate-100 text-left">
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

const Toast = ({ message, type = 'success' }) => (
  <div className={`fixed top-6 right-6 z-[2000] flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-sm font-semibold transition-all
    ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
    {type === 'success' ? <Check size={18} /> : <X size={18} />}
    {message}
  </div>
);

// ─── Admin Layout ───────────────────────────────────────────────────────────────
const AdminLayout = ({ children, onLogout, activeSection }) => {
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/courses', icon: GraduationCap, label: 'Courses' },
    { to: '/admin/services', icon: Briefcase, label: 'Services' },
    { to: '/admin/partners', icon: Handshake, label: 'Partners' },
    { to: '/admin/inquiries', icon: Users, label: 'Inquiries' },
    { to: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
    { to: '/admin/footer', icon: Settings, label: 'Footer Setup' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <div className="w-[260px] bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shrink-0 shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-black tracking-tight">
            <span className="text-white">Edu</span>
            <span className="text-yellow-400">forge</span>
            <span className="ml-2 text-sky-400 font-light text-sm">Admin</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">Content Management</p>
        </div>
        <nav className="flex flex-col py-4 grow gap-0.5 px-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `px-4 py-3 flex items-center gap-3 text-sm rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            className="flex items-center gap-2 w-full px-4 py-3 bg-transparent border border-red-500/30 rounded-lg cursor-pointer text-red-400 font-medium text-sm hover:bg-red-500/10 transition-colors"
            onClick={onLogout}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        <div className="bg-white px-8 py-4 border-b border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-semibold capitalize">{activeSection || 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-sm font-semibold text-slate-700">Admin</span>
          </div>
        </div>
        <div className="p-8 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── Page Title ─────────────────────────────────────────────────────────────────
const PageTitle = ({ title, subtitle, action }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const AddBtn = ({ label, onClick }) => (
  <button
    className="bg-sky-500 text-white border-none py-2.5 px-5 rounded-lg text-sm font-bold cursor-pointer transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30 inline-flex items-center gap-2"
    onClick={onClick}
  >
    <Plus size={16} /> {label}
  </button>
);

// ─── Stat Card ──────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colors = {
    sky: 'from-sky-500 to-sky-600',
    green: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-slate-500 text-sm mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-900">{value ?? <RefreshCw size={20} className="animate-spin text-slate-400" />}</p>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════════════════════
export const AdminDashboard = ({ onLogout }) => {
  const [stats, setStats] = useState({ courses: null, inquiries: null, contacts: null, services: null });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, inquiries, contacts, services] = await Promise.all([
          apiFetch(`${API}/course/all`),
          apiFetch(`${API}/inquiry/all`),
          apiFetch(`${API}/contact/all`),
          apiFetch(`${API}/services`),
        ]);
        setStats({
          courses: courses.success ? courses.data.length : 0,
          inquiries: inquiries.success ? inquiries.data.length : 0,
          contacts: contacts.success ? contacts.data.length : 0,
          services: services.success ? services.data.length : 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout onLogout={onLogout} activeSection="Dashboard">
      <PageTitle title="Dashboard Overview" subtitle="Real-time data from MongoDB" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={GraduationCap} label="Total Courses" value={stats.courses} color="sky" />
        <StatCard icon={Briefcase} label="Total Services" value={stats.services} color="purple" />
        <StatCard icon={Users} label="Inquiries Received" value={stats.inquiries} color="green" />
        <StatCard icon={MessageSquare} label="Contact Messages" value={stats.contacts} color="orange" />
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { to: '/admin/courses', label: 'Manage Courses', icon: GraduationCap },
            { to: '/admin/services', label: 'Manage Services', icon: Briefcase },
            { to: '/admin/partners', label: 'Manage Partners', icon: Handshake },
            { to: '/admin/inquiries', label: 'View Inquiries', icon: Users },
            { to: '/admin/contacts', label: 'View Contacts', icon: MessageSquare },
            { to: '/admin/footer', label: 'Footer Setup', icon: Settings },
          ].map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all group"
            >
              <Icon size={20} className="text-slate-400 group-hover:text-sky-500 transition-colors" />
              <span className="text-slate-700 text-sm font-medium group-hover:text-sky-700">{label}</span>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-sky-400 ml-auto" />
            </NavLink>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// COURSES
// ════════════════════════════════════════════════════════════════════════════════
export const AdminCourses = ({ onLogout }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [toast, setToast] = useState(null);

  const defaultCourse = {
    title: '', type: 'UG', description: '', duration: '', eligibility: '',
    totalSeats: '', format: '', status: 'Accepting Applications', overview: '',
    careerStats: { jobsInIndia: '', avgSalary: '', companiesHiring: '' },
    category: '',
  };
  const [formData, setFormData] = useState(defaultCourse);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`${API}/course/all`);
      if (data.success) setCourses(data.data);
    } catch (err) {
      showToast('Failed to load courses', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const openModal = (course = null) => {
    setEditingCourse(course);
    setFormData(course ? { ...course } : defaultCourse);
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingCourse(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await apiFetch(`${API}/course/update/${editingCourse._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        showToast('Course updated successfully!');
      } else {
        await apiFetch(`${API}/course/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        showToast('Course added successfully!');
      }
      fetchCourses();
      closeModal();
    } catch (err) {
      showToast('Failed to save course', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course? This action cannot be undone.')) return;
    try {
      await apiFetch(`${API}/course/${id}`, { method: 'DELETE' });
      showToast('Course deleted.');
      fetchCourses();
    } catch (err) {
      showToast('Failed to delete course', 'error');
    }
  };

  const setCS = (field, val) => setFormData(f => ({ ...f, careerStats: { ...f.careerStats, [field]: val } }));

  return (
    <AdminLayout onLogout={onLogout} activeSection="Courses">
      {toast && <Toast {...toast} />}
      <PageTitle
        title="Manage Courses"
        subtitle={`${courses.length} courses in database`}
        action={<AddBtn label="Add Course" onClick={() => openModal()} />}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <TableHead cols={['Title', 'Type', 'Duration', 'Status', 'Category', 'Actions']} />
          <tbody>
            {loading && <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>}
            {!loading && courses.length === 0 && <EmptyRow cols={6} msg="No courses yet. Click 'Add Course' to create one." />}
            {courses.map(course => (
              <tr key={course._id} className="hover:bg-slate-50 transition-colors">
                <td className="text-slate-800 font-medium px-6 py-4 border-b border-slate-50">{course.title}</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <Badge label={course.type} color={course.type === 'PG' ? 'purple' : course.type === 'INT' ? 'orange' : 'sky'} />
                </td>
                <td className="text-slate-600 px-6 py-4 border-b border-slate-50 text-sm">{course.duration}</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <Badge label={course.status} color={course.status?.toLowerCase().includes('accept') ? 'green' : 'orange'} />
                </td>
                <td className="text-slate-500 px-6 py-4 border-b border-slate-50 text-sm">{course.category || '—'}</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <ActionBtn icon={Edit2} color="sky" onClick={() => openModal(course)} title="Edit" />
                  <ActionBtn icon={Trash2} color="red" onClick={() => handleDelete(course._id)} title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <ModalHeader title={editingCourse ? 'Edit Course' : 'Add New Course'} onClose={closeModal} />
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
            <h4 className="text-sky-600 font-bold text-sm uppercase tracking-widest">Basic Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField label="Course Title">
                  <input className={inputCls} type="text" required value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} placeholder="e.g. B.Tech Computer Science" />
                </FormField>
              </div>
              <FormField label="Program Type">
                <select className={inputCls} required value={formData.type} onChange={e => setFormData(f => ({ ...f, type: e.target.value }))}>
                  <option value="UG">Undergraduate (UG)</option>
                  <option value="PG">Postgraduate (PG)</option>
                  <option value="INT">Integrated (INT)</option>
                </select>
              </FormField>
            </div>
            <FormField label="Category">
              <input className={inputCls} type="text" value={formData.category} onChange={e => setFormData(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Engineering, Science, Arts" />
            </FormField>
            <FormField label="Short Description (Card View)">
              <textarea className={inputCls} rows="2" required value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} placeholder="Brief summary for course cards..." />
            </FormField>

            <h4 className="text-sky-600 font-bold text-sm uppercase tracking-widest mt-2">Course Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Duration">
                <input className={inputCls} type="text" required value={formData.duration} onChange={e => setFormData(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 4 Years" />
              </FormField>
              <FormField label="Eligibility">
                <input className={inputCls} type="text" value={formData.eligibility} onChange={e => setFormData(f => ({ ...f, eligibility: e.target.value }))} placeholder="e.g. 10+2 Science" />
              </FormField>
              <FormField label="Total Seats">
                <input className={inputCls} type="text" value={formData.totalSeats} onChange={e => setFormData(f => ({ ...f, totalSeats: e.target.value }))} placeholder="e.g. 120" />
              </FormField>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Format">
                <input className={inputCls} type="text" value={formData.format} onChange={e => setFormData(f => ({ ...f, format: e.target.value }))} placeholder="e.g. Full-Time / Part-Time" />
              </FormField>
              <FormField label="Status">
                <input className={inputCls} type="text" value={formData.status} onChange={e => setFormData(f => ({ ...f, status: e.target.value }))} placeholder="e.g. Accepting Applications" />
              </FormField>
            </div>
            <FormField label="Program Overview">
              <textarea className={inputCls} rows="5" value={formData.overview} onChange={e => setFormData(f => ({ ...f, overview: e.target.value }))} placeholder="Detailed program overview..." />
            </FormField>

            <h4 className="text-sky-600 font-bold text-sm uppercase tracking-widest mt-2">Career Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Jobs In India">
                <input className={inputCls} type="text" value={formData.careerStats?.jobsInIndia || ''} onChange={e => setCS('jobsInIndia', e.target.value)} placeholder="e.g. 5.2 Lakh+" />
              </FormField>
              <FormField label="Average Salary">
                <input className={inputCls} type="text" value={formData.careerStats?.avgSalary || ''} onChange={e => setCS('avgSalary', e.target.value)} placeholder="e.g. ₹8 LPA" />
              </FormField>
              <FormField label="Companies Hiring">
                <input className={inputCls} type="text" value={formData.careerStats?.companiesHiring || ''} onChange={e => setCS('companiesHiring', e.target.value)} placeholder="e.g. 500+" />
              </FormField>
            </div>

            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-slate-100">
              <button type="button" className="bg-transparent border border-slate-300 text-slate-600 py-2.5 px-6 rounded-lg font-semibold hover:bg-slate-100 transition-colors" onClick={closeModal}>Cancel</button>
              <button type="submit" className="bg-sky-500 text-white py-2.5 px-8 rounded-lg font-bold hover:bg-sky-600 border-none cursor-pointer transition-colors shadow-lg shadow-sky-500/30">
                {editingCourse ? 'Update Course' : 'Add Course'}
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </AdminLayout>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// SERVICES
// ════════════════════════════════════════════════════════════════════════════════
export const AdminServices = ({ onLogout }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [toast, setToast] = useState(null);

  const defaultService = { title: '', description: '', icon: 'Settings', image: '', isActive: true, features: [] };
  const [formData, setFormData] = useState(defaultService);
  const [featureInput, setFeatureInput] = useState('');

  const showToast = (message, type = 'success') => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`${API}/services`);
      if (data.success) setServices(data.data);
    } catch (err) {
      showToast('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openModal = (service = null) => {
    setEditingService(service);
    setFormData(service ? { ...service } : defaultService);
    setFeatureInput('');
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setEditingService(null); };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(f => ({ ...f, features: [...f.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };
  const handleRemoveFeature = (idx) => setFormData(f => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await apiFetch(`${API}/services/update/${editingService._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
        });
        showToast('Service updated!');
      } else {
        await apiFetch(`${API}/services/create`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
        });
        showToast('Service added!');
      }
      fetchServices();
      closeModal();
    } catch (err) {
      showToast('Failed to save service', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await apiFetch(`${API}/services/delete/${id}`, { method: 'DELETE' });
      showToast('Service deleted.');
      fetchServices();
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleToggle = async (service) => {
    await apiFetch(`${API}/services/update/${service._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !service.isActive }),
    });
    fetchServices();
  };

  return (
    <AdminLayout onLogout={onLogout} activeSection="Services">
      {toast && <Toast {...toast} />}
      <PageTitle
        title="Manage Services"
        subtitle={`${services.length} services in database`}
        action={<AddBtn label="Add Service" onClick={() => openModal()} />}
      />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <TableHead cols={['Service Title', 'Icon', 'Features', 'Status', 'Actions']} />
          <tbody>
            {loading && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>}
            {!loading && services.length === 0 && <EmptyRow cols={5} msg="No services yet." />}
            {services.map(service => (
              <tr key={service._id} className="hover:bg-slate-50 transition-colors">
                <td className="text-slate-800 font-medium px-6 py-4 border-b border-slate-50">{service.title}</td>
                <td className="px-6 py-4 border-b border-slate-50"><Badge label={service.icon} color="slate" /></td>
                <td className="text-slate-500 px-6 py-4 border-b border-slate-50 text-sm">{service.features?.length || 0} features</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <StatusToggle isActive={service.isActive} onClick={() => handleToggle(service)} />
                </td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <ActionBtn icon={Edit2} color="sky" onClick={() => openModal(service)} title="Edit" />
                  <ActionBtn icon={Trash2} color="red" onClick={() => handleDelete(service._id)} title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <ModalHeader title={editingService ? 'Edit Service' : 'Add New Service'} onClose={closeModal} />
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField label="Service Title">
                  <input className={inputCls} type="text" required value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Industry Technical Training" />
                </FormField>
              </div>
              <FormField label="Lucide Icon Name">
                <input className={inputCls} type="text" required value={formData.icon} onChange={e => setFormData(f => ({ ...f, icon: e.target.value }))} placeholder="e.g. Code, Database" />
              </FormField>
            </div>
            <FormField label="Description">
              <textarea className={inputCls} rows="3" required value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} placeholder="Detailed description of the service..." />
            </FormField>
            <FormField label="Key Features">
              <div className="flex gap-2 mb-3">
                <input
                  className={inputCls}
                  type="text"
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  placeholder="Type a feature and press Add or Enter"
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                />
                <button type="button" onClick={handleAddFeature} className="bg-slate-800 text-white px-5 rounded-lg font-semibold text-sm hover:bg-slate-700 transition-colors border-none cursor-pointer">Add</button>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[80px] flex flex-col gap-2">
                {formData.features.length === 0
                  ? <p className="text-slate-400 text-sm text-center py-4 italic">No features added yet</p>
                  : formData.features.map((f, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white border border-slate-100 px-3 py-2 rounded-lg text-sm text-slate-700 shadow-sm">
                      <span className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> {f}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none p-1"><Trash2 size={14} /></button>
                    </div>
                  ))
                }
              </div>
            </FormField>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData(f => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4 rounded text-sky-500 accent-sky-500" />
              <span className="font-semibold text-slate-600 text-sm">Service is Active</span>
            </label>
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
              <button type="button" className="bg-transparent border border-slate-300 text-slate-600 py-2.5 px-6 rounded-lg font-semibold hover:bg-slate-100 transition-colors" onClick={closeModal}>Cancel</button>
              <button type="submit" className="bg-sky-500 text-white py-2.5 px-8 rounded-lg font-bold hover:bg-sky-600 border-none cursor-pointer transition-colors shadow-lg shadow-sky-500/30">
                {editingService ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </AdminLayout>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// PARTNERS
// ════════════════════════════════════════════════════════════════════════════════
export const AdminPartners = ({ onLogout }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [toast, setToast] = useState(null);

  const defaultPartner = { name: '', programCount: '', colorTheme: 'purple', description: '', website: '', isActive: true };
  const [formData, setFormData] = useState(defaultPartner);

  const showToast = (message, type = 'success') => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`${API}/partners`);
      if (data.success) setPartners(data.data);
    } catch (err) {
      showToast('Failed to load partners', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPartners(); }, []);

  const openModal = (partner = null) => {
    setEditingPartner(partner);
    setFormData(partner ? { ...partner } : defaultPartner);
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setEditingPartner(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await apiFetch(`${API}/partners/update/${editingPartner._id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
        });
        showToast('Partner updated!');
      } else {
        await apiFetch(`${API}/partners/create`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
        });
        showToast('Partner added!');
      }
      fetchPartners();
      closeModal();
    } catch (err) {
      showToast('Failed to save partner', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this partner?')) return;
    try {
      await apiFetch(`${API}/partners/delete/${id}`, { method: 'DELETE' });
      showToast('Partner deleted.');
      fetchPartners();
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  const themeColors = { purple: 'purple', blue: 'sky', orange: 'orange', green: 'green', pink: 'red', teal: 'sky' };

  return (
    <AdminLayout onLogout={onLogout} activeSection="Partners">
      {toast && <Toast {...toast} />}
      <PageTitle
        title="Manage Partners"
        subtitle={`${partners.length} university partners`}
        action={<AddBtn label="Add Partner" onClick={() => openModal()} />}
      />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <TableHead cols={['Partner Name', 'Theme Color', 'Programs', 'Status', 'Actions']} />
          <tbody>
            {loading && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>}
            {!loading && partners.length === 0 && <EmptyRow cols={5} msg="No partners yet." />}
            {partners.map(partner => (
              <tr key={partner._id} className="hover:bg-slate-50 transition-colors">
                <td className="text-slate-800 font-medium px-6 py-4 border-b border-slate-50">{partner.name}</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <Badge label={partner.colorTheme} color={themeColors[partner.colorTheme] || 'slate'} />
                </td>
                <td className="text-slate-600 px-6 py-4 border-b border-slate-50 text-sm">{partner.programCount} Programs</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <Badge label={partner.isActive ? 'Active' : 'Inactive'} color={partner.isActive ? 'green' : 'slate'} />
                </td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <ActionBtn icon={Edit2} color="sky" onClick={() => openModal(partner)} title="Edit" />
                  <ActionBtn icon={Trash2} color="red" onClick={() => handleDelete(partner._id)} title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <ModalHeader title={editingPartner ? 'Edit Partner' : 'Add New Partner'} onClose={closeModal} />
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
            <FormField label="University / Partner Name">
              <input className={inputCls} type="text" required value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Gandhinagar University" />
            </FormField>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Theme Color">
                <select className={inputCls} value={formData.colorTheme} onChange={e => setFormData(f => ({ ...f, colorTheme: e.target.value }))}>
                  <option value="purple">Purple</option>
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                  <option value="teal">Teal</option>
                </select>
              </FormField>
              <FormField label="Number of Programs">
                <input className={inputCls} type="number" value={formData.programCount} onChange={e => setFormData(f => ({ ...f, programCount: e.target.value }))} placeholder="e.g. 12" />
              </FormField>
            </div>
            <FormField label="Description (Optional)">
              <textarea className={inputCls} rows="2" value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} placeholder="Short description about this university partner..." />
            </FormField>
            <FormField label="Website URL (Optional)">
              <input className={inputCls} type="url" value={formData.website} onChange={e => setFormData(f => ({ ...f, website: e.target.value }))} placeholder="https://university.edu" />
            </FormField>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData(f => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4 rounded accent-sky-500" />
              <span className="font-semibold text-slate-600 text-sm">Partner is Active</span>
            </label>
            <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
              <button type="button" className="bg-transparent border border-slate-300 text-slate-600 py-2.5 px-6 rounded-lg font-semibold hover:bg-slate-100 transition-colors" onClick={closeModal}>Cancel</button>
              <button type="submit" className="bg-sky-500 text-white py-2.5 px-8 rounded-lg font-bold hover:bg-sky-600 border-none cursor-pointer transition-colors shadow-lg shadow-sky-500/30">
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </AdminLayout>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// INQUIRIES
// ════════════════════════════════════════════════════════════════════════════════
export const AdminInquiries = ({ onLogout }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [viewing, setViewing] = useState(null);

  const showToast = (message, type = 'success') => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`${API}/inquiry/all`);
      if (data.success) setInquiries(data.data);
    } catch (err) {
      showToast('Failed to load inquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await apiFetch(`${API}/inquiry/${id}`, { method: 'DELETE' });
      showToast('Inquiry deleted.');
      setViewing(null);
      fetchInquiries();
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <AdminLayout onLogout={onLogout} activeSection="Inquiries">
      {toast && <Toast {...toast} />}
      <PageTitle title="Inquiries" subtitle={`${inquiries.length} total inquiries received`} />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <TableHead cols={['Name', 'Phone', 'Email', 'Program', 'Date', 'Actions']} />
          <tbody>
            {loading && <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>}
            {!loading && inquiries.length === 0 && <EmptyRow cols={6} msg="No inquiries received yet." />}
            {inquiries.map(inq => (
              <tr key={inq._id} className="hover:bg-slate-50 transition-colors">
                <td className="text-slate-800 font-medium px-6 py-4 border-b border-slate-50">{inq.name}</td>
                <td className="text-slate-600 px-6 py-4 border-b border-slate-50 text-sm">{inq.phone}</td>
                <td className="text-slate-500 px-6 py-4 border-b border-slate-50 text-sm">{inq.email || '—'}</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  {inq.program ? <Badge label={inq.program} color="sky" /> : <span className="text-slate-400 text-sm">—</span>}
                </td>
                <td className="text-slate-500 px-6 py-4 border-b border-slate-50 text-xs">{formatDate(inq.createdAt)}</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <ActionBtn icon={Eye} color="sky" onClick={() => setViewing(inq)} title="View" />
                  <ActionBtn icon={Trash2} color="red" onClick={() => handleDelete(inq._id)} title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewing && (
        <ModalWrapper onClose={() => setViewing(null)}>
          <ModalHeader title="Inquiry Detail" onClose={() => setViewing(null)} />
          <div className="p-8 flex flex-col gap-4">
            {[
              ['Name', viewing.name],
              ['Phone', viewing.phone],
              ['Email', viewing.email || '—'],
              ['Program of Interest', viewing.program || '—'],
              ['Date Submitted', formatDate(viewing.createdAt)],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-4 py-3 border-b border-slate-50">
                <span className="text-slate-500 text-sm font-semibold w-44 shrink-0">{label}</span>
                <span className="text-slate-800 text-sm">{val}</span>
              </div>
            ))}
            {viewing.message && (
              <div className="flex gap-4 py-3">
                <span className="text-slate-500 text-sm font-semibold w-44 shrink-0">Message</span>
                <p className="text-slate-800 text-sm leading-relaxed">{viewing.message}</p>
              </div>
            )}
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
              <button className="bg-transparent border border-slate-300 text-slate-600 py-2 px-5 rounded-lg font-semibold hover:bg-slate-100 transition-colors" onClick={() => setViewing(null)}>Close</button>
              <button className="bg-red-500 text-white py-2 px-5 rounded-lg font-bold hover:bg-red-600 border-none cursor-pointer" onClick={() => handleDelete(viewing._id)}>Delete Inquiry</button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </AdminLayout>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// CONTACTS
// ════════════════════════════════════════════════════════════════════════════════
export const AdminContacts = ({ onLogout }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [viewing, setViewing] = useState(null);

  const showToast = (message, type = 'success') => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`${API}/contact/all`);
      if (data.success) setContacts(data.data);
    } catch (err) {
      showToast('Failed to load contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      await apiFetch(`${API}/contact/${id}`, { method: 'DELETE' });
      showToast('Contact message deleted.');
      setViewing(null);
      fetchContacts();
    } catch (err) {
      showToast('Failed to delete', 'error');
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <AdminLayout onLogout={onLogout} activeSection="Contacts">
      {toast && <Toast {...toast} />}
      <PageTitle title="Contact Messages" subtitle={`${contacts.length} messages received`} />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <TableHead cols={['Name', 'Email', 'Phone', 'Message Preview', 'Date', 'Actions']} />
          <tbody>
            {loading && <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>}
            {!loading && contacts.length === 0 && <EmptyRow cols={6} msg="No contact messages yet." />}
            {contacts.map(contact => (
              <tr key={contact._id} className="hover:bg-slate-50 transition-colors">
                <td className="text-slate-800 font-medium px-6 py-4 border-b border-slate-50">{contact.name}</td>
                <td className="text-slate-600 px-6 py-4 border-b border-slate-50 text-sm">{contact.email}</td>
                <td className="text-slate-500 px-6 py-4 border-b border-slate-50 text-sm">{contact.phone}</td>
                <td className="text-slate-500 px-6 py-4 border-b border-slate-50 text-sm max-w-[200px] truncate">{contact.message}</td>
                <td className="text-slate-500 px-6 py-4 border-b border-slate-50 text-xs">{formatDate(contact.createdAt)}</td>
                <td className="px-6 py-4 border-b border-slate-50">
                  <ActionBtn icon={Eye} color="sky" onClick={() => setViewing(contact)} title="View" />
                  <ActionBtn icon={Trash2} color="red" onClick={() => handleDelete(contact._id)} title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewing && (
        <ModalWrapper onClose={() => setViewing(null)}>
          <ModalHeader title="Contact Message Detail" onClose={() => setViewing(null)} />
          <div className="p-8 flex flex-col gap-4">
            {[
              ['Name', viewing.name],
              ['Email', viewing.email],
              ['Phone', viewing.phone],
              ['Date Received', formatDate(viewing.createdAt)],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-4 py-3 border-b border-slate-50">
                <span className="text-slate-500 text-sm font-semibold w-44 shrink-0">{label}</span>
                <span className="text-slate-800 text-sm">{val}</span>
              </div>
            ))}
            <div className="flex gap-4 py-3">
              <span className="text-slate-500 text-sm font-semibold w-44 shrink-0">Message</span>
              <p className="text-slate-800 text-sm leading-relaxed">{viewing.message}</p>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
              <button className="bg-transparent border border-slate-300 text-slate-600 py-2 px-5 rounded-lg font-semibold hover:bg-slate-100 transition-colors" onClick={() => setViewing(null)}>Close</button>
              <button className="bg-red-500 text-white py-2 px-5 rounded-lg font-bold hover:bg-red-600 border-none cursor-pointer" onClick={() => handleDelete(viewing._id)}>Delete Message</button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </AdminLayout>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// FOOTER SETUP
// ════════════════════════════════════════════════════════════════════════════════
export const AdminFooter = ({ onLogout }) => {
  const [footerData, setFooterData] = useState({
    description: '',
    address: '',
    phone1: '',
    phone2: '',
    email: '',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
  });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage as a simple persistence (can be replaced with API)
    localStorage.setItem('footerData', JSON.stringify(footerData));
    showToast('Footer details saved successfully!');
  };

  useEffect(() => {
    const saved = localStorage.getItem('footerData');
    if (saved) setFooterData(JSON.parse(saved));
  }, []);

  const Field = ({ label, field, type = 'text', placeholder }) => (
    <FormField label={label}>
      <input
        className={inputCls}
        type={type}
        value={footerData[field]}
        onChange={e => setFooterData(f => ({ ...f, [field]: e.target.value }))}
        placeholder={placeholder}
      />
    </FormField>
  );

  return (
    <AdminLayout onLogout={onLogout} activeSection="Footer Setup">
      {toast && <Toast {...toast} />}
      <PageTitle title="Footer Setup" subtitle="Manage footer contact info & social links" />
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h4 className="text-sky-600 font-bold text-sm uppercase tracking-widest">Contact Information</h4>
          <FormField label="Footer Description">
            <textarea
              className={inputCls} rows="3"
              value={footerData.description}
              onChange={e => setFooterData(f => ({ ...f, description: e.target.value }))}
              placeholder="A brief description shown in the footer..."
              required
            />
          </FormField>
          <Field label="Office Address" field="address" placeholder="123 College Road, City, State" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone Number 1" field="phone1" placeholder="+91 98765 43210" />
            <Field label="Phone Number 2 (Optional)" field="phone2" placeholder="+91 91234 56789" />
          </div>
          <Field label="Email Address" field="email" type="email" placeholder="info@college.edu" />

          <h4 className="text-sky-600 font-bold text-sm uppercase tracking-widest mt-2">Social Media Links</h4>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Facebook URL" field="facebookUrl" type="url" placeholder="https://facebook.com/..." />
            <Field label="Instagram URL" field="instagramUrl" type="url" placeholder="https://instagram.com/..." />
            <Field label="LinkedIn URL" field="linkedinUrl" type="url" placeholder="https://linkedin.com/..." />
            <Field label="YouTube URL" field="youtubeUrl" type="url" placeholder="https://youtube.com/..." />
          </div>
          <div className="flex justify-start mt-2">
            <button type="submit" className="bg-sky-500 text-white py-3 px-8 rounded-lg font-bold hover:bg-sky-600 border-none cursor-pointer transition-all shadow-lg shadow-sky-500/30">
              Save All Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
