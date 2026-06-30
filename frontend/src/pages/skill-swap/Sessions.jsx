import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Video, Clock, CheckCircle2, X, AlertCircle, Star } from 'lucide-react';
import { fetchSessions, updateSession } from '../../store/slices/sessionsSlice';
import { format, formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

const SESSION_TABS = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Missed'];

const STATUS_CONFIG = {
  Upcoming: { icon: Clock, color: 'text-sky-400', bg: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
  Ongoing: { icon: Video, color: 'text-emerald-400', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  Completed: { icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  Cancelled: { icon: X, color: 'text-red-400', bg: 'bg-red-500/20 text-red-400 border-red-500/30' },
  Missed: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
};

const Sessions = () => {
  const dispatch = useDispatch();
  const { list, loading, reviews } = useSelector((s) => s.sessions);
  const [tab, setTab] = useState('Upcoming');

  useEffect(() => {
    dispatch(fetchSessions({ status: tab }));
  }, [dispatch, tab]);

  const handleCancel = async (id) => {
    const result = await dispatch(updateSession({ id, updates: { status: 'Cancelled' } }));
    if (!result.error) toast.success('Session cancelled');
    else toast.error(result.payload);
  };

  const hasReview = (sessionId) => reviews.some((r) => r.sessionId === sessionId || r.sessionId?._id === sessionId);

  const SessionCard = ({ session }) => {
    const cfg = STATUS_CONFIG[session.status] || {};
    const Icon = cfg.icon || Clock;
    const req = session.requestId;

    return (
      <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-6 hover:border-sky-500/30 transition-all">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tab === 'Upcoming' ? 'bg-sky-500/10' : 'bg-slate-800'}`}>
              <Icon size={20} className={cfg.color} />
            </div>
            <div>
              <p className="text-white font-bold">{req?.offeredSkillId?.skillName} ↔ {req?.requestedSkillId?.skillName}</p>
              <p className="text-slate-500 text-xs mt-0.5">
                {req?.senderId?.name} & {req?.receiverId?.name}
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${cfg.bg}`}>{session.status}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-800/50 rounded-xl p-3 text-center">
            <p className="text-slate-500 text-xs mb-1">Date</p>
            <p className="text-white text-xs font-semibold">
              {session.sessionDate ? format(new Date(session.sessionDate), 'MMM d, yyyy') : 'N/A'}
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 text-center">
            <p className="text-slate-500 text-xs mb-1">Duration</p>
            <p className="text-white text-xs font-semibold">{session.duration} min</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 text-center">
            <p className="text-slate-500 text-xs mb-1">{session.status === 'Upcoming' ? 'In' : 'At'}</p>
            <p className="text-white text-xs font-semibold">
              {session.sessionDate
                ? session.status === 'Upcoming'
                  ? formatDistanceToNow(new Date(session.sessionDate), { addSuffix: false })
                  : format(new Date(session.sessionDate), 'HH:mm')
                : 'N/A'}
            </p>
          </div>
        </div>

        {session.meetingLink && (
          <a href={session.meetingLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold mb-4 transition-colors">
            <Video size={15} /> Join Meeting
          </a>
        )}

        <div className="flex gap-2">
          {session.status === 'Upcoming' && (
            <button onClick={() => handleCancel(session._id)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 py-2 rounded-lg text-xs font-semibold transition-all">
              <X size={13} /> Cancel
            </button>
          )}
          {session.status === 'Completed' && !hasReview(session._id) && (
            <Link to={`/skill-swap/reviews/new?session=${session._id}&reviewee=${req?.receiverId?._id}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-white border border-amber-500/30 py-2 rounded-lg text-xs font-semibold transition-all">
              <Star size={13} /> Leave Review
            </Link>
          )}
          {session.status === 'Completed' && hasReview(session._id) && (
            <span className="flex-1 flex items-center justify-center gap-1.5 bg-slate-800 text-slate-500 py-2 rounded-lg text-xs font-semibold">
              <CheckCircle2 size={13} /> Reviewed
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><Calendar size={28} className="text-sky-400" /> Sessions</h1>
        <p className="text-slate-400 mb-6">Track all your scheduled skill exchange sessions.</p>

        {/* Status Tabs */}
        <div className="flex gap-1 flex-wrap bg-slate-900 border border-slate-700/60 rounded-xl p-1 w-fit mb-8">
          {SESSION_TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-52 bg-slate-800/50 animate-pulse rounded-2xl" />)}</div>
        ) : list.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Calendar size={40} className="mx-auto mb-3 opacity-20" />
            <p>No {tab.toLowerCase()} sessions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {list.map((session) => <SessionCard key={session._id} session={session} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
