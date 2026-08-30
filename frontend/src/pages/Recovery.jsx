import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartPulse, Droplets, Flame, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Clock, Shield } from 'lucide-react';
export default function Recovery() {
  const amenities = [
    {
      title: 'Finnish Dry Sauna',
      temp: '85°C - 95°C',
      benefit: 'Cardiovascular Health & Detoxification',
      desc: 'High-heat dry sauna accelerates heat shock protein production, dilates blood vessels, and enhances muscle recovery post-heavy training.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop',
      features: ['Infrared Cedar Wood Interior', 'Aromatherapy Steam Infusion', '15-min Sessions']
    },
    {
      title: 'Ice Bath & Cold Plunge',
      temp: '4°C - 7°C',
      benefit: 'Inflammation & DOMS Reduction',
      desc: 'Submersion in ice baths constricts peripheral vasculature, reduces lactic acid pooling, and triggers norepinephrine release for mental clarity.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
      features: ['Constant Filtration & Chilling', 'Ergonomic Single Athlete Tubs', '3-5 min Immersion Protocols']
    },
    {
      title: 'Normatec Compression Lounge',
      temp: 'Dynamic Pulse',
      benefit: 'Lymphatic Drainage & Circulation',
      desc: 'Pneumatic pulse massage boots enhance venous return and reduce leg fatigue after intense squat and conditioning days.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop',
      features: ['Full Leg & Hip Boots', 'Custom Pressure Profiles', 'Relaxation Recliners with Noise-Canceling Audio']
    },
    {
      title: 'Sports Physiotherapy & Massage',
      temp: 'Targeted Rehab',
      benefit: 'Joint Mobilization & Trigger Point Release',
      desc: 'Certified sports physiotherapists on-site to address muscular imbalances, tendonitis, and range-of-motion limitations.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      features: ['Dry Needling & Cupping', 'Deep Tissue Sports Massage', 'Pre-hab Mobility Screenings']
    }
  ];
  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-[#07090E] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Optimal Recovery Science</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Recovery & <span className="gradient-text-yellow">Wellness Suite</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Training breaks muscle down; recovery builds it back stronger. Experience our Olympic-grade hydrotherapy, sauna, and compression amenities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {amenities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider shadow">
                      {item.temp}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-yellow-400">{item.benefit}</span>
                    <h3 className="text-2xl font-black">{item.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4 text-xs">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/login"
                  className="w-full py-3.5 rounded-2xl bg-yellow-400 text-black font-black text-xs uppercase tracking-wider hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow"
                >
                  <span>Book Recovery Session</span>
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