import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BookOpen, Star, Clock, CheckCircle2 } from 'lucide-react';
import { fetchSessions } from '../../store/slices/sessionsSlice';
import { fetchReviews } from '../../store/slices/sessionsSlice';
import { format } from 'date-fns';

const LearningHistory = () => {
  const dispatch = useDispatch();
  const { list: sessions, reviews } = useSelector((s) => s.sessions);

  useEffect(() => {
    dispatch(fetchSessions({ status: 'Completed' }));
    dispatch(fetchReviews());
  }, [dispatch]);

  const getReviewForSession = (sessionId) => reviews.find((r) => r.sessionId?._id === sessionId || r.sessionId === sessionId);

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><BookOpen size={28} className="text-purple-400" /> Learning History</h1>
        <p className="text-slate-400 mb-8">A timeline of all your completed skill exchange sessions.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5 text-center">
            <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-white">{sessions.length}</p>
            <p className="text-slate-400 text-sm">Completed Sessions</p>
          </div>
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5 text-center">
            <Star size={24} className="text-amber-400 mx-auto mb-2 fill-amber-400" />
            <p className="text-3xl font-extrabold text-white">
              {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '—'}
            </p>
            <p className="text-slate-400 text-sm">Avg. Rating Given</p>
          </div>
          <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5 text-center">
            <Clock size={24} className="text-sky-400 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-white">
              {sessions.reduce((sum, s) => sum + (s.duration || 0), 0)} min
            </p>
            <p className="text-slate-400 text-sm">Total Time Swapped</p>
          </div>
        </div>

        {/* Timeline */}
        {sessions.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
            <p>No completed sessions yet. Start swapping to build your history!</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-800" />
            <div className="space-y-6">
              {sessions.map((session, i) => {
                const req = session.requestId;
                const sessionReview = getReviewForSession(session._id);
                return (
                  <motion.div key={session._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="relative pl-14">
                    <div className="absolute left-3 top-3 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950 z-10" />
                    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-5 hover:border-purple-500/30 transition-all">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-white font-bold">{req?.offeredSkillId?.skillName} ↔ {req?.requestedSkillId?.skillName}</p>
                          <p className="text-slate-500 text-xs mt-0.5">with {req?.senderId?.name} & {req?.receiverId?.name}</p>
                        </div>
                        <span className="text-slate-500 text-xs shrink-0">
                          {session.sessionDate ? format(new Date(session.sessionDate), 'MMM d, yyyy') : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Clock size={11} /> {session.duration} min</span>
                        {sessionReview ? (
                          <span className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, s) => (
                              <Star key={s} size={10} className={s < sessionReview.rating ? 'fill-amber-400' : 'fill-slate-700'} />
                            ))}
                          </span>
                        ) : (
                          <span className="text-slate-600">No review submitted</span>
                        )}
                      </div>
                      {sessionReview?.review && (
                        <p className="text-slate-400 text-sm mt-2 italic">"{sessionReview.review}"</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHistory;
