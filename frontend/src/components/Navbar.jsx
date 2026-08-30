import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Dumbbell, Sun, Moon, LogOut, LayoutDashboard, Sparkles, Shield, UserCheck, Flame, ArrowUp } from 'lucide-react';
export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowScrollTop(latest > 350);
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'trainer') return '/trainer';
    return '/customer';
  };
  const getRoleBadge = () => {
    if (!user) return null;
    if (user.role === 'admin') return { label: 'Admin', color: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30', icon: Shield };
    if (user.role === 'trainer') return { label: 'Coach', color: 'bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30', icon: Dumbbell };
    return { label: 'Athlete', color: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', icon: UserCheck };
  };
  const roleInfo = getRoleBadge();
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all">
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 py-1.5 px-4 text-center text-black font-extrabold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm pointer-events-auto overflow-hidden"
            >
              <Flame className="w-3.5 h-3.5 fill-black" />
              <span>Summer Transformation Sale • 20% Off All Annual Memberships</span>
              <Flame className="w-3.5 h-3.5 fill-black" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
          <motion.nav
            animate={{
              scale: isScrolled ? 0.98 : 1,
              y: isScrolled ? -2 : 0,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`rounded-full border shadow-2xl px-5 sm:px-7 py-3 flex items-center justify-between transition-all pointer-events-auto ${
              isScrolled
                ? 'bg-white/95 dark:bg-[#07090E]/95 backdrop-blur-3xl border-yellow-400/40 shadow-yellow-400/5'
                : 'bg-white/85 dark:bg-[#0B0F17]/85 backdrop-blur-2xl border-slate-200/90 dark:border-white/10 shadow-slate-900/10 dark:shadow-black/60'
            }`}
          >
            <Link to="/" className="flex items-center space-x-3.5 group flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-300 text-black flex items-center justify-center font-black shadow-md shadow-yellow-400/25 group-hover:shadow-yellow-400/40 transition-shadow"
              >
                <Dumbbell className="w-5 h-5" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase flex items-center gap-1">
                  fitS<span className="text-yellow-500 dark:text-yellow-400">GYM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400 animate-pulse"></span>
                </span>
                <span className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 tracking-widest uppercase -mt-0.5">
                  Elite Performance Club
                </span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-slate-100/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md">
              {[
                { path: '/', label: 'Home' },
                { path: '/programs', label: 'Programs' },
                { path: '/#pricing', label: 'Memberships' },
                { path: '/contact', label: 'Contact' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-yellow-400 text-black font-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-slate-200 dark:hover:bg-white/10 transition duration-200"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </motion.button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2.5">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-black text-xs uppercase tracking-wider shadow-lg shadow-yellow-400/20 transition duration-300"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs uppercase tracking-wider transition duration-300 flex items-center gap-1.5"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black hover:from-yellow-300 hover:to-amber-300 font-black text-xs uppercase tracking-wider shadow-xl shadow-yellow-400/25 flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Member Login</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.nav>
        </div>
      </header>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black shadow-2xl shadow-yellow-400/40 hover:from-yellow-300 hover:to-amber-300 transition border border-black/10"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 font-black" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}