import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Archive, Trash2, Filter } from 'lucide-react';
import { skillApi, skillCategoryApi } from '../../../services/skillSwapApi';
import toast from 'react-hot-toast';

const EXPERIENCE_LEVELS = ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterExp, setFilterExp] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 20;

  const load = async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT };
      if (search) params.search = search;
      if (filterExp) params.experience = filterExp;
      if (filterCat) params.category = filterCat;
      const { data } = await skillApi.getAll(params);
      setSkills(data.data);
      setTotal(data.total);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page, search, filterExp, filterCat]);
  useEffect(() => { skillCategoryApi.getAll().then(({ data }) => setCategories(data.data)); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try { await skillApi.delete(id); toast.success('Skill deleted'); load(); }
    catch { toast.error('Failed to delete'); }
  };

  const handleArchive = async (id) => {
    try { await skillApi.toggleArchive(id); toast.success('Updated'); load(); }
    catch { toast.error('Failed'); }
  };

  const EXPERIENCE_COLORS = { Beginner: 'text-emerald-400', Intermediate: 'text-sky-400', Advanced: 'text-purple-400', Expert: 'text-amber-400' };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><BookOpen size={28} className="text-sky-400" /> All Skills</h1>
        <p className="text-slate-400 mb-6">Manage skills across all users.</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search skills..."
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-sky-500" />
          </div>
          <select value={filterCat} onChange={(e) => { setFilterCat(e.target.value); setPage(1); }}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-500">
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select value={filterExp} onChange={(e) => { setFilterExp(e.target.value); setPage(1); }}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-500">
            <option value="">All Levels</option>
            {EXPERIENCE_LEVELS.filter(Boolean).map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 text-xs text-slate-400 uppercase">
            <span>Skill ({total} total)</span>
            <span>Actions</span>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{[...Array(8)].map((_, i) => <div key={i} className="h-12 bg-slate-800/50 animate-pulse rounded-xl" />)}</div>
          ) : skills.length === 0 ? (
            <p className="text-center py-12 text-slate-500">No skills found.</p>
          ) : (
            skills.map((skill) => (
              <div key={skill._id} className="flex items-center gap-4 px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium truncate">{skill.skillName}</p>
                    {skill.isArchived && <span className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded">Archived</span>}
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">{skill.userId?.name} · {skill.categoryId?.name}</p>
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${EXPERIENCE_COLORS[skill.experienceLevel]}`}>{skill.experienceLevel}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => handleArchive(skill._id)} title="Toggle Archive"
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"><Archive size={14} /></button>
                  <button onClick={() => handleDelete(skill._id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {total > LIMIT && (
          <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
            <span>Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 bg-slate-800 rounded-lg disabled:opacity-40 hover:text-white transition-colors">← Prev</button>
              <button disabled={page * LIMIT >= total} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 bg-slate-800 rounded-lg disabled:opacity-40 hover:text-white transition-colors">Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSkills;
