import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Star, Dumbbell, ShieldCheck, Mail, Phone, Calendar, ArrowRight, Sparkles } from 'lucide-react';
export default function Trainers() {
  const coaches = [
    {
      id: 'john',
      name: 'John Miller',
      role: 'Head Strength Coach',
      specialty: 'CrossFit & Hypertrophy',
      experience: '8+ Years Experience',
      rating: '4.9',
      reviews: 142,
      certifications: ['CSCS Certified', 'CrossFit Level 2', 'Precision Nutrition'],
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop',
      bio: 'Former collegiate athlete specializing in heavy compound mechanics, muscle hypertrophy protocols, and tailored strength periodization.'
    },
    {
      id: 'sarah',
      name: 'Sarah Connor',
      role: 'Powerlifting Specialist',
      specialty: 'Powerlifting & Conditioning',
      experience: '6+ Years Experience',
      rating: '5.0',
      reviews: 98,
      certifications: ['USAPL Senior Coach', 'NASM Master Trainer', 'FMS Level 2'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop',
      bio: 'National powerlifting medalist committed to building unbreakable form, explosive neuromuscular drive, and injury-free peak performance.'
    },
    {
      id: 'marcus',
      name: 'Marcus Vance',
      role: 'Elite Conditioning Coach',
      specialty: 'Calisthenics & Macro Nutrition',
      experience: '10+ Years Experience',
      rating: '4.9',
      reviews: 210,
      certifications: ['ISSA Master Trainer', 'CISSN Sports Nutritionist', 'Gymnastics Coach'],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      bio: 'Bodyweight control specialist who has mentored over 300 athletes to body fat levels below 10% through metabolic conditioning and custom macro charts.'
    }
  ];
  return (
    <div className="pt-32 pb-16 bg-slate-50 dark:bg-[#07090E] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Coaching Staff</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Meet Our <span className="gradient-text-yellow">Champion Mentors</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Every coach at fitS GYM is internationally certified, vetted for clinical biomechanics safety, and dedicated to your personal transformation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coaches.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ y: -8 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-yellow-400 font-black text-xs flex items-center gap-1 border border-white/10 shadow">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{c.rating} ({c.reviews})</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-yellow-400">{c.role}</span>
                    <h3 className="text-2xl font-black">{c.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{c.specialty}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4 text-xs">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{c.bio}</p>
                  <div>
                    <span className="font-extrabold uppercase text-slate-500 dark:text-slate-400 text-[10px] tracking-wider block mb-2">
                      Accreditations & Certifications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-300 font-bold text-[10px]"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/login"
                  className="w-full py-3.5 rounded-2xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Request 1-on-1 Consultation</span>
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