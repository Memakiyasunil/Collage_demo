import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';
import { fetchMySkills } from '../../store/slices/skillsSlice';
import { sendRequest } from '../../store/slices/requestsSlice';
import { skillApi } from '../../services/skillSwapApi';
import toast from 'react-hot-toast';

const schema = yup.object({
  offeredSkillId: yup.string().required('Please select your offered skill'),
  requestedSkillId: yup.string().required('Please select the requested skill'),
  message: yup.string().max(500),
  preferredDate: yup.string().required('Date is required'),
  preferredTime: yup.string().required('Time is required'),
  meetingType: yup.string().oneOf(['Online', 'In-Person']),
  duration: yup.number().oneOf([30, 60, 90, 120]),
});

const SendRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get('to');
  const { mySkills } = useSelector((s) => s.skills);
  const [theirSkills, setTheirSkills] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const todayStr = new Date().toISOString().split('T')[0];

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { meetingType: 'Online', duration: 60 },
  });

  useEffect(() => {
    dispatch(fetchMySkills());
    if (receiverId) {
      skillApi.getAll({ userId: receiverId }).then(({ data }) => setTheirSkills(data.data || [])).catch(() => {});
    }
  }, [dispatch, receiverId]);

  const onSubmit = async (values) => {
    setSubmitting(true);
    const result = await dispatch(sendRequest({ ...values, receiverId }));
    setSubmitting(false);
    if (!result.error) {
      toast.success('Swap request sent!');
      navigate('/skill-swap/requests');
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center"><Send size={22} className="text-amber-400" /></div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Send Swap Request</h1>
              <p className="text-slate-400 text-sm">Propose a skill exchange</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1.5">Your Skill to Offer *</label>
              <select {...register('offeredSkillId')} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500">
                <option value="">Select one of your skills</option>
                {mySkills.filter(s => !s.isArchived).map((s) => <option key={s._id} value={s._id}>{s.skillName}</option>)}
              </select>
              {errors.offeredSkillId && <p className="text-red-400 text-xs mt-1">{errors.offeredSkillId.message}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1.5">Skill You Want in Return *</label>
              <select {...register('requestedSkillId')} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500">
                <option value="">Select their skill</option>
                {theirSkills.map((s) => <option key={s._id} value={s._id}>{s.skillName}</option>)}
              </select>
              {errors.requestedSkillId && <p className="text-red-400 text-xs mt-1">{errors.requestedSkillId.message}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1.5">Message (optional)</label>
              <textarea {...register('message')} rows={3} placeholder="Tell them why you'd like to swap skills..."
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500 placeholder:text-slate-600 resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1.5">Preferred Date *</label>
                <input type="date" {...register('preferredDate')} min={todayStr}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500" />
                {errors.preferredDate && <p className="text-red-400 text-xs mt-1">{errors.preferredDate.message}</p>}
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1.5">Preferred Time *</label>
                <input type="time" {...register('preferredTime')}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500" />
                {errors.preferredTime && <p className="text-red-400 text-xs mt-1">{errors.preferredTime.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1.5">Meeting Type</label>
                <select {...register('meetingType')} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500">
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1.5">Duration</label>
                <select {...register('duration')} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500">
                  {[30, 60, 90, 120].map((d) => <option key={d} value={d}>{d} min</option>)}
                </select>
              </div>
            </div>

            <button type="submit" disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold transition-colors">
              <Send size={18} /> {submitting ? 'Sending...' : 'Send Request'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SendRequest;
