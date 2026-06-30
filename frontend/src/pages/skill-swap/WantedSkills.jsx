import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { fetchWantedSkills, fetchCategories } from '../../store/slices/skillsSlice';
import { wantedSkillApi } from '../../services/skillSwapApi';
import toast from 'react-hot-toast';

const WantedSkills = () => {
  const dispatch = useDispatch();
  const { wantedSkills, categories } = useSelector((s) => s.skills);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ skillName: '', categoryId: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchWantedSkills());
    dispatch(fetchCategories());
  }, [dispatch]);

  const resetForm = () => { setForm({ skillName: '', categoryId: '' }); setEditing(null); setShowForm(false); };

  const handleSubmit = async () => {
    if (!form.skillName || !form.categoryId) return toast.error('Skill name and category are required');
    setSubmitting(true);
    try {
      if (editing) {
        await wantedSkillApi.update(editing, form);
        toast.success('Wanted skill updated');
      } else {
        await wantedSkillApi.create(form);
        toast.success('Added to wanted list');
      }
      dispatch(fetchWantedSkills());
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await wantedSkillApi.delete(id);
      dispatch(fetchWantedSkills());
      toast.success('Removed from wanted list');
    } catch { toast.error('Failed to remove'); }
  };

  const startEdit = (sk) => { setEditing(sk._id); setForm({ skillName: sk.skillName, categoryId: sk.categoryId?._id || sk.categoryId }); setShowForm(true); };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3"><Heart size={28} className="text-purple-400" /> Wanted Skills</h1>
            <p className="text-slate-400 mt-1">Skills you want to learn from others.</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true); }}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold transition-colors">
            <Plus size={18} /> Add Wanted Skill
          </button>
        </div>

        {/* Inline Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 mb-6 overflow-hidden">
              <h3 className="text-white font-bold mb-4">{editing ? 'Edit Wanted Skill' : 'Add Wanted Skill'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium block mb-1">Skill Name *</label>
                  <input value={form.skillName} onChange={(e) => setForm({ ...form, skillName: e.target.value })}
                    placeholder="e.g. Python Programming"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500 transition-colors" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium block mb-1">Category *</label>
                  <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-500">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSubmit} disabled={submitting}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50">
                  <Check size={16} /> {submitting ? 'Saving...' : editing ? 'Update' : 'Add'}
                </button>
                <button onClick={resetForm} className="flex items-center gap-2 bg-slate-800 text-slate-300 px-5 py-2 rounded-xl font-semibold text-sm hover:bg-slate-700 transition-colors">
                  <X size={16} /> Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wanted Skills List */}
        {wantedSkills.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Heart size={48} className="mx-auto mb-4 opacity-20" />
            <p>No wanted skills yet. Add skills you want to learn!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {wantedSkills.map((sk, i) => (
              <motion.div key={sk._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between bg-slate-900/80 border border-slate-700/60 rounded-xl px-5 py-4 hover:border-purple-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <Heart size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{sk.skillName}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{sk.categoryId?.name || 'Uncategorized'}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(sk)} className="p-2 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-colors"><Edit2 size={15} /></button>
                  <button onClick={() => handleDelete(sk._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"><Trash2 size={15} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WantedSkills;
