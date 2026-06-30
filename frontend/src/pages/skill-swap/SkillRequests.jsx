import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Trash2, ChevronRight, Clock, User } from 'lucide-react';
import { fetchRequests, updateRequestStatus, deleteRequest } from '../../store/slices/requestsSlice';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  Pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Accepted: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  Cancelled: 'bg-slate-700 text-slate-400 border-slate-600',
  Completed: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  Expired: 'bg-slate-700 text-slate-500 border-slate-600',
};

const SkillRequests = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.requests);
  const [tab, setTab] = useState('received'); // 'received' | 'sent'
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchRequests({ role: tab }));
  }, [dispatch, tab]);

  const handleStatusUpdate = async (id, status) => {
    const result = await dispatch(updateRequestStatus({ id, status }));
    if (!result.error) {
      toast.success(`Request ${status.toLowerCase()}`);
      setSelected(null);
    } else {
      toast.error(result.payload);
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteRequest(id));
    if (!result.error) toast.success('Request deleted');
    else toast.error(result.payload);
  };

  const RequestCard = ({ req }) => (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 hover:border-sky-500/30 transition-all cursor-pointer"
      onClick={() => setSelected(req)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
            {(tab === 'received' ? req.senderId?.name : req.receiverId?.name)?.[0] || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold truncate">
              {tab === 'received' ? req.senderId?.name : req.receiverId?.name}
            </p>
            <p className="text-slate-500 text-xs mt-0.5 truncate">
              Offers: <span className="text-slate-300">{req.offeredSkillId?.skillName}</span>
              {' '}→ Wants: <span className="text-slate-300">{req.requestedSkillId?.skillName}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLES[req.status] || ''}`}>{req.status}</span>
          <span className="text-slate-600 text-xs flex items-center gap-1"><Clock size={10} />{req.createdAt ? format(new Date(req.createdAt), 'MMM d, yyyy') : ''}</span>
        </div>
      </div>

      {req.status === 'Pending' && tab === 'received' && (
        <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => handleStatusUpdate(req._id, 'Accepted')}
            className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 py-2 rounded-lg text-sm font-semibold transition-all">
            <Check size={14} /> Accept
          </button>
          <button onClick={() => handleStatusUpdate(req._id, 'Rejected')}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 py-2 rounded-lg text-sm font-semibold transition-all">
            <X size={14} /> Reject
          </button>
        </div>
      )}

      {['Pending', 'Rejected', 'Cancelled', 'Expired'].includes(req.status) && tab === 'sent' && (
        <button onClick={(e) => { e.stopPropagation(); handleDelete(req._id); }}
          className="mt-3 flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors">
          <Trash2 size={12} /> Delete
        </button>
      )}
    </motion.div>
  );

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><Bell size={28} className="text-amber-400" /> Skill Requests</h1>
        <p className="text-slate-400 mb-6">Manage incoming and outgoing swap requests.</p>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900 border border-slate-700/60 rounded-xl p-1 w-fit mb-6">
          {['received', 'sent'].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-slate-800/50 animate-pulse rounded-xl" />)}</div>
        ) : list.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Bell size={40} className="mx-auto mb-3 opacity-20" />
            <p>No {tab} requests yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((req) => <RequestCard key={req._id} req={req} />)}
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl">Request Details</h3>
                  <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 rounded-xl p-4">
                      <p className="text-slate-500 text-xs mb-1">From</p>
                      <p className="text-white font-semibold">{selected.senderId?.name}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4">
                      <p className="text-slate-500 text-xs mb-1">To</p>
                      <p className="text-white font-semibold">{selected.receiverId?.name}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4">
                      <p className="text-slate-500 text-xs mb-1">Offers</p>
                      <p className="text-sky-400 font-semibold">{selected.offeredSkillId?.skillName}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4">
                      <p className="text-slate-500 text-xs mb-1">Wants</p>
                      <p className="text-purple-400 font-semibold">{selected.requestedSkillId?.skillName}</p>
                    </div>
                  </div>
                  {selected.message && (
                    <div className="bg-slate-800 rounded-xl p-4">
                      <p className="text-slate-500 text-xs mb-1">Message</p>
                      <p className="text-slate-300">{selected.message}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                      <p className="text-slate-500 text-xs">Date</p>
                      <p className="text-white text-xs font-semibold mt-1">{selected.preferredDate ? format(new Date(selected.preferredDate), 'MMM d, yyyy') : 'N/A'}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                      <p className="text-slate-500 text-xs">Time</p>
                      <p className="text-white text-xs font-semibold mt-1">{selected.preferredTime}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-3 text-center">
                      <p className="text-slate-500 text-xs">Duration</p>
                      <p className="text-white text-xs font-semibold mt-1">{selected.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[selected.status]}`}>{selected.status}</span>
                    <span className="text-slate-500 text-xs">{selected.meetingType}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillRequests;
