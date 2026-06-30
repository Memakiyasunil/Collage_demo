import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Save } from 'lucide-react';
import { createSkill, updateSkill, fetchCategories } from '../../store/slices/skillsSlice';
import { skillApi } from '../../services/skillSwapApi';
import toast from 'react-hot-toast';
import { useState } from 'react';

const schema = yup.object({
  skillName: yup.string().required('Skill name is required').max(150),
  categoryId: yup.string().required('Category is required'),
  description: yup.string().max(1000, 'Max 1000 characters'),
  experienceLevel: yup.string().required('Experience level is required').oneOf(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  yearsExperience: yup.number().min(0).max(50).typeError('Must be a number'),
  portfolioUrl: yup.string().url('Must be a valid URL').nullable().transform((v) => v || null),
  visibility: yup.string().oneOf(['Public', 'Private']),
});

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const AddEditSkill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { categories } = useSelector((s) => s.skills);
  const [descLen, setDescLen] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { visibility: 'Public', experienceLevel: 'Beginner', yearsExperience: 0 },
  });

  const descValue = watch('description', '');

  useEffect(() => {
    dispatch(fetchCategories());
    if (isEdit) {
      skillApi.getById(id).then(({ data }) => {
        const sk = data.data;
        reset({
          skillName: sk.skillName,
          categoryId: sk.categoryId?._id || sk.categoryId,
          description: sk.description,
          experienceLevel: sk.experienceLevel,
          yearsExperience: sk.yearsExperience,
          portfolioUrl: sk.portfolioUrl,
          visibility: sk.visibility,
        });
      }).catch(() => toast.error('Failed to load skill'));
    }
  }, [dispatch, id]);

  useEffect(() => { setDescLen(descValue?.length || 0); }, [descValue]);

  const onSubmit = async (values) => {
    setSubmitting(true);
    const action = isEdit ? updateSkill({ id, updates: values }) : createSkill(values);
    const result = await dispatch(action);
    setSubmitting(false);
    if (!result.error) {
      toast.success(isEdit ? 'Skill updated!' : 'Skill created!');
      navigate('/skill-swap/skills');
    } else {
      toast.error(result.payload);
    }
  };

  const InputField = ({ label, name, type = 'text', placeholder, children }) => (
    <div>
      <label className="block text-slate-300 text-sm font-semibold mb-1.5">{label}</label>
      {children || (
        <input {...register(name)} type={type} placeholder={placeholder}
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500 transition-colors placeholder:text-slate-600" />
      )}
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="bg-slate-950 min-h-screen pt-28 px-4 md:px-8 pb-16">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-medium transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
              <BookOpen size={22} className="text-sky-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">{isEdit ? 'Edit Skill' : 'Add New Skill'}</h1>
              <p className="text-slate-400 text-sm">Fill in the details about your skill</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField label="Skill Name *" name="skillName" placeholder="e.g. React.js Development" />

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1.5">Category *</label>
              <select {...register('categoryId')} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500 transition-colors">
                <option value="">Select a category</option>
                {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
              {errors.categoryId && <p className="text-red-400 text-xs mt-1">{errors.categoryId.message}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1.5">Description <span className="text-slate-500">(max 1000 chars)</span></label>
              <textarea {...register('description')} rows={4} placeholder="Describe what you can teach or help with..."
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500 transition-colors placeholder:text-slate-600 resize-none" />
              <p className={`text-xs mt-1 text-right ${descLen > 900 ? 'text-amber-400' : 'text-slate-500'}`}>{descLen}/1000</p>
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-1.5">Experience Level *</label>
                <select {...register('experienceLevel')} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-500">
                  {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.experienceLevel && <p className="text-red-400 text-xs mt-1">{errors.experienceLevel.message}</p>}
              </div>
              <InputField label="Years of Experience" name="yearsExperience" type="number" placeholder="0" />
            </div>

            <InputField label="Portfolio URL" name="portfolioUrl" type="url" placeholder="https://your-portfolio.com" />

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-1.5">Visibility</label>
              <div className="flex gap-3">
                {['Public', 'Private'].map((v) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" {...register('visibility')} value={v} className="accent-sky-500" />
                    <span className="text-slate-300 text-sm">{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold transition-colors mt-4">
              <Save size={18} /> {submitting ? 'Saving...' : isEdit ? 'Update Skill' : 'Create Skill'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddEditSkill;
