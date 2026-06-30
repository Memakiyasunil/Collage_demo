import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Archive, Edit2, Trash2, BookOpen, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { fetchMySkills, deleteSkill, toggleArchiveSkill } from '../../store/slices/skillsSlice';
import toast from 'react-hot-toast';

const EXPERIENCE_COLORS = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  Advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Expert: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

const MySkills = () => {
  const dispatch = useDispatch();
  const { mySkills, loading } = useSelector((s) => s.skills);
  const [filter, setFilter] = useState('active'); // 'active' | 'archived' | 'all'
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchMySkills());
  }, [dispatch]);

  const filtered = mySkills.filter((sk) => {
    if (filter === 'active') return !sk.isArchived;
    if (filter === 'archived') return sk.isArchived;
    return true;
  });

  const handleDelete = async (id) => {
    const result = await dispatch(deleteSkill(id));
    if (!result.error) toast.success('Skill deleted');
    else toast.error(result.payload);
    setDeleteConfirm(null);
  };

  const handleArchive = async (id) => {
    const result = await dispatch(toggleArchiveSkill(id));
    if (!result.error) toast.success('Skill updated');
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3"><BookOpen size={28} className="text-sky-400" /> My Skills</h1>
            <p className="text-slate-400 mt-1">Skills you offer to others for exchange.</p>
          </div>
          <Link to="/skill-swap/skills/new" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-sky-600/20">
            <Plus size={18} /> Add New Skill
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['active', 'archived', 'all'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${filter === f ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-slate-800/50 animate-pulse rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">No skills found. <Link to="/skill-swap/skills/new" className="text-sky-400 hover:underline">Add your first skill!</Link></p>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" layout>
            <AnimatePresence>
              {filtered.map((skill) => (
                <motion.div key={skill._id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className={`bg-slate-900/80 border rounded-2xl p-5 group relative transition-all ${skill.isArchived ? 'border-slate-700/40 opacity-60' : 'border-slate-700/60 hover:border-sky-500/40'}`}>
                  {skill.isArchived && <span className="absolute top-3 right-3 text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Archived</span>}

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <BookOpen size={18} className="text-sky-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base truncate">{skill.skillName}</h3>
                      <p className="text-slate-500 text-xs mt-0.5">{skill.categoryId?.name || 'Uncategorized'}</p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">{skill.description || 'No description provided.'}</p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${EXPERIENCE_COLORS[skill.experienceLevel] || 'bg-slate-700 text-slate-400'}`}>
                      {skill.experienceLevel}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleArchive(skill._id)} title="Toggle Archive"
                        className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Archive size={15} />
                      </button>
                      <Link to={`/skill-swap/skills/edit/${skill._id}`}
                        className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </Link>
                      <button onClick={() => setDeleteConfirm(skill._id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full text-center">
                <Trash2 size={40} className="text-red-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Delete Skill?</h3>
                <p className="text-slate-400 mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-semibold hover:bg-slate-700 transition-colors">Cancel</button>
                  <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MySkills;
