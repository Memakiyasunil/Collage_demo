import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Calendar, Star, Users, Activity } from 'lucide-react';
import api from '../../../services/skillSwapApi';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

const ReportCard = ({ title, icon: Icon, color, children }) => (
  <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6">
    <h3 className="text-white font-bold text-base flex items-center gap-2 mb-5">
      <Icon size={18} className={color} /> {title}
    </h3>
    {children}
  </div>
);

const AdminReports = () => {
  const [data, setData] = useState({ requests: [], reviews: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [reqRes, revRes] = await Promise.all([
          api.get('/skill-requests', { params: { limit: 500 } }),
          api.get('/reviews', { params: { limit: 500 } }),
        ]);
        setData({ requests: reqRes.data.data || [], reviews: revRes.data.data || [] });
      } finally { setLoading(false); }
    };
    load();
  }, []);

  // Compute monthly totals for last 6 months
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = subMonths(new Date(), 5 - i);
    const label = format(d, 'MMM');
    const start = startOfMonth(d);
    const end = endOfMonth(d);
    const count = data.requests.filter((r) => {
      const created = new Date(r.createdAt);
      return created >= start && created <= end;
    }).length;
    return { label, count };
  });

  const maxMonthly = Math.max(...monthlyData.map((m) => m.count), 1);

  // Most requested skills
  const skillCount = {};
  data.requests.forEach((r) => {
    const name = r.requestedSkillId?.skillName;
    if (name) skillCount[name] = (skillCount[name] || 0) + 1;
  });
  const topRequestedSkills = Object.entries(skillCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Most offered skills
  const offeredCount = {};
  data.requests.forEach((r) => {
    const name = r.offeredSkillId?.skillName;
    if (name) offeredCount[name] = (offeredCount[name] || 0) + 1;
  });
  const topOfferedSkills = Object.entries(offeredCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Rating distribution
  const ratingDist = [1, 2, 3, 4, 5].map((r) => ({ rating: r, count: data.reviews.filter((rev) => rev.rating === r).length }));
  const maxRatingCount = Math.max(...ratingDist.map((r) => r.count), 1);

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><BarChart2 size={28} className="text-indigo-400" /> Reports</h1>
        <p className="text-slate-400 mb-8">Analytics and insights for the Skill Swap module.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Swaps */}
          <ReportCard title="Monthly Swap Requests (Last 6 months)" icon={Calendar} color="text-sky-400">
            {loading ? <div className="h-40 bg-slate-800/50 animate-pulse rounded-xl" /> : (
              <div className="flex items-end gap-3 h-40">
                {monthlyData.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-slate-400 text-xs">{m.count}</span>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(m.count / maxMonthly) * 100}%` }} transition={{ delay: i * 0.05 }}
                      className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg min-h-[4px]" />
                    <span className="text-slate-500 text-xs">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </ReportCard>

          {/* Rating Distribution */}
          <ReportCard title="Rating Distribution" icon={Star} color="text-amber-400">
            {loading ? <div className="h-40 bg-slate-800/50 animate-pulse rounded-xl" /> : (
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((r) => {
                  const item = ratingDist.find((d) => d.rating === r);
                  return (
                    <div key={r} className="flex items-center gap-3">
                      <span className="text-amber-400 text-sm w-4">{r}★</span>
                      <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${((item?.count || 0) / maxRatingCount) * 100}%` }}
                          transition={{ delay: (5 - r) * 0.05 }} className="h-full bg-amber-400 rounded-full" />
                      </div>
                      <span className="text-slate-400 text-xs w-6">{item?.count || 0}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </ReportCard>

          {/* Most Requested Skills */}
          <ReportCard title="Most Requested Skills" icon={TrendingUp} color="text-purple-400">
            {loading ? <div className="h-40 bg-slate-800/50 animate-pulse rounded-xl" /> : topRequestedSkills.length === 0 ? (
              <p className="text-slate-500 text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {topRequestedSkills.map(([name, count], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-slate-500 text-xs w-4">{i + 1}</span>
                    <span className="text-white text-sm flex-1 truncate">{name}</span>
                    <span className="text-purple-400 text-xs font-bold">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </ReportCard>

          {/* Most Offered Skills */}
          <ReportCard title="Most Offered Skills" icon={Activity} color="text-emerald-400">
            {loading ? <div className="h-40 bg-slate-800/50 animate-pulse rounded-xl" /> : topOfferedSkills.length === 0 ? (
              <p className="text-slate-500 text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {topOfferedSkills.map(([name, count], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-slate-500 text-xs w-4">{i + 1}</span>
                    <span className="text-white text-sm flex-1 truncate">{name}</span>
                    <span className="text-emerald-400 text-xs font-bold">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </ReportCard>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
