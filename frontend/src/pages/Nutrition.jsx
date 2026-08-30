import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Flame, HeartPulse, Dumbbell, Apple, Droplets, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
export default function Nutrition() {
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('178');
  const [age, setAge] = useState('26');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.55'); 
  const [goal, setGoal] = useState('muscle'); 
  const calculateNutrition = () => {
    const w = Number(weight) || 70;
    const h = Number(height) || 170;
    const a = Number(age) || 25;
    const act = Number(activity) || 1.55;
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr += gender === 'male' ? 5 : -161;
    let tdee = Math.round(bmr * act);
    let targetCalories = tdee;
    if (goal === 'cut') targetCalories -= 450;
    else if (goal === 'muscle') targetCalories += 400;
    const proteinGrams = Math.round(w * (goal === 'cut' ? 2.2 : 2.0));
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    const remainingCaloriesForCarbs = targetCalories - (proteinGrams * 4) - (fatGrams * 9);
    const carbGrams = Math.max(50, Math.round(remainingCaloriesForCarbs / 4));
    const waterLiters = (w * 0.04).toFixed(1);
    return { bmr: Math.round(bmr), tdee, targetCalories, proteinGrams, fatGrams, carbGrams, waterLiters };
  };
  const results = calculateNutrition();
  return (
    <div className="pt-32 pb-16 bg-slate-50 dark:bg-[#07090E] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Apple className="w-3.5 h-3.5" />
            <span>Nutrition & Diet Science</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Precision <span className="gradient-text-yellow">Macro Hub</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Abs are built in the kitchen and forged in the gym. Use our clinical nutrition calculator to establish your exact baseline targets.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl space-y-5 shadow-lg">
            <h3 className="font-black text-base uppercase text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-yellow-500" />
              <span>Biometric Parameters</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-xs"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Age (Yrs)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Daily Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-xs"
              >
                <option value="1.2">Sedentary (Desk Job, little exercise)</option>
                <option value="1.375">Lightly Active (1-3 days/week gym)</option>
                <option value="1.55">Moderately Active (3-5 days/week intense training)</option>
                <option value="1.725">Very Active (6-7 days/week heavy lifter)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Transformation Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cut', label: 'Fat Loss', icon: Flame },
                  { id: 'muscle', label: 'Lean Bulk', icon: Dumbbell },
                  { id: 'maintain', label: 'Maintain', icon: HeartPulse }
                ].map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold uppercase flex flex-col items-center gap-1 transition ${
                      goal === g.id
                        ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <g.icon className="w-3.5 h-3.5" />
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 p-7 rounded-3xl bg-gradient-to-br from-yellow-400/20 via-amber-500/15 to-slate-900 dark:to-[#07090E] border border-yellow-400/40 text-center space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-black uppercase text-yellow-600 dark:text-yellow-400 tracking-widest block mb-1">
                Target Daily Energy Intake
              </span>
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">
                {results.targetCalories} <span className="text-lg font-bold">kcal</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                BMR: {results.bmr} kcal • Maintenance (TDEE): {results.tdee} kcal
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-300 dark:border-white/10">
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] font-black uppercase text-yellow-600 dark:text-yellow-400 block">Protein</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{results.proteinGrams}g</h4>
                <span className="text-[9px] text-slate-400 block">{(results.proteinGrams * 4)} kcal</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 block">Carbs</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{results.carbGrams}g</h4>
                <span className="text-[9px] text-slate-400 block">{(results.carbGrams * 4)} kcal</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 block">Fats</span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{results.fatGrams}g</h4>
                <span className="text-[9px] text-slate-400 block">{(results.fatGrams * 9)} kcal</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-white/50 dark:bg-white/5 text-xs flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-bold"><Droplets className="w-4 h-4 text-cyan-500" /> Daily Water Target:</span>
              <span className="font-black text-slate-900 dark:text-white">{results.waterLiters} Liters</span>
            </div>
            <Link
              to="/login"
              className="w-full py-3.5 rounded-2xl bg-yellow-400 text-black font-black text-xs uppercase tracking-wider hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Sync With My Personal Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}