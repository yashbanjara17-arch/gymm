import React, { useState, useEffect } from 'react';
import { adminAPI, attendanceAPI, invoiceAPI } from '../../services/api';
import StatsCard from '../../components/StatsCard';
import Modal from '../../components/Modal';
import {
  Users,
  Dumbbell,
  IndianRupee,
  AlertTriangle,
  UserPlus,
  Plus,
  Edit,
  Trash2,
  FileText,
  CreditCard,
  Search,
  CalendarCheck,
  CheckCircle,
  XCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('customers'); 
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTrainerFeeOpen, setIsTrainerFeeOpen] = useState(false);
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState(false);
  const [isEditTrainerOpen, setIsEditTrainerOpen] = useState(false);
  const [isPaySalaryOpen, setIsPaySalaryOpen] = useState(false);
  const [isAttendanceDetailOpen, setIsAttendanceDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [attendanceData, setAttendanceData] = useState({ user: null, type: 'customer', records: [] });
  const [customerForm, setCustomerForm] = useState({
    name: '',
    phone: '',
    membership: 'Monthly',
    paid: 0,
    password: '',
    diet_plan: 'None',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    meals: '',
    workout_plan: '',
    trainer_id: ''
  });
  const [trainerForm, setTrainerForm] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    specialization: 'General Fitness',
    salary: 0
  });
  const [paymentAmount, setPaymentAmount] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStatus, setAttendanceStatus] = useState('present');
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getDashboard();
      if (res.data.success) {
        setStats(res.data.data);
        setCustomers(res.data.data.customers || []);
        setTrainers(res.data.data.trainers || []);
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Error fetching dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.createCustomer(customerForm);
      if (res.data.success) {
        showMessage(res.data.message || 'Customer created successfully!');
        setIsAddCustomerOpen(false);
        setCustomerForm({
          name: '',
          phone: '',
          membership: 'Monthly',
          paid: 0,
          password: '',
          diet_plan: 'None',
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
          meals: '',
          workout_plan: '',
          trainer_id: ''
        });
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to create customer', 'error');
    }
  };
  const openEditCustomer = (cust) => {
    setSelectedCustomer(cust);
    setCustomerForm({
      name: cust.name || '',
      phone: cust.phone || '',
      membership: cust.membership || 'Monthly',
      paid: cust.amount_paid || 0,
      password: '',
      diet_plan: cust.diet_plan || 'None',
      calories: cust.calories || 0,
      protein: cust.protein || 0,
      carbs: cust.carbs || 0,
      fats: cust.fats || 0,
      meals: cust.meals || '',
      workout_plan: cust.workout_plan || '',
      trainer_id: cust.trainer_id?._id || cust.trainer_id || ''
    });
    setIsEditCustomerOpen(true);
  };
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.updateCustomer(selectedCustomer._id, {
        ...customerForm,
        amount_paid: customerForm.paid
      });
      if (res.data.success) {
        showMessage('Customer details updated successfully!');
        setIsEditCustomerOpen(false);
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to update customer', 'error');
    }
  };
  const handleDeleteCustomer = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete member "${name}"?`)) return;
    try {
      const res = await adminAPI.deleteCustomer(id);
      if (res.data.success) {
        showMessage('Member deleted successfully');
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to delete member', 'error');
    }
  };
  const handleRecordPayment = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.recordPayment(selectedCustomer._id, { payment: paymentAmount });
      if (res.data.success) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        showMessage(`Payment of ₹${paymentAmount} recorded successfully!`);
        setIsPaymentOpen(false);
        setPaymentAmount('');
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to record payment', 'error');
    }
  };
  const handleRecordTrainerFee = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.recordTrainerFeePayment(selectedCustomer._id, { payment: paymentAmount });
      if (res.data.success) {
        showMessage(`Trainer fee payment of ₹${paymentAmount} recorded!`);
        setIsTrainerFeeOpen(false);
        setPaymentAmount('');
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to record trainer fee', 'error');
    }
  };
  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.createTrainer(trainerForm);
      if (res.data.success) {
        showMessage(res.data.message || 'Trainer created successfully!');
        setIsAddTrainerOpen(false);
        setTrainerForm({
          name: '',
          username: '',
          password: '',
          phone: '',
          specialization: 'General Fitness',
          salary: 0
        });
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to create trainer', 'error');
    }
  };
  const openEditTrainer = (trn) => {
    setSelectedTrainer(trn);
    setTrainerForm({
      name: trn.name || '',
      username: trn.username || '',
      password: '',
      phone: trn.phone || '',
      specialization: trn.specialization || 'General Fitness',
      salary: trn.salary || 0
    });
    setIsEditTrainerOpen(true);
  };
  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.updateTrainer(selectedTrainer._id, trainerForm);
      if (res.data.success) {
        showMessage('Trainer updated successfully!');
        setIsEditTrainerOpen(false);
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to update trainer', 'error');
    }
  };
  const handleDeleteTrainer = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete trainer "${name}"?`)) return;
    try {
      const res = await adminAPI.deleteTrainer(id);
      if (res.data.success) {
        showMessage('Trainer deleted successfully');
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to delete trainer', 'error');
    }
  };
  const handlePaySalary = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.recordGymSalaryPayment(selectedTrainer._id, { payment: paymentAmount });
      if (res.data.success) {
        showMessage(`Salary payment of ₹${paymentAmount} recorded!`);
        setIsPaySalaryOpen(false);
        setPaymentAmount('');
        fetchData();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to record salary payment', 'error');
    }
  };
  const openAttendanceDetail = async (item, type) => {
    try {
      if (type === 'customer') {
        const res = await attendanceAPI.getCustomerDetail(item._id || item.id);
        if (res.data.success) {
          setAttendanceData({
            user: res.data.data.customer,
            type: 'customer',
            records: res.data.data.records
          });
          setIsAttendanceDetailOpen(true);
        }
      } else {
        const res = await attendanceAPI.getTrainerDetail(item._id || item.id);
        if (res.data.success) {
          setAttendanceData({
            user: res.data.data.trainer,
            type: 'trainer',
            records: res.data.data.records
          });
          setIsAttendanceDetailOpen(true);
        }
      }
    } catch (err) {
      showMessage('Failed to load attendance records', 'error');
    }
  };
  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      const userId = attendanceData.user._id;
      if (attendanceData.type === 'customer') {
        const res = await attendanceAPI.markCustomer(userId, { date: attendanceDate, status: attendanceStatus });
        if (res.data.success) {
          showMessage(`Attendance updated to ${attendanceStatus}`);
          openAttendanceDetail(attendanceData.user, 'customer');
        }
      } else {
        const res = await attendanceAPI.markTrainer(userId, { date: attendanceDate, status: attendanceStatus });
        if (res.data.success) {
          showMessage(`Attendance updated to ${attendanceStatus}`);
          openAttendanceDetail(attendanceData.user, 'trainer');
        }
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to mark attendance', 'error');
    }
  };
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.membership.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTrainers = trainers.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8 min-h-screen">
      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-md ${
          message.type === 'error'
            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
        }`}>
          <span>{message.text}</span>
          <button onClick={() => setMessage({ text: '', type: '' })} className="font-bold text-xs uppercase ml-4">Dismiss</button>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Admin <span className="text-yellow-400">Control Center</span>
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            Complete management of members, coaching staff, billing & attendance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddCustomerOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-300 shadow-md shadow-yellow-400/10 hover:scale-105 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
          <button
            onClick={() => setIsAddTrainerOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-slate-700 shadow-md hover:scale-105 transition-all flex items-center gap-2 border border-slate-700"
          >
            <Dumbbell className="w-4 h-4 text-yellow-400" />
            <span>Add Trainer</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Registered Members"
          value={stats?.totalCustomers || 0}
          subtitle="Active Gym Warriors"
          icon={Users}
          color="yellow"
        />
        <StatsCard
          title="Total Revenue Collected"
          value={`₹${(stats?.totalPaid || 0).toLocaleString('en-IN')}`}
          subtitle="Collected Payments"
          icon={IndianRupee}
          color="green"
        />
        <StatsCard
          title="Total Pending Balance Due"
          value={`₹${(stats?.totalDue || 0).toLocaleString('en-IN')}`}
          subtitle="Unpaid Membership Balance"
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Active Trainers & Coaches"
          value={stats?.totalTrainers || 0}
          subtitle={`Total Salary: ₹${(stats?.totalTrainersSalary || 0).toLocaleString('en-IN')}`}
          icon={Award}
          color="blue"
        />
      </div>
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-5 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
            activeTab === 'customers'
              ? 'border-yellow-400 text-yellow-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Members Management ({customers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('trainers')}
          className={`px-5 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
            activeTab === 'trainers'
              ? 'border-yellow-400 text-yellow-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Trainers & Coaches ({trainers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-5 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
            activeTab === 'attendance'
              ? 'border-yellow-400 text-yellow-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Attendance Center</span>
        </button>
      </div>
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search by name, phone, or plan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>
      {activeTab === 'customers' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-4">Member Name</th>
                  <th className="px-5 py-4">Phone Number</th>
                  <th className="px-5 py-4">Membership</th>
                  <th className="px-5 py-4">Assigned Trainer</th>
                  <th className="px-5 py-4">Paid (₹)</th>
                  <th className="px-5 py-4">Due (₹)</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-slate-400">
                      No members found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => (
                    <tr key={cust._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                        {cust.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {cust.phone}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 font-bold">
                          {cust.membership}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {cust.trainer_id ? (
                          <span className="font-semibold">{cust.trainer_id.name || cust.trainer_id.username}</span>
                        ) : (
                          <span className="text-slate-400 italic">None</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-bold text-emerald-500">
                        ₹{cust.amount_paid.toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4 font-bold text-rose-500">
                        ₹{cust.amount_due.toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4">
                        {cust.amount_due === 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
                            <CheckCircle className="w-3 h-3" />
                            <span>Paid</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-bold text-[10px]">
                            <XCircle className="w-3 h-3" />
                            <span>Due</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => { setSelectedCustomer(cust); setPaymentAmount(''); setIsPaymentOpen(true); }}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition"
                            title="Record Payment"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setSelectedCustomer(cust); setPaymentAmount(''); setIsTrainerFeeOpen(true); }}
                            className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
                            title="Record Trainer Fee"
                          >
                            <Dumbbell className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                await invoiceAPI.downloadInvoice(cust._id, cust.name);
                                showMessage(`Invoice for ${cust.name} downloaded!`);
                              } catch (err) {
                                showMessage('Failed to download invoice', 'error');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500 hover:text-white transition"
                            title="Download PDF Invoice"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditCustomer(cust)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-yellow-400 hover:text-black transition"
                            title="Edit Member"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openAttendanceDetail(cust, 'customer')}
                            className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition"
                            title="Attendance History"
                          >
                            <CalendarCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(cust._id, cust.name)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 'trainers' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-4">Trainer Name</th>
                  <th className="px-5 py-4">Username</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Specialization</th>
                  <th className="px-5 py-4">Monthly Salary (₹)</th>
                  <th className="px-5 py-4">Salary Paid (₹)</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredTrainers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-slate-400">
                      No trainers found. Click "Add Trainer" above to register one.
                    </td>
                  </tr>
                ) : (
                  filteredTrainers.map((trn) => (
                    <tr key={trn._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                        {trn.name}
                      </td>
                      <td className="px-5 py-4 text-yellow-500 font-semibold">
                        @{trn.username}
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {trn.phone || 'N/A'}
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                          {trn.specialization}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                        ₹{(trn.salary || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4 font-bold text-emerald-500">
                        ₹{(trn.salary_paid || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => { setSelectedTrainer(trn); setPaymentAmount(''); setIsPaySalaryOpen(true); }}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition"
                            title="Pay Trainer Salary"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openAttendanceDetail(trn, 'trainer')}
                            className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition"
                            title="Attendance History"
                          >
                            <CalendarCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditTrainer(trn)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-yellow-400 hover:text-black transition"
                            title="Edit Trainer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrainer(trn._id, trn.name)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition"
                            title="Delete Trainer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-yellow-400" />
              <span>Members Attendance Overview</span>
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[500px] overflow-y-auto">
              {customers.map((cust) => (
                <div key={cust._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{cust.name}</h4>
                    <p className="text-slate-400">{cust.phone}</p>
                  </div>
                  <button
                    onClick={() => openAttendanceDetail(cust, 'customer')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-yellow-400 hover:text-black font-semibold transition"
                  >
                    View & Mark
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-yellow-400" />
              <span>Trainers Attendance Overview</span>
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[500px] overflow-y-auto">
              {trainers.map((trn) => (
                <div key={trn._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{trn.name}</h4>
                    <p className="text-slate-400">@{trn.username}</p>
                  </div>
                  <button
                    onClick={() => openAttendanceDetail(trn, 'trainer')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-yellow-400 hover:text-black font-semibold transition"
                  >
                    View & Mark
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isAddCustomerOpen} onClose={() => setIsAddCustomerOpen(false)} title="Register New Member">
        <form onSubmit={handleAddCustomer} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Phone Number (10 Digits) *</label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit number"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value.replace(/\D/g, '') })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Membership Plan *</label>
              <select
                value={customerForm.membership}
                onChange={(e) => setCustomerForm({ ...customerForm, membership: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Monthly">Monthly (₹1,000)</option>
                <option value="Quarterly">Quarterly (₹2,500)</option>
                <option value="Half-Yearly">Half-Yearly (₹4,500)</option>
                <option value="Yearly">Yearly (₹8,000)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Amount Paid (₹)</label>
              <input
                type="number"
                min="0"
                value={customerForm.paid}
                onChange={(e) => setCustomerForm({ ...customerForm, paid: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Member Password *</label>
              <input
                type="password"
                required
                placeholder="Login password"
                value={customerForm.password}
                onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Assign Trainer</label>
              <select
                value={customerForm.trainer_id}
                onChange={(e) => setCustomerForm({ ...customerForm, trainer_id: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">-- No Trainer Assigned --</option>
                {trainers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.specialization})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Diet Plan Type</label>
              <select
                value={customerForm.diet_plan}
                onChange={(e) => setCustomerForm({ ...customerForm, diet_plan: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="None">None</option>
                <option value="Standard">Standard</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          {customerForm.diet_plan !== 'None' && (
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h4 className="font-bold text-yellow-500 uppercase tracking-wider">Macros & Nutrition Targets</h4>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Calories (kcal)</label>
                  <input
                    type="number"
                    value={customerForm.calories}
                    onChange={(e) => setCustomerForm({ ...customerForm, calories: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Protein (g)</label>
                  <input
                    type="number"
                    value={customerForm.protein}
                    onChange={(e) => setCustomerForm({ ...customerForm, protein: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Carbs (g)</label>
                  <input
                    type="number"
                    value={customerForm.carbs}
                    onChange={(e) => setCustomerForm({ ...customerForm, carbs: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Fats (g)</label>
                  <input
                    type="number"
                    value={customerForm.fats}
                    onChange={(e) => setCustomerForm({ ...customerForm, fats: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Meal Suggestions & Notes</label>
                <textarea
                  rows={2}
                  placeholder="Breakfast, Lunch, Dinner guidelines..."
                  value={customerForm.meals}
                  onChange={(e) => setCustomerForm({ ...customerForm, meals: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Workout Plan Routine</label>
            <textarea
              rows={2}
              placeholder="e.g. Mon: Chest/Tri, Tue: Back/Bi, Wed: Legs..."
              value={customerForm.workout_plan}
              onChange={(e) => setCustomerForm({ ...customerForm, workout_plan: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddCustomerOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold uppercase hover:bg-yellow-300"
            >
              Save Member
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isEditCustomerOpen} onClose={() => setIsEditCustomerOpen(false)} title={`Edit Member: ${selectedCustomer?.name}`}>
        <form onSubmit={handleUpdateCustomer} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={customerForm.name}
                onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                maxLength={10}
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value.replace(/\D/g, '') })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Membership</label>
              <select
                value={customerForm.membership}
                onChange={(e) => setCustomerForm({ ...customerForm, membership: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Monthly">Monthly (₹1,000)</option>
                <option value="Quarterly">Quarterly (₹2,500)</option>
                <option value="Half-Yearly">Half-Yearly (₹4,500)</option>
                <option value="Yearly">Yearly (₹8,000)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Total Paid (₹)</label>
              <input
                type="number"
                min="0"
                value={customerForm.paid}
                onChange={(e) => setCustomerForm({ ...customerForm, paid: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">New Password (optional)</label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                value={customerForm.password}
                onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Assigned Trainer</label>
              <select
                value={customerForm.trainer_id}
                onChange={(e) => setCustomerForm({ ...customerForm, trainer_id: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">-- No Trainer Assigned --</option>
                {trainers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.specialization})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Diet Plan Type</label>
              <select
                value={customerForm.diet_plan}
                onChange={(e) => setCustomerForm({ ...customerForm, diet_plan: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="None">None</option>
                <option value="Standard">Standard</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          {customerForm.diet_plan !== 'None' && (
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h4 className="font-bold text-yellow-500 uppercase tracking-wider">Macros & Nutrition Targets</h4>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Calories (kcal)</label>
                  <input
                    type="number"
                    value={customerForm.calories}
                    onChange={(e) => setCustomerForm({ ...customerForm, calories: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Protein (g)</label>
                  <input
                    type="number"
                    value={customerForm.protein}
                    onChange={(e) => setCustomerForm({ ...customerForm, protein: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Carbs (g)</label>
                  <input
                    type="number"
                    value={customerForm.carbs}
                    onChange={(e) => setCustomerForm({ ...customerForm, carbs: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400">Fats (g)</label>
                  <input
                    type="number"
                    value={customerForm.fats}
                    onChange={(e) => setCustomerForm({ ...customerForm, fats: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Meal Suggestions & Notes</label>
                <textarea
                  rows={2}
                  value={customerForm.meals}
                  onChange={(e) => setCustomerForm({ ...customerForm, meals: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Workout Plan Routine</label>
            <textarea
              rows={2}
              value={customerForm.workout_plan}
              onChange={(e) => setCustomerForm({ ...customerForm, workout_plan: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditCustomerOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold uppercase hover:bg-yellow-300"
            >
              Update Member
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} title={`Record Payment: ${selectedCustomer?.name}`}>
        <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between items-center">
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-semibold">Membership: {selectedCustomer?.membership}</p>
              <p className="text-slate-500 dark:text-slate-400">Total Paid: ₹{selectedCustomer?.amount_paid}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[11px] uppercase font-bold">Pending Due</span>
              <h4 className="text-xl font-black text-rose-500">₹{selectedCustomer?.amount_due}</h4>
            </div>
          </div>
          <div>
            <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Additional Payment Amount (₹) *</label>
            <input
              type="number"
              min="1"
              max={selectedCustomer?.amount_due}
              required
              placeholder={`Enter up to ₹${selectedCustomer?.amount_due}`}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsPaymentOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-extrabold uppercase hover:bg-emerald-600 shadow-md"
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isTrainerFeeOpen} onClose={() => setIsTrainerFeeOpen(false)} title={`Record Trainer Fee for ${selectedCustomer?.name}`}>
        <form onSubmit={handleRecordTrainerFee} className="space-y-4 text-xs">
          <p className="text-slate-500 dark:text-slate-400">
            Record direct personal trainer fee payment paid by member. Current trainer fee paid: ₹{selectedCustomer?.trainer_fee_paid || 0}
          </p>
          <div>
            <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Fee Amount (₹) *</label>
            <input
              type="number"
              min="1"
              required
              placeholder="e.g. 2000"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsTrainerFeeOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold uppercase hover:bg-yellow-300"
            >
              Save Trainer Fee
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isAddTrainerOpen} onClose={() => setIsAddTrainerOpen(false)} title="Register New Trainer">
        <form onSubmit={handleAddTrainer} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Coach Full Name"
                value={trainerForm.name}
                onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Username *</label>
              <input
                type="text"
                required
                placeholder="e.g. mike_coach"
                value={trainerForm.username}
                onChange={(e) => setTrainerForm({ ...trainerForm, username: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Password *</label>
              <input
                type="password"
                required
                placeholder="Login Password"
                value={trainerForm.password}
                onChange={(e) => setTrainerForm({ ...trainerForm, password: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit number"
                value={trainerForm.phone}
                onChange={(e) => setTrainerForm({ ...trainerForm, phone: e.target.value.replace(/\D/g, '') })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Specialization</label>
              <input
                type="text"
                placeholder="e.g. CrossFit, Powerlifting, Diet"
                value={trainerForm.specialization}
                onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Monthly Salary (₹)</label>
              <input
                type="number"
                min="0"
                value={trainerForm.salary}
                onChange={(e) => setTrainerForm({ ...trainerForm, salary: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddTrainerOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold uppercase hover:bg-yellow-300"
            >
              Save Trainer
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isEditTrainerOpen} onClose={() => setIsEditTrainerOpen(false)} title={`Edit Trainer: ${selectedTrainer?.name}`}>
        <form onSubmit={handleUpdateTrainer} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={trainerForm.name}
                onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Username</label>
              <input
                type="text"
                required
                value={trainerForm.username}
                onChange={(e) => setTrainerForm({ ...trainerForm, username: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">New Password (optional)</label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                value={trainerForm.password}
                onChange={(e) => setTrainerForm({ ...trainerForm, password: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                maxLength={10}
                value={trainerForm.phone}
                onChange={(e) => setTrainerForm({ ...trainerForm, phone: e.target.value.replace(/\D/g, '') })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Specialization</label>
              <input
                type="text"
                value={trainerForm.specialization}
                onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Monthly Salary (₹)</label>
              <input
                type="number"
                min="0"
                value={trainerForm.salary}
                onChange={(e) => setTrainerForm({ ...trainerForm, salary: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditTrainerOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold uppercase hover:bg-yellow-300"
            >
              Update Trainer
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isPaySalaryOpen} onClose={() => setIsPaySalaryOpen(false)} title={`Pay Salary to ${selectedTrainer?.name}`}>
        <form onSubmit={handlePaySalary} className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between items-center">
            <div>
              <p className="text-slate-400 font-semibold">Specialization: {selectedTrainer?.specialization}</p>
              <p className="text-slate-400">Total Salary Paid: ₹{selectedTrainer?.salary_paid || 0}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[11px] uppercase font-bold">Base Salary</span>
              <h4 className="text-xl font-black text-yellow-400">₹{selectedTrainer?.salary}</h4>
            </div>
          </div>
          <div>
            <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Salary Payment Amount (₹) *</label>
            <input
              type="number"
              min="1"
              required
              placeholder="e.g. 35000"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsPaySalaryOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-extrabold uppercase hover:bg-emerald-600"
            >
              Confirm Salary Payout
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isAttendanceDetailOpen} onClose={() => setIsAttendanceDetailOpen(false)} title={`Attendance History: ${attendanceData.user?.name}`}>
        <div className="space-y-6 text-xs">
          <form onSubmit={handleMarkAttendance} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Mark or Modify Attendance Record</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Status</label>
                <select
                  value={attendanceStatus}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="present">Present (Attended)</option>
                  <option value="absent">Absent (Missed)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-yellow-400 text-black font-extrabold uppercase hover:bg-yellow-300 transition"
              >
                Save Record
              </button>
            </div>
          </form>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Past 30 Days Records</h4>
            {attendanceData.records.length === 0 ? (
              <p className="text-slate-400 italic py-4">No past attendance logs found for this user.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl">
                {attendanceData.records.map((rec) => (
                  <div key={rec._id} className="p-3 flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{rec.attendance_date}</span>
                    <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                      rec.status === 'present'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {rec.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}