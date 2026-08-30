import Customer from '../models/Customer.js';
import Trainer from '../models/Trainer.js';
import Attendance from '../models/Attendance.js';
import Message from '../models/Message.js';
import { MEMBERSHIP_PRICES } from '../config/constants.js';

// @desc    Get customer dashboard info
// @route   GET /api/customer/dashboard
export const getCustomerDashboard = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const customer = await Customer.findById(customerId).populate('trainer_id', 'name username phone specialization');
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Attendance stats
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = await Attendance.findOne({
      customerId,
      attendance_date: today
    });

    const totalAttendanceCount = await Attendance.countDocuments({
      customerId,
      status: 'present'
    });

    // Recent 30 days attendance
    const recentAttendance = await Attendance.find({ customerId })
      .sort({ attendance_date: -1 })
      .limit(30);

    // Messages with trainer
    let messages = [];
    if (customer.trainer_id) {
      messages = await Message.find({ customerId, trainerId: customer.trainer_id._id }).sort({ createdAt: 1 });
    }

    res.json({
      success: true,
      data: {
        customer,
        planPrice: MEMBERSHIP_PRICES[customer.membership] || 0,
        hasMarkedToday: !!todayAttendance,
        todayStatus: todayAttendance ? todayAttendance.status : null,
        totalPresentDays: totalAttendanceCount,
        recentAttendance,
        messages
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark customer daily attendance
// @route   POST /api/customer/mark-attendance
export const markSelfAttendance = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    const existing = await Attendance.findOne({ customerId, attendance_date: today });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already marked your attendance for today'
      });
    }

    const attendance = await Attendance.create({
      userType: 'customer',
      customerId,
      attendance_date: today,
      status: 'present'
    });

    res.status(201).json({
      success: true,
      message: 'Attendance marked as present for today!',
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message to assigned trainer
// @route   POST /api/customer/send-message
export const sendCustomerMessage = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer || !customer.trainer_id) {
      return res.status(400).json({
        success: false,
        message: 'You do not have an assigned trainer to message'
      });
    }

    const newMessage = await Message.create({
      customerId,
      trainerId: customer.trainer_id,
      sender: 'customer',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Self record payment (for customer portal if paying)
// @route   POST /api/customer/payment
export const makeCustomerPayment = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const { payment } = req.body;
    const extraPayment = Number(payment) || 0;

    if (extraPayment <= 0) {
      return res.status(400).json({ success: false, message: 'Payment amount must be greater than 0' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const planAmount = MEMBERSHIP_PRICES[customer.membership] || 1000;
    const newPaid = (customer.amount_paid || 0) + extraPayment;

    if (newPaid > planAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment exceeds plan amount. Plan: ₹${planAmount}, Max allowed: ₹${customer.amount_due}`
      });
    }

    customer.amount_paid = newPaid;
    customer.amount_due = planAmount - newPaid;
    await customer.save();

    res.json({
      success: true,
      message: `Payment of ₹${extraPayment} completed successfully!`,
      data: customer
    });
  } catch (error) {
    next(error);
  }
};
