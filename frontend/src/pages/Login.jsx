import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Shield, Dumbbell, UserCheck, Lock, Phone, User, AlertCircle, ArrowRight, KeyRound, Eye, EyeOff, Sparkles } from 'lucide-react';
export default function Login() {
  const [role, setRole] = useState('customer'); 
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative overflow-hidden bg-slate-50 dark:bg-[#07090E] transition-colors duration-300">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-yellow-500 to-amber-300 text-black shadow-xl shadow-yellow-400/30 mb-4"
          >
            <Dumbbell className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Portal Access
          </h2>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Sign in to your fitS GYM account
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl relative shadow-md">
          {[
            { id: 'customer', label: 'Member', icon: UserCheck },
            { id: 'trainer', label: 'Trainer', icon: Dumbbell },
            { id: 'admin', label: 'Admin', icon: Shield },
          ].map((tab) => {
            const isActive = role === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setRole(tab.id);
                  setPhone('');
                  setUsername('');
                  setPassword('');
                  setError('');
                }}
                className={`relative flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors z-10 ${
                  isActive ? 'text-black' : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    transition={{ type: 'spring', damping: 22, stiffness: 350 }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl shadow-md shadow-yellow-400/25 -z-10"
                  />
                )}
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <motion.div
          layout
          className="p-8 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl space-y-6"
        >
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleLogin} autoComplete="off" className="space-y-5">
            <AnimatePresence mode="wait">
              {role === 'customer' ? (
                <motion.div
                  key="customer-field"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Registered 10-Digit Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      autoComplete="off"
                      placeholder="e.g. 9998887770"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition font-medium"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="username-field"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
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
                      autoComplete="off"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition font-medium"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-black text-xs uppercase tracking-wider hover:from-yellow-300 hover:to-amber-300 shadow-xl shadow-yellow-400/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In as {role === 'customer' ? 'Member' : role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
          <div className="pt-6 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              <KeyRound className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400" />
              <span>Quick Demo Fill</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'customer', label: 'Member' },
                { id: 'trainer', label: 'Trainer' },
                { id: 'admin', label: 'Admin' },
              ].map((btn) => (
                <motion.button
                  key={btn.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => fillQuickDemo(btn.id)}
                  className="py-2.5 px-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-yellow-400/20 text-slate-800 dark:text-slate-200 hover:text-yellow-600 dark:hover:text-yellow-400 border border-slate-200 dark:border-white/5 hover:border-yellow-400/30 text-xs font-bold uppercase tracking-wider transition"
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-black text-slate-500 hover:text-yellow-600 dark:text-slate-400 dark:hover:text-yellow-400 uppercase tracking-wider transition"
          >
            ← Back to Public Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}