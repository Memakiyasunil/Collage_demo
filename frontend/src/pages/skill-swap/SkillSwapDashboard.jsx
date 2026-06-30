import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Bell, Calendar, CheckCircle2, Star, Users, ArrowRight, Zap } from 'lucide-react';
import { fetchMySkills, fetchWantedSkills, fetchMatches, fetchFavorites } from '../../store/slices/skillsSlice';
import { fetchRequests } from '../../store/slices/requestsSlice';
import { fetchSessions } from '../../store/slices/sessionsSlice';

const StatCard = ({ icon: Icon, label, value, color, to }) => (
  <motion.div whileHover={{ y: -4 }} className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6 flex items-center gap-5 group cursor-pointer hover:border-sky-500/40 transition-all">
    <Link to={to} className="contents">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} shrink-0`}>
        <Icon size={26} className="text-white" />
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <p className="text-white text-3xl font-extrabold mt-0.5">{value ?? '—'}</p>
      </div>
      <ArrowRight size={18} className="text-slate-600 group-hover:text-sky-400 ml-auto transition-colors" />
    </Link>
  </motion.div>
);

const SkillSwapDashboard = () => {
  const dispatch = useDispatch();
  const { mySkills, wantedSkills, matches, favorites } = useSelector((s) => s.skills);
  const { list: requests } = useSelector((s) => s.requests);
  const { list: sessions, reviews } = useSelector((s) => s.sessions);

  useEffect(() => {
    dispatch(fetchMySkills());
    dispatch(fetchWantedSkills());
    dispatch(fetchMatches());
    dispatch(fetchFavorites());
    dispatch(fetchRequests({ role: 'received', status: 'Pending' }));
    dispatch(fetchSessions({ status: 'Upcoming' }));
  }, [dispatch]);

  const pendingRequests = requests.filter((r) => r.status === 'Pending');
  const upcomingSessions = sessions.filter((s) => s.status === 'Upcoming');
  const completedSessions = sessions.filter((s) => s.status === 'Completed');

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-sky-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Skill Swap Dashboard</h1>
          </div>
          <p className="text-slate-400 text-lg ml-13">Your skill exchange hub — offer, discover, and connect.</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={BookOpen} label="My Skills" value={mySkills.length} color="bg-sky-600" to="/skill-swap/skills" />
          <StatCard icon={Heart} label="Wanted Skills" value={wantedSkills.length} color="bg-purple-600" to="/skill-swap/wanted" />
          <StatCard icon={Bell} label="Pending Requests" value={pendingRequests.length} color="bg-amber-600" to="/skill-swap/requests" />
          <StatCard icon={Calendar} label="Upcoming Sessions" value={upcomingSessions.length} color="bg-emerald-600" to="/skill-swap/sessions" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Match Suggestions */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2"><Users size={18} className="text-sky-400" /> Top Matches</h2>
                <Link to="/skill-swap/matches" className="text-sky-400 text-sm font-semibold hover:text-sky-300">View All →</Link>
              </div>
              {matches.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  <Users size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No matches yet. Add skills and wanted skills to get matched!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {matches.slice(0, 5).map((match, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/40 hover:border-sky-500/30 transition-all">
                      <div className="w-11 h-11 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {match.matchedUserId?.name?.[0] || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{match.matchedUserId?.name || 'Unknown User'}</p>
                        <p className="text-slate-400 text-xs truncate">{match.theirSkills?.map(s => s.skillName).slice(0, 2).join(' • ')}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${match.matchScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' : match.matchScore >= 40 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}`}>
                          {match.matchScore}% match
                        </span>
                        <Link to={`/skill-swap/requests/send?to=${match.matchedUserId?._id}`} className="text-xs text-sky-400 hover:text-sky-300 font-medium">Request →</Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Recent Reviews */}
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg flex items-center gap-2"><Star size={18} className="text-amber-400" /> Recent Reviews</h2>
                <Link to="/skill-swap/sessions" className="text-sky-400 text-sm font-semibold hover:text-sky-300">See All →</Link>
              </div>
              {reviews.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">No reviews yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {reviews.slice(0, 3).map((review, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} size={12} className={s < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
                        ))}
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">{review.review || 'No written review.'}</p>
                      <p className="text-slate-500 text-[10px] mt-1">by {review.reviewerId?.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Sessions */}
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-4"><CheckCircle2 size={18} className="text-emerald-400" /> Completed</h2>
              <p className="text-3xl font-extrabold text-white">{completedSessions.length}</p>
              <p className="text-slate-400 text-sm mt-1">sessions completed</p>
              <Link to="/skill-swap/sessions?status=Completed" className="mt-4 block text-center text-sm font-semibold text-sky-400 hover:text-sky-300">View History →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSwapDashboard;
