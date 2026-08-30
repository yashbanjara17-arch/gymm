import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Dumbbell, Sparkles } from 'lucide-react';
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', goal: 'general' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '', goal: 'general' });
    }, 5000);
  };
  return (
    <div className="pt-32 pb-16 bg-slate-50 dark:bg-[#07090E] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs font-black uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Facility Location & Support</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Connect With <span className="gradient-text-yellow">fitS GYM</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Have questions about memberships, private coaching, or trial guest passes? Send us a note or visit our Olympic training floor.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg">
              <h3 className="font-black text-xl uppercase text-slate-900 dark:text-white">
                Club Information
              </h3>
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Main Headquarters & Facility</h4>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">124 Fitness Boulevard, Health & Sports District, New Delhi, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Phone & WhatsApp Support</h4>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">+91 98765 43210 (24/7 Member Desk)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Email Inquiries</h4>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">support@fitsgym.com / memberships@fitsgym.com</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="font-extrabold uppercase text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>Operating Timings</span>
                </h4>
                <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between"><span>Monday - Friday:</span> <span className="font-bold text-slate-900 dark:text-white">5:00 AM - 11:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday:</span> <span className="font-bold text-slate-900 dark:text-white">6:00 AM - 10:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday:</span> <span className="font-bold text-yellow-600 dark:text-yellow-400">7:00 AM - 8:00 PM</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl shadow-lg">
            <h3 className="font-black text-xl uppercase text-slate-900 dark:text-white mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Our coaching coordinator will get back to you within 2 hours.
            </p>
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-black text-lg text-slate-900 dark:text-white">Message Dispatched!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Thank you for reaching out. We look forward to seeing you on the training floor!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Inquiry Topic</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-semibold"
                    >
                      <option value="general">Membership Rates & Tour</option>
                      <option value="trainer">1-on-1 Personal Trainer</option>
                      <option value="trial">Free 1-Day Trial Pass</option>
                      <option value="corporate">Corporate Group Fitness</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Message & Goals</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your fitness background and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-yellow-400 text-black font-black uppercase tracking-wider hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}