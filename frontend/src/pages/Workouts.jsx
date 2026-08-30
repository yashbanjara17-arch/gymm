import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Flame, Activity, Zap, Play, Calculator, ArrowRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
export default function Workouts() {
  const [selectedMuscle, setSelectedMuscle] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [liftWeight, setLiftWeight] = useState('100');
  const [liftReps, setLiftReps] = useState('5');
  const calculate1RM = () => {
    const w = Number(liftWeight) || 0;
    const r = Number(liftReps) || 1;
    if (r === 1) return w;
    return Math.round(w * (1 + r / 30));
  };
  const oneRM = calculate1RM();
  const exercises = [
    {
      id: 'barbell-bench',
      name: 'Flat Barbell Bench Press',
      muscle: 'chest',
      equipment: 'barbell',
      difficulty: 'Intermediate',
      target: 'Pectoralis Major, Anterior Deltoids, Triceps',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
      reps: '4 Sets × 6 - 10 Reps',
      cues: 'Retract scapulae, maintain 45-degree elbow tuck, touch sternum, and drive heels firmly into the floor.'
    },
    {
      id: 'incline-db-press',
      name: 'Incline Dumbbell Press',
      muscle: 'chest',
      equipment: 'dumbbell',
      difficulty: 'All Levels',
      target: 'Clavicular (Upper) Pectorals, Triceps',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
      reps: '3 Sets × 8 - 12 Reps',
      cues: 'Set bench to 30 degrees, full stretch at the bottom, converge dumbbells at top without clanking.'
    },
    {
      id: 'barbell-squat',
      name: 'Olympic Barbell Back Squat',
      muscle: 'legs',
      equipment: 'barbell',
      difficulty: 'Advanced',
      target: 'Quadriceps, Glutes, Adductors, Core',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
      reps: '5 Sets × 5 Reps',
      cues: 'Brace core with Valsalva maneuver, break simultaneously at hips and knees, hit parallel depth.'
    },
    {
      id: 'romanian-deadlift',
      name: 'Romanian Deadlift (RDL)',
      muscle: 'legs',
      equipment: 'barbell',
      difficulty: 'Intermediate',
      target: 'Hamstrings, Gluteus Maximus, Erector Spinae',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
      reps: '4 Sets × 8 - 10 Reps',
      cues: 'Hinge hips backward with soft knees, feel deep hamstring stretch, squeeze glutes to lockout.'
    },
    {
      id: 'barbell-row',
      name: 'Bent-Over Barbell Row',
      muscle: 'back',
      equipment: 'barbell',
      difficulty: 'Intermediate',
      target: 'Latissimus Dorsi, Rhomboids, Trapezius',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
      reps: '4 Sets × 8 - 12 Reps',
      cues: 'Torso at 45-degree angle, pull barbell towards belly button driving through elbows.'
    },
    {
      id: 'pull-ups',
      name: 'Weighted Wide-Grip Pull-Up',
      muscle: 'back',
      equipment: 'bodyweight',
      difficulty: 'Intermediate',
      target: 'Upper Lats, Teres Major, Biceps Brachii',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      reps: '4 Sets × 6 - 8 Reps',
      cues: 'Initiate with scapular depression, pull chest all the way to bar with zero swinging.'
    },
    {
      id: 'overhead-press',
      name: 'Standing Overhead Military Press',
      muscle: 'shoulders',
      equipment: 'barbell',
      difficulty: 'Intermediate',
      target: 'Anterior & Lateral Deltoids, Triceps, Core',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop',
      reps: '4 Sets × 6 - 8 Reps',
      cues: 'Squeeze glutes and abs, press vertically in straight line, lock out elbows overhead.'
    },
    {
      id: 'lateral-raises',
      name: 'Leaning Cable Lateral Raise',
      muscle: 'shoulders',
      equipment: 'cables',
      difficulty: 'All Levels',
      target: 'Lateral Deltoids (Boulder Shoulders)',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop',
      reps: '4 Sets × 12 - 15 Reps',
      cues: 'Constant cable tension at bottom, lead with elbows, slight forward torso angle.'
    },
    {
      id: 'incline-db-curl',
      name: 'Incline Dumbbell Bicep Curl',
      muscle: 'arms',
      equipment: 'dumbbell',
      difficulty: 'All Levels',
      target: 'Biceps Long Head (Peak Development)',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop',
      reps: '3 Sets × 10 - 12 Reps',
      cues: 'Keep elbows pinned behind torso, full stretch at bottom, supinate wrists at peak contraction.'
    }
  ];
  const filteredExercises = exercises.filter(ex => {
    const matchMuscle = selectedMuscle === 'all' || ex.muscle === selectedMuscle;
    const matchEquip = selectedEquipment === 'all' || ex.equipment === selectedEquipment;
    return matchMuscle && matchEquip;
  });
  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-[#07090E] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Master The Movements</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Exercise <span className="gradient-text-yellow">Vault & Database</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Explore biomechanically verified execution cues, rep ranges, target muscle maps, and our interactive 1-Rep Max calculator.
          </p>
        </div>
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-yellow-400/30 max-w-4xl mx-auto shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-yellow-600 dark:text-yellow-400">
                <Calculator className="w-4 h-4" />
                <span>One-Rep Max (1RM) Estimator</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">
                Calculate Your Theoretical Maximal Lift
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Weight Lifted (kg)</label>
                  <input
                    type="number"
                    value={liftWeight}
                    onChange={(e) => setLiftWeight(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Repetitions Performed</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={liftReps}
                    onChange={(e) => setLiftReps(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-yellow-400/20 via-amber-500/10 to-slate-900 dark:to-[#07090E] border border-yellow-400/40 text-center space-y-2">
              <span className="text-[10px] font-black uppercase text-yellow-600 dark:text-yellow-400 tracking-widest block">Estimated 1RM</span>
              <h4 className="text-4xl font-black text-slate-900 dark:text-white">{oneRM} <span className="text-base font-bold text-yellow-500">kg</span></h4>
              <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                <div><span>90%:</span> <b className="text-slate-900 dark:text-white">{Math.round(oneRM * 0.9)}kg</b></div>
                <div><span>80%:</span> <b className="text-slate-900 dark:text-white">{Math.round(oneRM * 0.8)}kg</b></div>
                <div><span>70%:</span> <b className="text-slate-900 dark:text-white">{Math.round(oneRM * 0.7)}kg</b></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-black uppercase text-slate-400 mr-2 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Muscle:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'chest', label: 'Chest' },
              { id: 'back', label: 'Back' },
              { id: 'legs', label: 'Legs' },
              { id: 'shoulders', label: 'Shoulders' },
              { id: 'arms', label: 'Arms' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMuscle(m.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition ${
                  selectedMuscle === m.id
                    ? 'bg-yellow-400 text-black font-black shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 w-full md:w-auto justify-end">
            <span className="text-xs font-black uppercase text-slate-400 mr-1">Gear:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'barbell', label: 'Barbell' },
              { id: 'dumbbell', label: 'Dumbbell' },
              { id: 'cables', label: 'Cables' },
              { id: 'bodyweight', label: 'Bodyweight' },
            ].map(eq => (
              <button
                key={eq.id}
                onClick={() => setSelectedEquipment(eq.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold uppercase transition ${
                  selectedEquipment === eq.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-black'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
                }`}
              >
                {eq.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExercises.map((ex) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={ex.image}
                    alt={ex.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider shadow">
                      {ex.muscle}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase border border-white/10">
                      {ex.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-black leading-tight">{ex.name}</h3>
                    <p className="text-[11px] text-yellow-400 font-bold mt-0.5">{ex.reps}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4 text-xs">
                  <div>
                    <span className="font-extrabold uppercase text-slate-400 text-[10px] tracking-wider block mb-1">Target Anatomy:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{ex.target}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="font-extrabold uppercase text-yellow-600 dark:text-yellow-400 text-[10px] tracking-wider block mb-1">Coaching Form Cue:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{ex.cues}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/login"
                  className="w-full py-3 rounded-2xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow"
                >
                  <span>Add To My Workout Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}