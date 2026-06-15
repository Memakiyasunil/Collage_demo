import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Mail, LogOut, Settings, Plus, Edit2, Trash2, X, Briefcase, Check, XCircle } from 'lucide-react';
import { CourseContext } from '../../context/CourseContext';
import { SiteContext } from '../../context/SiteContext';

const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <div className="w-[260px] bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-[1.25rem] font-bold">
            <span className="text-white">Eduforge</span><span className="text-yellow-400">tech</span> <span className="text-sky-400">Admin</span>
          </h2>
        </div>
        <nav className="flex flex-col py-4 grow">
          <NavLink to="/admin" end className={({ isActive }) => `px-6 py-3.5 flex items-center gap-3 text-slate-400 transition-all duration-200 ${isActive ? 'bg-white/5 text-white border-l-4 border-sky-400' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/courses" className={({ isActive }) => `px-6 py-3.5 flex items-center gap-3 text-slate-400 transition-all duration-200 ${isActive ? 'bg-white/5 text-white border-l-4 border-sky-400' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>
            <BookOpen size={20} /> Courses
          </NavLink>
          <NavLink to="/admin/services" className={({ isActive }) => `px-6 py-3.5 flex items-center gap-3 text-slate-400 transition-all duration-200 ${isActive ? 'bg-white/5 text-white border-l-4 border-sky-400' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>
            <Briefcase size={20} /> Services
          </NavLink>
          <NavLink to="/admin/inquiries" className={({ isActive }) => `px-6 py-3.5 flex items-center gap-3 text-slate-400 transition-all duration-200 ${isActive ? 'bg-white/5 text-white border-l-4 border-sky-400' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>
            <Users size={20} /> Inquiries
          </NavLink>
          <NavLink to="/admin/partners" className={({ isActive }) => `px-6 py-3.5 flex items-center gap-3 text-slate-400 transition-all duration-200 ${isActive ? 'bg-white/5 text-white border-l-4 border-sky-400' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>
            <LayoutDashboard size={20} /> Partners
          </NavLink>
          <NavLink to="/admin/footer" className={({ isActive }) => `px-6 py-3.5 flex items-center gap-3 text-slate-400 transition-all duration-200 ${isActive ? 'bg-white/5 text-white border-l-4 border-sky-400' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>
            <Settings size={20} /> Footer Setup
          </NavLink>
        </nav>
        <div className="p-6 border-t border-white/10">
          <button className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-red-500 font-medium" onClick={onLogout}><LogOut size={20} /> Logout</button>
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="bg-white px-8 py-6 border-b border-slate-200">
          <h3 className="text-slate-800 font-semibold text-lg">Welcome, Admin</h3>
        </div>
        <div className="p-8 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard = ({ onLogout }) => {
  return (
    <AdminLayout onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h4 className="text-slate-500 text-sm uppercase mb-2">Total Courses</h4>
          <p className="text-3xl font-bold text-slate-900">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h4 className="text-slate-500 text-sm uppercase mb-2">Total Inquiries</h4>
          <p className="text-3xl font-bold text-slate-900">156</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h4 className="text-slate-500 text-sm uppercase mb-2">Contact Messages</h4>
          <p className="text-3xl font-bold text-slate-900">48</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export const AdminCourses = ({ onLogout }) => {
  const { courses, addCourse, updateCourse, deleteCourse } = useContext(CourseContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Default empty course
  const defaultCourse = {
    title: '', type: 'UG', description: '', duration: '', eligibility: '',
    totalSeats: '', format: '', status: '', overview: '',
    careerStats: { jobsInIndia: '', avgSalary: '', companiesHiring: '' },
    universities: [], eligibilityChecklist: [], salaryInsights: []
  };

  const [formData, setFormData] = useState(defaultCourse);

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData(course);
    } else {
      setEditingCourse(null);
      setFormData(defaultCourse);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(formData);
    } else {
      addCourse({ ...formData, iconIndex: 0 }); // Default icon index
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-0">Manage Courses</h2>
        <button className="bg-blue-600 text-white border-none py-2 px-4 rounded-lg text-[0.95rem] font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-700 inline-flex items-center gap-2" onClick={() => openModal()}><Plus size={16} /> Add New Course</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Title</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Type</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Duration</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Status</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 && (
              <tr><td colSpan="5" className="text-slate-800 px-6 py-4 border-b border-slate-200 text-center">No courses found.</td></tr>
            )}
            {courses.map(course => (
              <tr key={course.id}>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">{course.title}</td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200"><span className="bg-slate-100 text-slate-600 py-1 px-2.5 rounded-full text-xs font-bold">{course.type}</span></td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">{course.duration}</td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200"><span className={course.status.includes('Accepting') ? 'text-emerald-500 font-semibold' : 'text-orange-500 font-semibold'}>{course.status}</span></td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">
                  <button className="bg-transparent border-none cursor-pointer p-2 rounded-md inline-flex items-center justify-center transition-colors hover:bg-slate-100 text-sky-500" onClick={() => openModal(course)}><Edit2 size={18} /></button>
                  <button className="bg-transparent border-none cursor-pointer p-2 rounded-md inline-flex items-center justify-center transition-colors hover:bg-slate-100 text-red-500 ml-2" onClick={() => handleDelete(course.id)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[800px] rounded-xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
              <h3 className="text-xl text-slate-900 font-bold">{editingCourse ? 'Edit Course Details' : 'Add New Course'}</h3>
              <button className="bg-transparent border-none cursor-pointer text-slate-400 transition-colors hover:text-red-500" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h4 className="text-sky-500 font-bold -mb-2">Basic Info</h4>
              <div className="flex gap-6">
                <div className="flex-2 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Course Title</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Program Type</label>
                  <select className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 bg-white" required value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                    <option value="UG">Undergraduate (UG)</option>
                    <option value="PG">Postgraduate (PG)</option>
                    <option value="INT">Integrated (INT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-2 text-sm">Short Description (Card View)</label>
                <textarea className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" rows="2" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
              </div>

              <h4 className="text-sky-500 font-bold mt-4 -mb-2">Course Details Page Data</h4>

              <div className="flex gap-6">
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Duration</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Basic Eligibility</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.eligibility} onChange={e => setFormData({ ...formData, eligibility: e.target.value })} />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Total Seats</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.totalSeats} onChange={e => setFormData({ ...formData, totalSeats: e.target.value })} />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Format</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.format} onChange={e => setFormData({ ...formData, format: e.target.value })} />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Status</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-2 text-sm">Program Overview</label>
                <textarea className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" rows="6" required value={formData.overview} onChange={e => setFormData({ ...formData, overview: e.target.value })}></textarea>
              </div>

              <h4 className="text-sky-500 font-bold mt-4 -mb-2">Career Statistics</h4>
              <div className="flex gap-6">
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Jobs In India</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.careerStats?.jobsInIndia || ''} onChange={e => setFormData({ ...formData, careerStats: { ...formData.careerStats, jobsInIndia: e.target.value } })} />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Average Salary</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.careerStats?.avgSalary || ''} onChange={e => setFormData({ ...formData, careerStats: { ...formData.careerStats, avgSalary: e.target.value } })} />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Companies Hiring</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.careerStats?.companiesHiring || ''} onChange={e => setFormData({ ...formData, careerStats: { ...formData.careerStats, companiesHiring: e.target.value } })} />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-200">
                <button type="button" className="bg-transparent border border-blue-500 text-blue-500 py-2 px-6 rounded-md font-semibold transition-colors hover:bg-blue-500 hover:text-white" onClick={closeModal}>Cancel</button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md font-semibold transition-colors hover:bg-blue-700 border-none cursor-pointer">Save Complete Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export const AdminFooter = ({ onLogout }) => {
  const { footerData, setFooterData } = useContext(SiteContext);

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API save
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Manage Footer Details</h2>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-3xl">
        {isSaved && <div className="bg-emerald-100 text-emerald-800 p-4 rounded-md mb-6 border border-emerald-200 font-medium">Footer details updated successfully!</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block font-semibold text-slate-600 mb-2 text-sm">Footer Description</label>
            <textarea
              className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              rows="4"
              value={footerData.description}
              onChange={e => setFooterData({ ...footerData, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-2 text-sm">Office Address</label>
            <input
              className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              type="text"
              value={footerData.address}
              onChange={e => setFooterData({ ...footerData, address: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold text-slate-600 mb-2 text-sm">Phone Number 1</label>
              <input
                className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                type="text"
                value={footerData.phone1}
                onChange={e => setFooterData({ ...footerData, phone1: e.target.value })}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold text-slate-600 mb-2 text-sm">Phone Number 2 (Optional)</label>
              <input
                className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                type="text"
                value={footerData.phone2}
                onChange={e => setFooterData({ ...footerData, phone2: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-2 text-sm">Email Address</label>
            <input
              className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              type="email"
              value={footerData.email}
              onChange={e => setFooterData({ ...footerData, email: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-md font-bold transition-colors hover:bg-blue-700 border-none cursor-pointer mt-4 inline-block w-max">Save Changes</button>
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-0">Manage Partners</h2>
        <button className="bg-blue-600 text-white border-none py-2 px-4 rounded-lg text-[0.95rem] font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-700 inline-flex items-center gap-2" onClick={() => openModal()}><Plus size={16} /> Add New Partner</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Partner Name</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Theme Color</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Programs Available</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.length === 0 && (
              <tr><td colSpan="4" className="text-slate-800 px-6 py-4 border-b border-slate-200 text-center">No partners found.</td></tr>
            )}
            {partners.map(partner => (
              <tr key={partner.id}>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">{partner.name}</td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200"><span style={{ textTransform: 'capitalize' }}>{partner.colorTheme}</span></td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">{partner.programCount} Programs</td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">
                  <button className="bg-transparent border-none cursor-pointer p-2 rounded-md inline-flex items-center justify-center transition-colors hover:bg-slate-100 text-sky-500" onClick={() => openModal(partner)}><Edit2 size={18} /></button>
                  <button className="bg-transparent border-none cursor-pointer p-2 rounded-md inline-flex items-center justify-center transition-colors hover:bg-slate-100 text-red-500 ml-2" onClick={() => handleDelete(partner.id)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[500px] rounded-xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
              <h3 className="text-xl text-slate-900 font-bold">{editingPartner ? 'Edit Partner' : 'Add New Partner'}</h3>
              <button className="bg-transparent border-none cursor-pointer text-slate-400 transition-colors hover:text-red-500" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block font-semibold text-slate-600 mb-2 text-sm">University Name</label>
                <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Gandhinagar University" />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-2 text-sm">Theme Color</label>
                <select className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 bg-white" required value={formData.colorTheme} onChange={e => setFormData({ ...formData, colorTheme: e.target.value })}>
                  <option value="purple">Purple</option>
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-2 text-sm">Number of Programs</label>
                <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="number" required value={formData.programCount} onChange={e => setFormData({ ...formData, programCount: e.target.value })} placeholder="e.g. 12" />
              </div>
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-200">
                <button type="button" className="bg-transparent border border-blue-500 text-blue-500 py-2 px-6 rounded-md font-semibold transition-colors hover:bg-blue-500 hover:text-white" onClick={closeModal}>Cancel</button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md font-semibold transition-colors hover:bg-blue-700 border-none cursor-pointer">Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export const AdminServices = ({ onLogout }) => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const defaultService = {
    title: '', description: '', icon: 'Settings', image: '', isActive: true, features: []
  };
  const [formData, setFormData] = useState(defaultService);
  const [featureInput, setFeatureInput] = useState('');

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData(defaultService);
    }
    setFeatureInput('');
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleAddFeature = () => {
    if (featureInput.trim() !== '') {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await fetch(`/api/services/update/${editingService._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch('/api/services/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      fetchServices();
      closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await fetch(`/api/services/delete/${id}`, { method: 'DELETE' });
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleToggleActive = async (service) => {
    try {
      await fetch(`/api/services/update/${service._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive })
      });
      fetchServices();
    } catch (error) {
      console.error('Error toggling service status:', error);
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-0">Manage Services</h2>
        <button className="bg-blue-600 text-white border-none py-2 px-4 rounded-lg text-[0.95rem] font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-700 inline-flex items-center gap-2" onClick={() => openModal()}><Plus size={16} /> Add New Service</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Service Title</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Icon</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Features</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Status</th>
              <th className="bg-slate-50 text-slate-600 font-semibold text-sm px-6 py-4 border-b border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 && (
              <tr><td colSpan="5" className="text-slate-800 px-6 py-4 border-b border-slate-200 text-center">No services found.</td></tr>
            )}
            {services.map(service => (
              <tr key={service._id}>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">{service.title}</td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200"><span className="bg-slate-100 text-slate-600 py-1 px-2.5 rounded-md text-xs font-mono">{service.icon}</span></td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">{service.features?.length || 0} Features</td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">
                  <button onClick={() => handleToggleActive(service)} className={`px-3 py-1 rounded-full text-xs font-bold border-none cursor-pointer ${service.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {service.isActive ? 'Active' : 'Disabled'}
                  </button>
                </td>
                <td className="text-slate-800 px-6 py-4 border-b border-slate-200">
                  <button className="bg-transparent border-none cursor-pointer p-2 rounded-md inline-flex items-center justify-center transition-colors hover:bg-slate-100 text-sky-500" onClick={() => openModal(service)}><Edit2 size={18} /></button>
                  <button className="bg-transparent border-none cursor-pointer p-2 rounded-md inline-flex items-center justify-center transition-colors hover:bg-slate-100 text-red-500 ml-2" onClick={() => handleDelete(service._id)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[700px] rounded-xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
              <h3 className="text-xl text-slate-900 font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button className="bg-transparent border-none cursor-pointer text-slate-400 transition-colors hover:text-red-500" onClick={closeModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex gap-6">
                <div className="flex-[2] w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Service Title</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Industry-Oriented Technical Training" />
                </div>
                <div className="flex-[1] w-full">
                  <label className="block font-semibold text-slate-600 mb-2 text-sm">Lucide Icon Name</label>
                  <input className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" required value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} placeholder="e.g. Code, Database, Users" />
                </div>
              </div>
              
              <div>
                <label className="block font-semibold text-slate-600 mb-2 text-sm">Description</label>
                <textarea className="w-full p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" rows="3" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Detailed description of the service"></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-2 text-sm">Key Features</label>
                <div className="flex gap-2 mb-3">
                  <input className="flex-grow p-3 border border-slate-300 rounded-md text-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20" type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Add a feature (e.g. Full Stack Development)" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }} />
                  <button type="button" onClick={handleAddFeature} className="bg-slate-800 text-white px-4 rounded-md font-semibold text-sm hover:bg-slate-700 transition-colors">Add</button>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-md p-3 min-h-[80px] flex flex-col gap-2">
                  {formData.features.length === 0 ? <p className="text-slate-400 text-sm text-center my-2 italic">No features added yet</p> : null}
                  {formData.features.map((feature, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white border border-slate-200 px-3 py-2 rounded text-sm text-slate-700 shadow-sm">
                      <span className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> {feature}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none p-1"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500" />
                  <span className="font-semibold text-slate-600 text-sm">Service is Active</span>
                </label>
              </div>

              <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-slate-200">
                <button type="button" className="bg-transparent border border-slate-300 text-slate-600 py-2 px-6 rounded-md font-semibold transition-colors hover:bg-slate-100" onClick={closeModal}>Cancel</button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md font-semibold transition-colors hover:bg-blue-700 border-none cursor-pointer">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
