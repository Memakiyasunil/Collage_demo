import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, BookOpen, ArrowRight } from 'lucide-react';
import { fetchFavorites } from '../../store/slices/skillsSlice';
import { favoriteApi } from '../../services/skillSwapApi';
import toast from 'react-hot-toast';

const EXPERIENCE_COLORS = {
  Beginner: 'text-emerald-400', Intermediate: 'text-sky-400', Advanced: 'text-purple-400', Expert: 'text-amber-400',
};

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((s) => s.skills);

  useEffect(() => { dispatch(fetchFavorites()); }, [dispatch]);

  const handleRemove = async (favId) => {
    try {
      await favoriteApi.remove(favId);
      dispatch(fetchFavorites());
      toast.success('Removed from favorites');
    } catch { toast.error('Failed to remove'); }
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2"><Heart size={28} className="text-red-400 fill-red-400" /> Favorites</h1>
        <p className="text-slate-400 mb-8">Skills you've saved for later.</p>

        {favorites.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Heart size={48} className="mx-auto mb-4 opacity-20" />
            <p>No favorites yet. Browse skills and save the ones you love!</p>
            <Link to="/skill-swap/matches" className="mt-4 inline-block text-sky-400 hover:underline">Browse Matches →</Link>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" layout>
            <AnimatePresence>
              {favorites.map((fav, i) => {
                const skill = fav.skillId;
                return (
                  <motion.div key={fav._id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-5 group hover:border-red-500/30 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                          <BookOpen size={18} className="text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{skill?.skillName}</h3>
                          <p className="text-slate-500 text-xs">{skill?.categoryId?.name || 'Uncategorized'}</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemove(fav._id)}
                        className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{skill?.description || 'No description.'}</p>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${EXPERIENCE_COLORS[skill?.experienceLevel]}`}>{skill?.experienceLevel}</span>
                      <div className="flex gap-2">
                        <span className="text-xs text-slate-500">by {skill?.userId?.name}</span>
                        <Link to={`/skill-swap/requests/send?to=${skill?.userId?._id}`}
                          className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-semibold">
                          Request <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
