import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ShieldCheck, Flame, Users, Trophy, Award, Check, Sparkles, ArrowRight, Zap, Activity } from 'lucide-react';

export default function Home() {
  const plans = [
    {
      name: 'Monthly Pass',
      price: '1,000',
      period: '/ month',
      description: 'Ideal for short-term fitness goals and flexible training schedules.',
      popular: false,
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
      description: 'Great for building consistent training habits and body transformation.',
      popular: false,
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
      description: 'The golden middle ground for serious physique transformation.',
      popular: true,
      badge: 'Best Value',
      features: [
        'All Quarterly benefits included',
        'Custom macro diet chart (Calories/Proteins)',
        'Assigned personal certified trainer',
        'Direct trainer in-app messaging',
        '1-on-1 form check sessions'
      ]
    },
    {
      name: 'Yearly Gold',
      price: '8,000',
      period: '/ year',
      description: 'Ultimate all-inclusive VIP pass for committed gym warriors.',
      popular: false,
      features: [
        'All Half-Yearly benefits included',
        'Unlimited VIP trainer guidance',
        'Customized nutrition & meal plans',
        'Complimentary guest passes',
        'Instant digital PDF invoices'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-[90vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-20">
        <div className="max-w-5xl mx-auto z-10 flex flex-col items-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to fitS GYM Elite Club</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
            Transform Your <span className="text-yellow-400">Body</span>
            <br />
            Elevate Your <span className="text-white">Mind</span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-3xl mb-10 leading-relaxed">
            Join the most premium fitness destination. World-class equipment, certified trainers, and personalized diet plans to smash your fitness goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-black font-extrabold text-sm uppercase tracking-wider hover:bg-yellow-300 shadow-xl shadow-yellow-400/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Access Member / Staff Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/80 border border-slate-700 text-white font-bold text-sm uppercase tracking-wider hover:bg-slate-800 transition duration-300"
            >
              Explore Membership Tiers
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10 w-full">
            <div className="text-center">
              <h3 className="text-3xl font-black text-yellow-400">500+</h3>
              <p className="text-xs uppercase font-bold text-slate-400 mt-1">Active Athletes</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-yellow-400">15+</h3>
              <p className="text-xs uppercase font-bold text-slate-400 mt-1">Certified Coaches</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-yellow-400">100%</h3>
              <p className="text-xs uppercase font-bold text-slate-400 mt-1">Tailored Diets</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-yellow-400">24/7</h3>
              <p className="text-xs uppercase font-bold text-slate-400 mt-1">Club Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-[#0E131F] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
                alt="Gym Floor"
                className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 object-cover w-full h-[460px]"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-400 text-black">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Recognized #1 Fitness Center</h4>
                    <p className="text-xs text-slate-400">Equipped with top-tier international standard gear</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
                <Dumbbell className="w-4 h-4" />
                <span>About fitS GYM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
                We Build More Than Just <span className="text-yellow-500 dark:text-yellow-400">Muscles</span>. We Build Champions.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                fitS GYM was established with a singular vision: to create an uncompromised training atmosphere where beginners and elite athletes alike push past their perceived limits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Flame className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Custom Macro Diets</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Personalized calorie, protein & fat tracking for real results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Users className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Certified Mentors</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Direct 1-on-1 coaching & messaging in your portal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Activity className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Smart Attendance</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">One-tap daily check-in with streak history.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Instant Invoicing</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Generate and download official PDF tax invoices anytime.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Membership Plans Section */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-[#0B0F17] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" />
              <span>Transparent Memberships</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Choose Your <span className="text-yellow-500 dark:text-yellow-400">Membership</span> Plan
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-base">
              No hidden fees. Premium facility access, personal fitness portal, and top-tier coaching included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-7 rounded-2xl bg-white dark:bg-slate-900 border ${
                  plan.popular
                    ? 'border-yellow-400 shadow-xl shadow-yellow-400/10 dark:shadow-yellow-400/5 ring-2 ring-yellow-400'
                    : 'border-slate-200 dark:border-slate-800'
                } transition-all duration-300 hover:-translate-y-1`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-black text-xs font-extrabold uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 min-h-[32px]">{plan.description}</p>

                  <div className="my-6">
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-slate-900 dark:text-white">₹</span>
                      <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight ml-1">{plan.price}</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1.5">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <div className="p-0.5 rounded-full bg-yellow-400/20 text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    to="/login"
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all ${
                      plan.popular
                        ? 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-yellow-400 hover:text-black'
                    }`}
                  >
                    Select {plan.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section id="features" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent p-8 sm:p-12 rounded-3xl border border-yellow-400/20 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4 text-center lg:text-left">
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Ready to take control of your <span className="text-yellow-400">fitness journey</span>?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                Log into your personalized portal to check workouts, mark attendance, download your fee invoice, and connect directly with your coach.
              </p>
            </div>
            <Link
              to="/login"
              className="px-8 py-4 rounded-full bg-yellow-400 text-black font-black text-sm uppercase tracking-wider hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-yellow-400/20 flex-shrink-0"
            >
              Sign In To Portal Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
