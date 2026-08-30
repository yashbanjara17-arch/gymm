import React, { useState, useEffect } from 'react';
import { customerAPI, invoiceAPI } from '../../services/api';
import StatsCard from '../../components/StatsCard';
import Modal from '../../components/Modal';
import {
  User,
  Dumbbell,
  Flame,
  CalendarCheck,
  CheckCircle,
  FileText,
  IndianRupee,
  MessageSquare,
  Send,
  Sparkles,
  CreditCard,
  Phone,
  Activity,
  AlertCircle,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
export default function CustomerDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notification, setNotification] = useState({ text: '', type: '' });
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await customerAPI.getDashboard();
      if (res.data.success) {
        setDashboardData(res.data.data);
        setMessages(res.data.data.messages || []);
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
  const handleMarkAttendance = async () => {
    try {
      const res = await customerAPI.markAttendance();
      if (res.data.success) {
        confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
        showNotice(res.data.message || 'Attendance marked as present for today!');
        fetchDashboard();
      }
    } catch (err) {
      showNotice(err.response?.data?.message || 'Failed to mark attendance', 'error');
    }
  };
  const handleMakePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await customerAPI.makePayment({ payment: paymentAmount });
      if (res.data.success) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        showNotice(res.data.message || 'Payment cleared successfully!');
        setIsPaymentModalOpen(false);
        setPaymentAmount('');
        fetchDashboard();
      }
    } catch (err) {
      showNotice(err.response?.data?.message || 'Failed to process payment', 'error');
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const res = await customerAPI.sendMessage({ message: newMessage });
      if (res.data.success) {
        setMessages([...messages, res.data.data]);
        setNewMessage('');
      }
    } catch (err) {
      showNotice(err.response?.data?.message || 'Failed to send message', 'error');
    }
  };
  const customer = dashboardData?.customer;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8 min-h-screen">
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
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 shadow-xl text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-2xl shadow-lg shadow-yellow-400/20">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 font-bold text-[11px] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Athlete Portal</span>
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight">{customer?.name}</h1>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Phone: +91 {customer?.phone} • Tier: <span className="text-yellow-400 font-bold">{customer?.membership}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {customer && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await invoiceAPI.downloadInvoice(customer._id, customer.name);
                    showNotice('Invoice downloaded successfully!');
                  } catch (err) {
                    showNotice('Failed to download invoice', 'error');
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-slate-700 transition flex items-center gap-2 border border-slate-700 hover:scale-105"
              >
                <FileText className="w-4 h-4 text-yellow-400" />
                <span>Download Invoice</span>
              </button>
            )}
            {dashboardData?.hasMarkedToday ? (
              <div className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Attended Today</span>
              </div>
            ) : (
              <button
                onClick={handleMarkAttendance}
                className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-black text-xs uppercase tracking-wider hover:bg-yellow-300 shadow-md shadow-yellow-400/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Mark Attendance</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Plan Membership Fee"
          value={`₹${(dashboardData?.planPrice || 0).toLocaleString('en-IN')}`}
          subtitle={`${customer?.membership || 'Monthly'} Tier`}
          icon={IndianRupee}
          color="yellow"
        />
        <StatsCard
          title="Amount Cleared"
          value={`₹${(customer?.amount_paid || 0).toLocaleString('en-IN')}`}
          subtitle="Payment Cleared"
          icon={CheckCircle}
          color="green"
        />
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Balance Pending Due</p>
            <h3 className={`text-3xl font-black mt-2 tracking-tight ${customer?.amount_due > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
              ₹{(customer?.amount_due || 0).toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {customer?.amount_due > 0 ? 'Pending payment balance' : 'Zero balance due'}
            </p>
          </div>
          {customer?.amount_due > 0 && (
            <button
              onClick={() => { setPaymentAmount(''); setIsPaymentModalOpen(true); }}
              className="mt-3 py-1.5 px-3 rounded-lg bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pay Due Balance</span>
            </button>
          )}
        </div>
        <StatsCard
          title="Total Days Attended"
          value={`${dashboardData?.totalPresentDays || 0} Days`}
          subtitle="Active Gym Check-ins"
          icon={Activity}
          color="blue"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-500">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">Nutrition & Diet Protocol</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Target: {customer?.diet_plan || 'None'}</p>
                </div>
              </div>
            </div>
            {customer?.diet_plan !== 'None' ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs font-bold uppercase text-slate-400">Calories</span>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{customer?.calories || 0}</h4>
                    <span className="text-[10px] text-slate-400">kcal / day</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs font-bold uppercase text-slate-400">Protein</span>
                    <h4 className="text-2xl font-black text-yellow-400 mt-1">{customer?.protein || 0}g</h4>
                    <span className="text-[10px] text-slate-400">daily goal</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs font-bold uppercase text-slate-400">Carbs</span>
                    <h4 className="text-2xl font-black text-cyan-400 mt-1">{customer?.carbs || 0}g</h4>
                    <span className="text-[10px] text-slate-400">daily goal</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                    <span className="text-xs font-bold uppercase text-slate-400">Fats</span>
                    <h4 className="text-2xl font-black text-purple-400 mt-1">{customer?.fats || 0}g</h4>
                    <span className="text-[10px] text-slate-400">daily goal</span>
                  </div>
                </div>
                {customer?.meals && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1.5">Coach Meal Notes & Structure:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{customer.meals}</p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-slate-400 text-xs py-4">No custom diet plan assigned yet. Ask your coach to assign one!</p>
            )}
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-yellow-400/10 text-yellow-500">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">Your Training Regimen</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase">Customized by your coach</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                {customer?.workout_plan || 'No specific workout routine assigned yet. Speak to your assigned coach for a tailored split.'}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Assigned Personal Coach</h3>
            {customer?.trainer_id ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold text-lg">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base">{customer.trainer_id.name}</h4>
                  <p className="text-xs text-yellow-500 font-semibold">{customer.trainer_id.specialization}</p>
                  {customer.trainer_id.phone && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{customer.trainer_id.phone}</span>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-xs italic">No trainer assigned currently. Contact gym admin to assign one.</p>
            )}
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-yellow-400" />
              <span>Direct Chat with Coach</span>
            </h3>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              {!customer?.trainer_id ? (
                <div className="h-full flex items-center justify-center text-center text-slate-400 text-xs">
                  Assign a trainer to start real-time messaging!
                </div>
              ) : messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-slate-400 text-xs">
                  No messages yet. Send a message to your coach!
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.sender === 'customer';
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-2.5 rounded-xl text-xs ${
                        isMe
                          ? 'bg-yellow-400 text-black font-medium rounded-br-none shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-slate-300 dark:border-slate-700'
                      }`}>
                        <p className="break-words">{msg.message}</p>
                        <span className={`block text-[8px] mt-1 text-right ${isMe ? 'text-black/60' : 'text-slate-400'}`}>
                          {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {customer?.trainer_id && (
              <form onSubmit={handleSendMessage} className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Ask your coach anything..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold text-xs uppercase hover:bg-yellow-300 transition flex items-center gap-1 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Pay Pending Membership Balance">
        <form onSubmit={handleMakePayment} className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between items-center">
            <div>
              <p className="text-slate-400 font-semibold">Tier: {customer?.membership}</p>
              <p className="text-slate-400">Total Paid so far: ₹{customer?.amount_paid}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[11px] uppercase font-bold">Outstanding Balance</span>
              <h4 className="text-xl font-black text-rose-500">₹{customer?.amount_due}</h4>
            </div>
          </div>
          <div>
            <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Payment Amount (₹) *</label>
            <input
              type="number"
              min="1"
              max={customer?.amount_due}
              required
              placeholder={`Enter up to ₹${customer?.amount_due}`}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-extrabold uppercase hover:bg-emerald-600 shadow-md"
            >
              Pay ₹{paymentAmount || customer?.amount_due} Now
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}