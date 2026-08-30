import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Star, Flame, ArrowRight, Sparkles, TrendingUp, CheckCircle2, User, Quote } from 'lucide-react';
export default function Transformations() {
  const transformations = [
    {
      id: 1,
      name: 'Rohan Sharma',
      age: 28,
      duration: '16 Weeks',
      lost: '-14 kg Fat',
      gained: '+4.5 kg Lean Muscle',
      coach: 'John Miller',
      program: 'Hypertrophy & Macro Recomp',
      quote: 'fitS GYM gave me structured accountability. The personalized caloric breakdown and daily check-ins kept me on track even during high-stress work weeks.',
      beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=500&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500&auto=format&fit=crop',
      stats: { startWeight: '88 kg', endWeight: '74 kg', bodyFat: '26% → 12%' }
    },
    {
      id: 2,
      name: 'Priya Verma',
      age: 25,
      duration: '12 Weeks',
      lost: '-9 kg Fat',
      gained: '+2.8 kg Muscle & Strength',
      coach: 'Sarah Connor',
      program: 'Powerlifting & Athletic Conditioning',
      quote: 'From struggling with bodyweight squats to pulling a 110kg deadlift! The coaches prioritized form above all else.',
      beforeImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop',
      stats: { startWeight: '68 kg', endWeight: '59 kg', bodyFat: '31% → 19%' }
    },
    {
      id: 3,
      name: 'Arjun Patel',
      age: 32,
      duration: '24 Weeks',
      lost: '-18 kg Fat',
      gained: '+6 kg Muscle',
      coach: 'Marcus Vance',
      program: 'Calisthenics & Lean Bulk',
      quote: 'I used to feel exhausted by mid-afternoon. Now my energy levels and strength are at an all-time peak.',
      beforeImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop',
      stats: { startWeight: '94 kg', endWeight: '76 kg', bodyFat: '29% → 11%' }
    }
  ];
  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-[#07090E] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Proven Results</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Hall of <span className="gradient-text-yellow">Transformation</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Real athletes, real dedication, real science. See how our members revolutionized their bodies and strength through structured coaching.
          </p>
        </div>
        <div className="space-y-12 max-w-5xl mx-auto">
          {transformations.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl overflow-hidden h-64 border border-slate-200 dark:border-white/10 shadow">
                    <img src={item.beforeImg} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-black uppercase">
                      Before
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-64 border-2 border-yellow-400 shadow-lg">
                    <img src={item.afterImg} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase shadow">
                      After ({item.duration})
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">{item.name}</h3>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 font-bold">Mentored by Coach {item.coach}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase">
                      {item.duration}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Fat Lost</span>
                      <b className="text-sm font-black text-rose-500">{item.lost}</b>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Muscle Gain</span>
                      <b className="text-sm font-black text-emerald-500">{item.gained}</b>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Body Fat</span>
                      <b className="text-sm font-black text-yellow-500">{item.stats.bodyFat}</b>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 relative">
                    <Quote className="w-5 h-5 text-yellow-500/30 absolute top-2 right-2" />
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase text-yellow-600 dark:text-yellow-400 hover:underline pt-1"
                  >
                    <span>Start Your Transformation Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}