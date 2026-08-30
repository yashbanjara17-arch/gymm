import React, { useState, useEffect } from 'react';
import { trainerAPI } from '../../services/api';
import Modal from '../../components/Modal';
import {
  Users,
  Dumbbell,
  Flame,
  MessageSquare,
  Send,
  Edit,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  Sparkles
} from 'lucide-react';

export default function TrainerDashboard() {
  const [loading, setLoading] = useState(true);
  const [trainer, setTrainer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notification, setNotification] = useState({ text: '', type: '' });

  // Plan editing form
  const [planForm, setPlanForm] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    meals: '',
    workout_plan: ''
  });

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await trainerAPI.getDashboard();
      if (res.data.success) {
        setTrainer(res.data.data.trainer);
        setCustomers(res.data.data.customers || []);
      }
    } catch (err) {
      showNotice(err.response?.data?.message || 'Error loading dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const showNotice = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification({ text: '', type: '' }), 4000);
  };

  // Open Plan Modal
  const openPlanModal = (cust) => {
    setSelectedCustomer(cust);
    setPlanForm({
      calories: cust.calories || 0,
      protein: cust.protein || 0,
      carbs: cust.carbs || 0,
      fats: cust.fats || 0,
      meals: cust.meals || '',
      workout_plan: cust.workout_plan || ''
    });
    setIsPlanModalOpen(true);
  };

  // Save Diet & Workout Plans
  const handleSavePlans = async (e) => {
    e.preventDefault();
    try {
      const res = await trainerAPI.updatePlans(selectedCustomer._id, planForm);
      if (res.data.success) {
        showNotice('Diet and workout plans updated successfully!');
        setIsPlanModalOpen(false);
        fetchDashboard();
      }
    } catch (err) {
      showNotice(err.response?.data?.message || 'Failed to update plans', 'error');
    }
  };

  // Open Chat with Client
  const openChatModal = async (cust) => {
    setSelectedCustomer(cust);
    setIsChatModalOpen(true);
    try {
      const res = await trainerAPI.getMessages(cust._id);
      if (res.data.success) {
        setMessages(res.data.data || []);
      }
    } catch (err) {
      showNotice('Failed to load message history', 'error');
    }
  };

  // Send Message to Client
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await trainerAPI.sendMessage(selectedCustomer._id, { message: newMessage });
      if (res.data.success) {
        setMessages([...messages, res.data.data]);
        setNewMessage('');
      }
    } catch (err) {
      showNotice('Failed to send message', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Notification */}
      {notification.text && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-md ${
          notification.type === 'error'
            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
        }`}>
          <span>{notification.text}</span>
          <button onClick={() => setNotification({ text: '', type: '' })} className="font-bold text-xs uppercase">Dismiss</button>
        </div>
      )}

      {/* Trainer Profile Overview Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 shadow-xl text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-2xl shadow-lg shadow-yellow-400/20">
              <Dumbbell className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 font-bold text-[11px] uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Certified Coach</span>
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight">{trainer?.name}</h1>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                @{trainer?.username} • Specialization: <span className="text-slate-200">{trainer?.specialization}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6">
            <div className="text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Assigned Clients</span>
              <h3 className="text-2xl font-black text-yellow-400">{customers.length}</h3>
            </div>
            <div className="text-left ml-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Monthly Compensation</span>
              <h3 className="text-2xl font-black text-emerald-400">₹{(trainer?.salary || 0).toLocaleString('en-IN')}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Clients Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Assigned <span className="text-yellow-400">Athletes</span>
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor client workout routines, calorie targets & communicate in real time
          </p>
        </div>
      </div>

      {/* Clients Grid */}
      {customers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Clients Assigned Yet</h3>
          <p className="text-xs text-slate-400 mt-1">When an admin assigns members to you, they will appear right here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((cust) => (
            <div
              key={cust._id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">{cust.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{cust.phone}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 font-bold text-xs">
                    {cust.membership}
                  </span>
                </div>

                {/* Diet & Macros Overview */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">Diet Plan:</span>
                    <span className="font-semibold text-yellow-500">{cust.diet_plan}</span>
                  </div>

                  {cust.diet_plan !== 'None' && (
                    <div className="grid grid-cols-4 gap-1 text-center pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="p-1 rounded bg-white dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Kcal</span>
                        <span className="font-bold text-slate-900 dark:text-white">{cust.calories || 0}</span>
                      </div>
                      <div className="p-1 rounded bg-white dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Pro</span>
                        <span className="font-bold text-slate-900 dark:text-white">{cust.protein || 0}g</span>
                      </div>
                      <div className="p-1 rounded bg-white dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Carb</span>
                        <span className="font-bold text-slate-900 dark:text-white">{cust.carbs || 0}g</span>
                      </div>
                      <div className="p-1 rounded bg-white dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Fat</span>
                        <span className="font-bold text-slate-900 dark:text-white">{cust.fats || 0}g</span>
                      </div>
                    </div>
                  )}

                  {cust.meals && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Meal Suggestions:</span>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2 italic">{cust.meals}</p>
                    </div>
                  )}
                </div>

                {/* Workout Routine Preview */}
                <div className="mt-4 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Workout Routine:</span>
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg">
                    {cust.workout_plan || 'No workout regimen assigned yet.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => openPlanModal(cust)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-yellow-400 hover:text-black font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Plan</span>
                </button>

                <button
                  onClick={() => openChatModal(cust)}
                  className="py-2.5 px-3 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: EDIT DIET & WORKOUT PLANS */}
      <Modal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} title={`Customize Program: ${selectedCustomer?.name}`}>
        <form onSubmit={handleSavePlans} className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <h4 className="font-bold text-yellow-500 uppercase tracking-wider">Macros & Caloric Targets</h4>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400">Calories (kcal)</label>
                <input
                  type="number"
                  value={planForm.calories}
                  onChange={(e) => setPlanForm({ ...planForm, calories: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400">Protein (g)</label>
                <input
                  type="number"
                  value={planForm.protein}
                  onChange={(e) => setPlanForm({ ...planForm, protein: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400">Carbs (g)</label>
                <input
                  type="number"
                  value={planForm.carbs}
                  onChange={(e) => setPlanForm({ ...planForm, carbs: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400">Fats (g)</label>
                <input
                  type="number"
                  value={planForm.fats}
                  onChange={(e) => setPlanForm({ ...planForm, fats: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Meal Suggestions & Nutrition Rules</label>
              <textarea
                rows={3}
                placeholder="Breakfast, Pre-workout, Post-workout, Dinner..."
                value={planForm.meals}
                onChange={(e) => setPlanForm({ ...planForm, meals: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Workout Regimen & Split</label>
            <textarea
              rows={4}
              placeholder="e.g. Day 1: Bench Press 4x8, Incline Dumbbell 3x10...&#10;Day 2: Deadlifts, Pull-ups..."
              value={planForm.workout_plan}
              onChange={(e) => setPlanForm({ ...planForm, workout_plan: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsPlanModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold uppercase hover:bg-yellow-300 shadow-md"
            >
              Save Nutrition & Workout
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: LIVE CHAT WITH CLIENT */}
      <Modal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} title={`Direct Messaging: ${selectedCustomer?.name}`}>
        <div className="flex flex-col h-[450px]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center text-slate-400 text-xs">
                No messages yet. Send a motivating note or instructions below!
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender === 'trainer';
                return (
                  <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-xs ${
                      isMe
                        ? 'bg-yellow-400 text-black font-medium rounded-br-none shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-slate-300 dark:border-slate-700'
                    }`}>
                      <p className="break-words">{msg.message}</p>
                      <span className={`block text-[9px] mt-1 text-right ${isMe ? 'text-black/60' : 'text-slate-400'}`}>
                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Type advice or guidance..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold text-xs uppercase hover:bg-yellow-300 transition flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
