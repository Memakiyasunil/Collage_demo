import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Layers, BookOpen, Bell, CheckCircle2, X, Users, Star, TrendingUp } from 'lucide-react';
import api from '../../../services/skillSwapApi';

const AdminStatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div whileHover={{ y: -2 }} className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shrink-0`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-white text-3xl font-extrabold">{value ?? '—'}</p>
    </div>
  </motion.div>
);

const AdminSkillDashboard = () => {
  const [stats, setStats] = useState({ categories: 0, skills: 0, requests: 0, completed: 0, cancelled: 0 });
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, skills, reqs] = await Promise.all([
          api.get('/skill-categories'),
          api.get('/skills', { params: { limit: 100 } }),
          api.get('/skill-requests', { params: { limit: 200 } }),
        ]);
        const requests = reqs.data.data || [];
        const completed = requests.filter((r) => r.status === 'Completed').length;
        const cancelled = requests.filter((r) => r.status === 'Cancelled').length;

        // Count skill name frequency from requests
        const skillCount = {};
        requests.forEach((r) => {
          const name = r.requestedSkillId?.skillName;
          if (name) skillCount[name] = (skillCount[name] || 0) + 1;
        });
        const sorted = Object.entries(skillCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

        setStats({
          categories: cats.data.count,
          skills: skills.data.total,
          requests: requests.length,
          completed,
          cancelled,
        });
        setTopSkills(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><BarChart2 size={28} className="text-sky-400" /> Admin Dashboard</h1>
        <p className="text-slate-400 mb-8">Skill Swap module overview and analytics.</p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <AdminStatCard icon={Layers} label="Categories" value={stats.categories} color="bg-indigo-600" />
          <AdminStatCard icon={BookOpen} label="Total Skills" value={stats.skills} color="bg-sky-600" />
          <AdminStatCard icon={Bell} label="Total Requests" value={stats.requests} color="bg-amber-600" />
          <AdminStatCard icon={CheckCircle2} label="Completed" value={stats.completed} color="bg-emerald-600" />
          <AdminStatCard icon={X} label="Cancelled" value={stats.cancelled} color="bg-red-600" />
        </div>

        {/* Most Requested Skills */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-6"><TrendingUp size={18} className="text-amber-400" /> Most Requested Skills</h2>
          {loading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-slate-800/50 animate-pulse rounded-xl" />)}</div>
          ) : topSkills.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No request data yet.</p>
          ) : (
            <div className="space-y-3">
              {topSkills.map(([name, count], i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm w-4 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">{name}</span>
                      <span className="text-slate-400 text-xs">{count} requests</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(count / topSkills[0][1]) * 100}%` }}
                        transition={{ delay: i * 0.1 }} className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSkillDashboard;
