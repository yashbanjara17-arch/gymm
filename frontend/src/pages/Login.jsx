import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Shield, Dumbbell, UserCheck, Lock, Phone, User, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('customer'); // 'customer' | 'trainer' | 'admin'
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (role === 'admin') {
        res = await authAPI.adminLogin({ username, password });
      } else if (role === 'trainer') {
        res = await authAPI.trainerLogin({ username, password });
      } else {
        if (!phone || phone.length !== 10) {
          setError('Please enter a valid 10-digit phone number');
          setLoading(false);
          return;
        }
        res = await authAPI.customerLogin({ phone, password });
      }

      if (res.data.success) {
        login(res.data.user, res.data.token);
        if (role === 'admin') navigate('/admin');
        else if (role === 'trainer') navigate('/trainer');
        else navigate('/customer');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (demoRole) => {
    setRole(demoRole);
    setError('');
    if (demoRole === 'admin') {
      setUsername('admin');
      setPassword('admin');
    } else if (demoRole === 'trainer') {
      setUsername('john_coach');
      setPassword('trainer123');
    } else {
      setPhone('9998887770');
      setPassword('pass123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-400 text-black shadow-xl shadow-yellow-400/20 mb-4">
            <Dumbbell className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Portal Access
          </h2>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Sign in to your fitS GYM account
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => { setRole('customer'); setError(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              role === 'customer'
                ? 'bg-yellow-400 text-black shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Member</span>
          </button>

          <button
            type="button"
            onClick={() => { setRole('trainer'); setError(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              role === 'trainer'
                ? 'bg-yellow-400 text-black shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Trainer</span>
          </button>

          <button
            type="button"
            onClick={() => { setRole('admin'); setError(''); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              role === 'admin'
                ? 'bg-yellow-400 text-black shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {role === 'customer' ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Registered Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {role === 'admin' ? 'Admin Username' : 'Trainer Username'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-300 shadow-lg shadow-yellow-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In as {role}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Quick Demo Fill</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillQuickDemo('customer')}
                className="py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-yellow-400/20 text-slate-700 dark:text-slate-300 hover:text-yellow-500 text-[11px] font-semibold transition"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('trainer')}
                className="py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-yellow-400/20 text-slate-700 dark:text-slate-300 hover:text-yellow-500 text-[11px] font-semibold transition"
              >
                Trainer
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('admin')}
                className="py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-yellow-400/20 text-slate-700 dark:text-slate-300 hover:text-yellow-500 text-[11px] font-semibold transition"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-yellow-400 uppercase tracking-wider transition"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
