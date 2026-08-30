import React from 'react';
import { Dumbbell, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-bold">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight uppercase">
                fitS<span className="text-yellow-400">GYM</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering individuals to achieve their absolute peak physical and mental potential through science-backed fitness training and elite facilities.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#about" className="hover:text-yellow-400 transition">About Our Facility</a></li>
              <li><a href="/#pricing" className="hover:text-yellow-400 transition">Membership Tiers</a></li>
              <li><a href="/#features" className="hover:text-yellow-400 transition">Equipment & Amenities</a></li>
              <li><a href="/login" className="hover:text-yellow-400 transition">Member & Staff Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Membership Plans</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-300">Monthly Pass:</span> ₹1,000 / mo</li>
              <li><span className="text-slate-300">Quarterly Pass:</span> ₹2,500 / 3 mos</li>
              <li><span className="text-slate-300">Half-Yearly Pass:</span> ₹4,500 / 6 mos</li>
              <li><span className="text-slate-300">Yearly Gold:</span> ₹8,000 / yr</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
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

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} fitS GYM. Built with MERN Stack (React, Express & MongoDB).</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for elite gym performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
