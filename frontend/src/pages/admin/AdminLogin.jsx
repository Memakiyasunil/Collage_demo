import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication check
    if (username === 'admin' && password === 'admin123') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Invalid username or password (use admin/admin123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8 font-sans">
      <div className="bg-white w-full max-w-[400px] rounded-xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold mb-2">
            <span className="text-slate-900">Education</span> <span className="text-yellow-400">Forge</span> <span className="text-slate-900">Admin</span>
          </h2>
          <p className="text-slate-500 text-[0.95rem]">Please login to your account</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-[0.85rem] mb-6 text-center border border-red-200">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-[0.85rem] font-semibold text-slate-600 mb-2">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full py-3 pr-4 pl-11 border border-slate-300 rounded-md outline-none text-[0.95rem] transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.85rem] font-semibold text-slate-600 mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Enter admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 pr-4 pl-11 border border-slate-300 rounded-md outline-none text-[0.95rem] transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </div>
          </div>

          <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg text-base font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.4)]">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
