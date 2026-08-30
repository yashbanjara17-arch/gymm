import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Heart, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-[#05070B] text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-300 text-black flex items-center justify-center font-black shadow-md shadow-yellow-400/25">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight uppercase">
                fitS<span className="text-yellow-400">GYM</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering athletes to achieve their peak physical and mental potential through Olympic-grade equipment, tailored macro nutrition charts, and structured strength mentorship.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-yellow-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open 24 Hours • 365 Days</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-black text-xs tracking-wider uppercase mb-4">Fitness & Training</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/programs" className="hover:text-yellow-400 transition">Specialized Programs</Link></li>
              <li><Link to="/workouts" className="hover:text-yellow-400 transition">Exercise Vault & 1RM</Link></li>
              <li><Link to="/transformations" className="hover:text-yellow-400 transition">Transformation Hall</Link></li>
              <li><Link to="/recovery" className="hover:text-yellow-400 transition">Recovery & Sauna Suite</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black text-xs tracking-wider uppercase mb-4">Coaching & Macros</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/trainers" className="hover:text-yellow-400 transition">Certified Coaches</Link></li>
              <li><Link to="/nutrition" className="hover:text-yellow-400 transition">Macro & BMR Calculator</Link></li>
              <li><a href="/#pricing" className="hover:text-yellow-400 transition">Membership Tiers</a></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact & Location</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black text-xs tracking-wider uppercase mb-4">Headquarters</h4>
            <div className="space-y-3 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>124 Fitness Boulevard, Health District</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>support@fitsgym.com</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} fitS GYM Performance Club. All Rights Reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for elite athletic performance.
          </p>
        </div>
      </div>
    </footer>
  );
}