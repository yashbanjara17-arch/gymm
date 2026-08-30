import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Home, ArrowLeft, ShieldAlert, Sparkles, Compass, UserCheck } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-xl w-full text-center space-y-8 relative z-10"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ rotate: -20 }}
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-yellow-500 to-amber-300 text-black flex items-center justify-center font-black shadow-2xl shadow-yellow-400/30"
          >
            <Dumbbell className="w-12 h-12 sm:w-14 sm:h-14" />
          </motion.div>

          <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>404 Error</span>
          </span>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Off-Track Repetition</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
            Lost In The <span className="gradient-text-yellow">Gains Zone?</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
            The page or workout routine you're looking for doesn't exist, was relocated, or skipped leg day.
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-lg space-y-3">
          <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider block">
            Popular Training Destinations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { path: '/programs', label: 'Programs' },
              { path: '/workouts', label: 'Exercise Vault' },
              { path: '/transformations', label: 'Hall of Fame' },
              { path: '/recovery', label: 'Recovery Suite' },
              { path: '/#pricing', label: 'Memberships' },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-400 dark:hover:text-black text-xs font-bold text-slate-700 dark:text-slate-300 transition-all border border-slate-200 dark:border-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-white/20 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-black text-xs uppercase tracking-wider hover:from-yellow-300 hover:to-amber-300 shadow-xl shadow-yellow-400/25 transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return To Home</span>
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-200 transition flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Member Login</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
