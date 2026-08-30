import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell,
  ShieldCheck,
  Flame,
  Users,
  Trophy,
  Award,
  Check,
  Sparkles,
  ArrowRight,
  Zap,
  Activity,
  Calculator,
  Star,
  ChevronDown,
  Clock,
  HeartPulse,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Tag
} from 'lucide-react';
export default function Home() {
  const [billingCycle, setBillingCycle] = useState('monthly'); 
  const [faqOpen, setFaqOpen] = useState(null);
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('72');
  const [fitnessGoal, setFitnessGoal] = useState('muscle');
  const calculateBMI = () => {
    const hM = Number(height) / 100;
    const wKg = Number(weight);
    if (!hM || !wKg) return { bmi: 0, status: 'N/A', calories: 2000 };
    const bmiVal = (wKg / (hM * hM)).toFixed(1);
    let statusText = 'Normal Weight';
    if (bmiVal < 18.5) statusText = 'Underweight';
    else if (bmiVal >= 25 && bmiVal < 30) statusText = 'Overweight';
    else if (bmiVal >= 30) statusText = 'High Body Mass';
    let cal = 2200;
    if (fitnessGoal === 'weight_loss') cal = Math.round(wKg * 24 - 400);
    else if (fitnessGoal === 'muscle') cal = Math.round(wKg * 28 + 400);
    else cal = Math.round(wKg * 26);
    return { bmi: bmiVal, status: statusText, calories: Math.max(1400, cal) };
  };
  const bmiResult = calculateBMI();
  const standardPlans = [
    {
      name: 'Monthly Pass',
      price: '1,000',
      period: '/ 1 month',
      badge: 'Flexible',
      popular: false,
      description: 'Ideal for short-term fitness goals and flexible training schedules.',
      features: [
        'Full access to gym floor & equipment',
        'Locker room & shower access',
        'Standard fitness assessment',
        'Mobile web dashboard access',
        'Daily attendance tracker'
      ]
    },
    {
      name: 'Quarterly Pass',
      price: '2,500',
      period: '/ 3 months',
      badge: 'Popular',
      popular: false,
      description: 'Great for building consistent training habits and body transformation.',
      features: [
        'All Monthly benefits included',
        'Personalized workout plan',
        'Standard diet consultation',
        'Bi-weekly progress check-ins',
        'Priority customer support'
      ]
    },
    {
      name: 'Half-Yearly Pass',
      price: '4,500',
      period: '/ 6 months',
      badge: 'Best Value',
      popular: true,
      description: 'The golden middle ground for serious physique transformation.',
      features: [
        'All Quarterly benefits included',
        'Custom macro diet chart (Calories/Proteins)',
        'Assigned personal certified trainer',
        'Direct trainer in-app messaging',
        '1-on-1 form check sessions'
      ]
    }
  ];
  const yearlyPlans = [
    {
      name: 'Yearly Standard Pass',
      price: '8,000',
      period: '/ 12 months',
      effective: '₹667 / month',
      badge: 'Save ₹4,000',
      popular: false,
      description: 'Full 1-year unlimited access for dedicated athletes wanting maximum value.',
      features: [
        'Full 365-day access to gym & heavy iron',
        'Locker & shower facilities',
        'Digital attendance streak tracking',
        'Official tax PDF invoice generation',
        'Free gym shaker & athlete starter kit'
      ]
    },
    {
      name: 'Yearly Gold VIP Pass',
      price: '12,000',
      period: '/ 12 months',
      effective: '₹1,000 / month',
      badge: 'Most Popular VIP',
      popular: true,
      description: 'The complete all-inclusive transformation experience with dedicated 1-on-1 coaching.',
      features: [
        'All Standard Yearly benefits included',
        'Dedicated Personal Certified Coach',
        'Custom macro meal plans (updated monthly)',
        'Direct 24/7 in-app coach messaging',
        'Bi-weekly body fat caliper analysis',
        '12 complimentary guest passes'
      ]
    },
    {
      name: 'Yearly Platinum Elite',
      price: '16,000',
      period: '/ 12 months',
      effective: '₹1,333 / month',
      badge: 'All-Inclusive',
      popular: false,
      description: 'Executive VIP package with private locker, sauna, recovery suite, and unlimited coaching.',
      features: [
        'All Gold VIP benefits included',
        'Private reserved locker & laundry service',
        'Unlimited sauna & recovery lounge access',
        'Quarterly sports nutrition & progress review',
        'Unlimited VIP guest passes'
      ]
    }
  ];
  const currentPlans = billingCycle === 'monthly' ? standardPlans : yearlyPlans;
  const coaches = [
    {
      name: 'John Miller',
      specialty: 'CrossFit & Hypertrophy',
      experience: '8+ Yrs Exp',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Sarah Connor',
      specialty: 'Powerlifting & Conditioning',
      experience: '6+ Yrs Exp',
      rating: '5.0',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Marcus Vance',
      specialty: 'Calisthenics & Macro Nutrition',
      experience: '10+ Yrs Exp',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
    }
  ];
  const gallery = [
    {
      title: 'Heavy Free Weights Zone',
      tag: 'Strength',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Cardio & Endurance Arena',
      tag: 'Stamina',
      img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Functional CrossFit Zone',
      tag: 'Athletics',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Power Racks & Deadlift Platforms',
      tag: 'Powerlifting',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop'
    }
  ];
  const faqs = [
    {
      q: 'How does daily attendance marking work?',
      a: 'Once you log into your Athlete Portal, tap the prominent "Mark Attendance" button once daily. It records your check-in, increments your streak counter, and syncs directly with the gym administration.'
    },
    {
      q: 'How do I receive my nutrition macros and workout regimen?',
      a: 'When an administrator assigns a certified coach to your profile, your coach creates customized caloric targets, macro splits (Protein, Carbs, Fats), and daily exercise routines visible right in your dashboard.'
    },
    {
      q: 'Can I download official tax invoices for my membership?',
      a: 'Yes! Both members and administrators have 1-click access to download official, computer-generated PDF receipts with itemized breakdown and payment clearance status.'
    },
    {
      q: 'How do I communicate with my assigned personal coach?',
      a: 'Your portal includes a live in-app direct messaging system. You can send questions, report PRs, or ask for meal plan tweaks directly to your coach anytime.'
    }
  ];
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center pt-24 sm:pt-[7rem] pb-12 border-b border-slate-200 dark:border-white/10 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-yellow-500/10 dark:bg-yellow-400/20 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-widest backdrop-blur-md"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <Sparkles className="w-4 h-4" />
                <span>#1 Premium Fitness Destination</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[1.12]"
              >
                Forge Your <br />
                <span className="gradient-text-yellow drop-shadow-md">Peak Body</span>.
                <br />
                <span className="text-slate-800 dark:text-slate-200">Elevate Your Mind.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed"
              >
                Experience world-class heavy iron, elite certified coaches, smart macro nutrition trackers, and personalized member portals.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:from-yellow-300 hover:to-amber-300 shadow-xl shadow-yellow-400/25 transition-all flex items-center justify-center gap-2.5"
                  >
                    <span>Enter Member Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <a
                    href="#calculator"
                    className="w-full sm:w-auto px-7 py-4 rounded-full bg-slate-200 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                    <span>Calculate Macros</span>
                  </a>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-white/10 max-w-lg mx-auto lg:mx-0"
              >
                <div>
                  <h4 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">500+</h4>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Active Athletes</p>
                </div>
                <div>
                  <h4 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">15+</h4>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Coaches</p>
                </div>
                <div>
                  <h4 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">24/7</h4>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Club Access</p>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/15 group">
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
                  alt="Athlete Training"
                  className="w-full h-72 sm:h-80 lg:h-[350px] object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black flex-shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[11px] uppercase text-slate-900 dark:text-white">State-of-the-Art Gear</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Hammer Strength & Eleiko Olympic</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase">
                    Open Now
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="about" className="py-20 bg-white dark:bg-[#07090E] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
                  alt="fitS Gym Weight Arena"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-yellow-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>ISO Certified Olympic Arena</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-black/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black flex-shrink-0">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase text-slate-900 dark:text-white">10,000+ Sq Ft Floor</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Eleiko & Hammer Strength Equipped</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                    24/7 Access
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10 h-32 group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&auto=format&fit=crop"
                    alt="Cardio Suite"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-black uppercase text-white tracking-wider">Cardio & HIIT Deck</span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10 h-32 group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop"
                    alt="CrossFit Arena"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-black uppercase text-white tracking-wider">CrossFit & Power Racks</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
                <Dumbbell className="w-4 h-4" />
                <span>About fitS GYM</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
                We Build More Than Just <span className="gradient-text-yellow">Muscles</span>. We Build Champions.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                fitS GYM provides an uncompromising, elite training environment designed for athletes of all levels. From calibrated powerlifting bars to customized nutrition charts and in-app coach messaging, every detail is engineered for your ultimate physique transformation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Flame, title: 'Custom Macro Diets', desc: 'Targeted caloric splits for lean bulk & fat loss.' },
                  { icon: Users, title: 'Certified Mentors', desc: 'Direct 1-on-1 coaching & messaging in portal.' },
                  { icon: Activity, title: 'Smart Attendance', desc: 'One-tap daily check-in with streak counter.' },
                  { icon: ShieldCheck, title: 'Instant Invoicing', desc: 'Download official PDF tax receipts.' }
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-yellow-400/40 transition shadow-sm"
                  >
                    <div className="p-2 rounded-xl bg-yellow-500/10 dark:bg-yellow-400/15 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-xs uppercase text-slate-900 dark:text-white">{f.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-50 dark:bg-[#0A0E17] border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              Explore Our <span className="gradient-text-yellow">Training Zones</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Engineered for hypertrophy, functional endurance, and powerlifting.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/10 group h-64"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <h4 className="font-bold text-sm mt-1 text-white">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="calculator" className="py-20 bg-white dark:bg-[#07090E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Smart Nutrition Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Interactive <span className="gradient-text-yellow">BMI & Macro</span> Calculator
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">
              Calculate your body mass index and daily caloric target tailored to your physique objective.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">Physique Goal</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'weight_loss', label: 'Fat Loss', icon: Flame },
                    { id: 'muscle', label: 'Hypertrophy', icon: Dumbbell },
                    { id: 'maintenance', label: 'Maintenance', icon: HeartPulse }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setFitnessGoal(g.id)}
                      className={`p-3 rounded-2xl border text-xs font-bold uppercase flex flex-col items-center gap-1.5 transition-all ${
                        fitnessGoal === g.id
                          ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-md'
                          : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                      }`}
                    >
                      <g.icon className="w-4 h-4" />
                      <span>{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-yellow-400/20 via-amber-500/15 to-slate-900 dark:to-[#07090E] border border-yellow-400/40 text-center space-y-6 shadow-xl"
            >
              <div>
                <span className="text-xs font-black uppercase text-yellow-600 dark:text-yellow-400 tracking-widest block mb-1">Calculated BMI</span>
                <h3 className="text-5xl font-black text-slate-900 dark:text-white">{bmiResult.bmi}</h3>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-yellow-400/30 text-yellow-800 dark:text-yellow-300 font-bold text-xs">
                  {bmiResult.status}
                </span>
              </div>
              <div className="pt-4 border-t border-slate-300 dark:border-white/10">
                <span className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest block mb-1">Recommended Daily Intake</span>
                <h4 className="text-3xl font-black text-yellow-600 dark:text-yellow-400">{bmiResult.calories} <span className="text-sm font-bold text-slate-900 dark:text-white">kcal</span></h4>
              </div>
              <Link
                to="/login"
                className="w-full py-3.5 rounded-2xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>Save To Member Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20 bg-slate-50 dark:bg-[#0A0E17] border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Transparent Memberships</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Membership <span className="gradient-text-yellow">Tiers</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">
              {billingCycle === 'monthly'
                ? 'Showing standard flexible duration plans (1, 3, and 6 months).'
                : 'Showing exclusive 12-Month Annual Saver packages with maximum discounts.'}
            </p>
            <div className="inline-flex items-center p-1.5 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 mt-6 shadow-sm">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Standard Plans (1 - 6 Mos)
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Annual VIP Pass (12 Mos)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl glass-card ${
                  plan.popular
                    ? 'border-yellow-400 ring-2 ring-yellow-400/40 shadow-2xl'
                    : ''
                }`}
              >
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-black text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{plan.badge}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 min-h-[32px]">{plan.description}</p>
                  <div className="my-6 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">₹</span>
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight ml-1">{plan.price}</span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">{plan.period}</span>
                    </div>
                    {plan.effective && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-extrabold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Effective rate: {plan.effective}</span>
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <div className="p-0.5 rounded-full bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to="/login"
                    className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center transition-all ${
                      plan.popular
                        ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-400/20'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-yellow-400 hover:text-black'
                    }`}
                  >
                    Select {plan.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="coaches" className="py-20 bg-white dark:bg-[#07090E] border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Mentorship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Train With <span className="gradient-text-yellow">Elite Coaches</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">
              Direct guidance, custom workout splits, and in-app chat with champion trainers.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 group shadow-md"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-yellow-400 font-extrabold text-xs flex items-center gap-1 border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{c.rating}</span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase">{c.name}</h4>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 font-bold mt-0.5">{c.specialty}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                      {c.experience}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-slate-50 dark:bg-[#0A0E17] border-t border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Frequently Asked <span className="gradient-text-yellow">Questions</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">Everything you need to know about the fitS GYM ecosystem.</p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-yellow-500 dark:text-yellow-400 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-transparent p-8 sm:p-14 rounded-3xl border border-yellow-400/30 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-xl shadow-2xl"
          >
            <div className="max-w-2xl space-y-4 text-center lg:text-left">
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
                Claim your peak physical <span className="gradient-text-yellow">transformation</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-base">
                Join 500+ athletes today. Access your personal workouts, daily attendance streak, and PDF receipts.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="px-9 py-4 rounded-full bg-yellow-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-2xl shadow-yellow-400/30 flex-shrink-0 flex items-center gap-2"
              >
                <span>Launch Member Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}