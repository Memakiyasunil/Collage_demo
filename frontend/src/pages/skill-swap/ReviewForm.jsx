import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Send, ArrowLeft } from 'lucide-react';
import { submitReview } from '../../store/slices/sessionsSlice';
import toast from 'react-hot-toast';

const StarRatingInput = ({ value, onChange }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" onClick={() => onChange(star)}
        className="transition-transform hover:scale-110 active:scale-95">
        <Star size={36} className={star <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-700 hover:text-amber-300'} />
      </button>
    ))}
  </div>
);

const RATING_LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent!' };

const ReviewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  const revieweeId = searchParams.get('reviewee');

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error('Please select a rating');
    if (!sessionId || !revieweeId) return toast.error('Missing session or reviewee information');

    setSubmitting(true);
    const result = await dispatch(submitReview({ sessionId, revieweeId, rating, review }));
    setSubmitting(false);

    if (!result.error) {
      toast.success('Review submitted! ⭐');
      navigate('/skill-swap/sessions?status=Completed');
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-lg mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> Back to Sessions
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center"><Star size={22} className="text-amber-400 fill-amber-400" /></div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Leave a Review</h1>
              <p className="text-slate-400 text-sm">Share your session experience</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Star Rating */}
            <div>
              <label className="block text-slate-300 font-semibold mb-4">Rating *</label>
              <StarRatingInput value={rating} onChange={setRating} />
              {rating > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-amber-400 font-bold text-lg">
                  {RATING_LABELS[rating]}
                </motion.p>
              )}
            </div>

            {/* Written Review */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Written Review <span className="text-slate-500 font-normal">(optional, max 1000 chars)</span>
              </label>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} maxLength={1000} rows={5}
                placeholder="Describe your experience — what you learned, how the session went, and any feedback..."
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600 resize-none" />
              <p className={`text-xs mt-1 text-right ${review.length > 900 ? 'text-amber-400' : 'text-slate-500'}`}>{review.length}/1000</p>
            </div>

            <button type="submit" disabled={submitting || rating === 0}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-colors">
              <Send size={18} /> {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewForm;
