import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Search, SlidersHorizontal, Zap, ArrowRight, Star, BookOpen, Heart } from 'lucide-react';
import { fetchMatches } from '../../store/slices/skillsSlice';

const SCORE_CONFIG = [
  { min: 70, color: 'bg-emerald-500', label: 'Strong Match', textColor: 'text-emerald-400', bgBadge: 'bg-emerald-500/20 text-emerald-400' },
  { min: 40, color: 'bg-amber-500', label: 'Good Match', textColor: 'text-amber-400', bgBadge: 'bg-amber-500/20 text-amber-400' },
  { min: 0, color: 'bg-slate-600', label: 'Possible Match', textColor: 'text-slate-400', bgBadge: 'bg-slate-700 text-slate-400' },
];

const getScoreConfig = (score) => SCORE_CONFIG.find((c) => score >= c.min) || SCORE_CONFIG[2];

const SkillMatches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { matches, loading } = useSelector((s) => s.skills);
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(0);

  useEffect(() => { dispatch(fetchMatches()); }, [dispatch]);

  const filtered = matches
    .filter((m) => m.matchScore >= minScore)
    .filter((m) => {
      if (!search) return true;
      const name = m.matchedUserId?.name?.toLowerCase() || '';
      const skills = m.theirSkills?.map((s) => s.skillName.toLowerCase()).join(' ') || '';
      return name.includes(search.toLowerCase()) || skills.includes(search.toLowerCase());
    });

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><Zap size={28} className="text-amber-400" /> Skill Matches</h1>
          <p className="text-slate-400">People who offer what you want and want what you offer.</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or skill..."
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-colors placeholder:text-slate-600" />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <select value={minScore} onChange={(e) => setMinScore(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-500">
              <option value={0}>All Matches</option>
              <option value={40}>Good+ (40%)</option>
              <option value={70}>Strong (70%+)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="h-56 bg-slate-800/50 animate-pulse rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Users size={48} className="mx-auto mb-4 opacity-20" />
            <p>No matches found. Try adding more skills and wanted skills.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((match, i) => {
              const cfg = getScoreConfig(match.matchScore);
              return (
                <motion.div key={match._id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6 hover:border-sky-500/40 transition-all group">
                  {/* User Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {match.matchedUserId?.name?.[0] || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold truncate">{match.matchedUserId?.name || 'Unknown'}</p>
                      <p className="text-slate-500 text-xs truncate">{match.matchedUserId?.email}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.bgBadge}`}>{match.matchScore}%</span>
                  </div>

                  {/* Match Score Bar */}
                  <div className="h-1.5 bg-slate-800 rounded-full mb-4 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${match.matchScore}%` }} transition={{ delay: i * 0.04 + 0.2 }}
                      className={`h-full rounded-full ${cfg.color}`} />
                  </div>

                  {/* Their Skills */}
                  <div className="mb-3">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1"><BookOpen size={10} /> Offers</p>
                    <div className="flex flex-wrap gap-1.5">
                      {match.theirSkills?.slice(0, 3).map((sk, si) => (
                        <span key={si} className="bg-sky-500/10 text-sky-400 text-xs px-2 py-0.5 rounded-full border border-sky-500/20">{sk.skillName}</span>
                      ))}
                      {match.theirSkills?.length > 3 && <span className="text-slate-500 text-xs">+{match.theirSkills.length - 3} more</span>}
                    </div>
                  </div>

                  {/* Their Wanted */}
                  <div className="mb-5">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1"><Heart size={10} /> Wants</p>
                    <div className="flex flex-wrap gap-1.5">
                      {match.theirWanted?.slice(0, 3).map((sk, si) => (
                        <span key={si} className="bg-purple-500/10 text-purple-400 text-xs px-2 py-0.5 rounded-full border border-purple-500/20">{sk.skillName}</span>
                      ))}
                      {match.theirWanted?.length > 3 && <span className="text-slate-500 text-xs">+{match.theirWanted.length - 3} more</span>}
                    </div>
                  </div>

                  <Link to={`/skill-swap/requests/send?to=${match.matchedUserId?._id}`}
                    className="flex items-center justify-center gap-2 w-full bg-sky-600/20 hover:bg-sky-600 text-sky-400 hover:text-white border border-sky-500/30 hover:border-sky-600 py-2.5 rounded-xl text-sm font-bold transition-all">
                    Send Swap Request <ArrowRight size={15} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillMatches;
