import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Flame, Activity, Zap, Clock, Users, ArrowRight, ShieldCheck, HeartPulse, Trophy } from 'lucide-react';
export default function Programs() {
  const [filter, setFilter] = useState('all');
  const programs = [
    {
      id: 'hypertrophy',
      category: 'strength',
      title: 'Hypertrophy & Muscle Building',
      level: 'All Levels',
      duration: '60 Mins',
      schedule: 'Mon, Wed, Fri (6:00 AM & 6:00 PM)',
      coach: 'John Miller',
      intensity: 'High',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
      desc: 'Science-based hypertrophy training focusing on progressive overload, mechanical tension, and targeted isolation exercises.'
    },
    {
      id: 'powerlifting',
      category: 'strength',
      title: 'Olympic Powerlifting & Strength',
      level: 'Intermediate / Advanced',
      duration: '75 Mins',
      schedule: 'Tue, Thu, Sat (7:00 AM & 7:00 PM)',
      coach: 'Sarah Connor',
      intensity: 'Extreme',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
      desc: 'Master the Big 3: Squat, Bench Press, and Deadlift. Build raw maximal force with calibrated plates and power racks.'
    },
    {
      id: 'crossfit',
      category: 'conditioning',
      title: 'CrossFit & Functional Athletics',
      level: 'All Levels',
      duration: '45 Mins',
      schedule: 'Daily (7:30 AM & 5:30 PM)',
      coach: 'Marcus Vance',
      intensity: 'High',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
      desc: 'High-octane functional movements, kettlebells, rowers, box jumps, and sled pushes for peak stamina and agility.'
    },
    {
      id: 'hiit',
      category: 'conditioning',
      title: 'HIIT & Metabolic Fat Torcher',
      level: 'Beginner / Intermediate',
      duration: '40 Mins',
      schedule: 'Mon, Wed, Fri (8:00 AM & 6:30 PM)',
      coach: 'John Miller',
      intensity: 'Maximal',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop',
      desc: 'Fast-paced interval training designed to accelerate calorie expenditure and boost VO2 max even hours post-workout.'
    },
    {
      id: 'mobility',
      category: 'recovery',
      title: 'Mobility, Core & Active Recovery',
      level: 'All Levels',
      duration: '45 Mins',
      schedule: 'Sundays (8:00 AM - 10:00 AM)',
      coach: 'Sarah Connor',
      intensity: 'Low / Moderate',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
      desc: 'Deep myofascial release, joint mobility, thoracic spine opening, and core stability to prevent injury and promote recovery.'
    },
    {
      id: 'calisthenics',
      category: 'strength',
      title: 'Bodyweight Mastery & Calisthenics',
      level: 'Intermediate',
      duration: '50 Mins',
      schedule: 'Tue, Thu (6:00 PM)',
      coach: 'Marcus Vance',
      intensity: 'High',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop',
      desc: 'Muscle-ups, handstands, weighted dips, and gymnastic ring control to build an aesthetic, functional physique.'
    }
  ];
  const filteredPrograms = filter === 'all' 
    ? programs 
    : programs.filter(p => p.category === filter);
  return (
    <div className="pt-32 pb-16 bg-slate-50 dark:bg-[#07090E] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Training Disciplines</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Specialized <span className="gradient-text-yellow">Programs</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            From raw hypertrophy and Olympic lifting to high-intensity athletic conditioning, our structured training programs deliver measurable transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'strength', label: 'Strength & Iron' },
              { id: 'conditioning', label: 'HIIT & Conditioning' },
              { id: 'recovery', label: 'Mobility & Recovery' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === tab.id
                    ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-yellow-400/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-400 text-black font-black text-[10px] uppercase tracking-wider shadow">
                      {prog.level}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-yellow-400">Coach: {prog.coach}</span>
                    <h3 className="text-xl font-black leading-tight mt-0.5">{prog.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4 text-xs">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{prog.desc}</p>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold"><Clock className="w-3.5 h-3.5 text-yellow-500" /> Duration:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{prog.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold"><Activity className="w-3.5 h-3.5 text-yellow-500" /> Intensity:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{prog.intensity}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold"><Clock className="w-3.5 h-3.5 text-yellow-500" /> Schedule:</span>
                      <span className="font-semibold text-slate-900 dark:text-white text-[11px]">{prog.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/login"
                  className="w-full py-3.5 rounded-2xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Enroll in Program</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}