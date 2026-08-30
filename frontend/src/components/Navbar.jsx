import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Dumbbell, Sun, Moon, LogOut, LayoutDashboard, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B0F17]/85 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black shadow-lg shadow-yellow-400/20 group-hover:scale-105 transition-transform duration-300">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                fitS<span className="text-yellow-400">GYM</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                Elite Fitness Club
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-semibold tracking-wide uppercase transition ${
                location.pathname === '/'
                  ? 'text-yellow-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-yellow-400'
              }`}
            >
              Home
            </Link>
            <a
              href="/#about"
              className="text-sm font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300 hover:text-yellow-400 transition"
            >
              About
            </a>
            <a
              href="/#pricing"
              className="text-sm font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300 hover:text-yellow-400 transition"
            >
              Plans
            </a>
            <a
              href="/#features"
              className="text-sm font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300 hover:text-yellow-400 transition"
            >
              Features
            </a>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-yellow-400 hover:text-black font-semibold text-xs uppercase tracking-wider transition duration-300"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-semibold text-xs uppercase tracking-wider transition duration-300"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-xs uppercase tracking-wider shadow-lg shadow-yellow-400/20 hover:scale-105 transition-all duration-300"
              >
                Login Portal
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
