import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('userToken', data.token);
        toast.success('Logged in successfully!');
        navigate('/skill-swap');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b14] flex items-center justify-center px-4 pt-24 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-[#060b14] to-[#060b14] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-sky-400" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to continue to Skill Swap</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-slate-500" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 outline-none focus:border-sky-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500" />
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 outline-none focus:border-sky-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Signing in...' : (
              <>Sign In <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
