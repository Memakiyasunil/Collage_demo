import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Edit2, Trash2, Check, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { skillCategoryApi } from '../../../services/skillSwapApi';
import toast from 'react-hot-toast';

const EMPTY_FORM = { name: '', description: '', icon: '', displayOrder: 0, isActive: true };

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await skillCategoryApi.getAll();
      setCategories(data.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm(EMPTY_FORM); setEditing(null); setShowForm(false); };
  const startEdit = (cat) => { setEditing(cat._id); setForm({ name: cat.name, description: cat.description, icon: cat.icon, displayOrder: cat.displayOrder, isActive: cat.isActive }); setShowForm(true); };

  const handleSubmit = async () => {
    if (!form.name) return toast.error('Name is required');
    setSaving(true);
    try {
      if (editing) { await skillCategoryApi.update(editing, form); toast.success('Category updated'); }
      else { await skillCategoryApi.create(form); toast.success('Category created'); }
      await load();
      resetForm();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try { await skillCategoryApi.delete(id); toast.success('Deleted'); await load(); }
    catch { toast.error('Failed to delete'); }
  };

  const handleToggleActive = async (cat) => {
    try { await skillCategoryApi.update(cat._id, { isActive: !cat.isActive }); await load(); }
    catch { toast.error('Failed to update'); }
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3"><Layers size={28} className="text-indigo-400" /> Skill Categories</h1>
            <p className="text-slate-400 mt-1">Manage categories for all skills.</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">
            <Plus size={18} /> Add Category
          </button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 mb-6 overflow-hidden">
              <h3 className="text-white font-bold mb-4">{editing ? 'Edit Category' : 'New Category'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium block mb-1">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Web Development"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium block mb-1">Icon (emoji or name)</label>
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="💻 or 'code'"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-300 text-sm font-medium block mb-1">Description</label>
                  <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium block mb-1">Display Order</label>
                  <input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500" />
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <span className="text-slate-300 text-sm font-medium">Active</span>
                  <button type="button" onClick={() => setForm({ ...form, isActive: !form.isActive })}>
                    {form.isActive ? <ToggleRight size={28} className="text-emerald-400" /> : <ToggleLeft size={28} className="text-slate-500" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSubmit} disabled={saving}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50">
                  <Check size={16} /> {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
                <button onClick={resetForm} className="flex items-center gap-2 bg-slate-800 text-slate-300 px-5 py-2 rounded-xl font-semibold text-sm hover:bg-slate-700">
                  <X size={16} /> Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-800 text-slate-400 text-xs uppercase">
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4 hidden md:table-cell">Description</th>
              <th className="text-center px-4 py-4">Order</th>
              <th className="text-center px-4 py-4">Status</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    <td colSpan={5} className="px-6 py-4"><div className="h-5 bg-slate-800/50 animate-pulse rounded" /></td>
                  </tr>
                ))
              ) : categories.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-slate-500">No categories yet.</td></tr>
              ) : categories.map((cat) => (
                <tr key={cat._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {cat.icon && <span>{cat.icon}</span>}
                      <span className="text-white font-medium">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 hidden md:table-cell truncate max-w-xs">{cat.description || '—'}</td>
                  <td className="px-4 py-4 text-center text-slate-400">{cat.displayOrder}</td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => handleToggleActive(cat)}>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cat.isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-700 text-slate-500 border-slate-600'}`}>
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => startEdit(cat)} className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(cat._id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
