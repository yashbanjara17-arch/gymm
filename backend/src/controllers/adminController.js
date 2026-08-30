import bcrypt from 'bcryptjs';
import Customer from '../models/Customer.js';
import Trainer from '../models/Trainer.js';
import Attendance from '../models/Attendance.js';
import Message from '../models/Message.js';
import { MEMBERSHIP_PRICES, DIET_PLANS } from '../config/constants.js';

// @desc    Get admin dashboard stats & overview
// @route   GET /api/admin/dashboard
export const getDashboardStats = async (req, res, next) => {
  try {
    const customers = await Customer.find().populate('trainer_id', 'name username').sort({ createdAt: -1 });
    const trainers = await Trainer.find().sort({ createdAt: -1 });

    const totalPaid = customers.reduce((sum, c) => sum + (c.amount_paid || 0), 0);
    const totalDue = customers.reduce((sum, c) => sum + (c.amount_due || 0), 0);
    const totalTrainersSalary = trainers.reduce((sum, t) => sum + (t.salary || 0), 0);
    const totalTrainersSalaryPaid = trainers.reduce((sum, t) => sum + (t.salary_paid || 0), 0);

    res.json({
      success: true,
      data: {
        totalCustomers: customers.length,
        totalTrainers: trainers.length,
        totalPaid,
        totalDue,
        totalTrainersSalary,
        totalTrainersSalaryPaid,
        customers,
        trainers,
        membershipPrices: MEMBERSHIP_PRICES,
        dietPlans: DIET_PLANS
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all customers
// @route   GET /api/admin/customers
export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().populate('trainer_id', 'name username specialization').sort({ createdAt: -1 });
    res.json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single customer
// @route   GET /api/admin/customers/:id
export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('trainer_id', 'name username');
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new customer
// @route   POST /api/admin/customers
export const createCustomer = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      membership,
      password,
      paid = 0,
      diet_plan = 'None',
      calories = 0,
      protein = 0,
      carbs = 0,
      fats = 0,
      meals = '',
      workout_plan = '',
      trainer_id = null
    } = req.body;

    if (!name || !phone || !membership || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, phone, membership, and password' });
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
    }

    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      return res.status(400).json({ success: false, message: 'A customer with this phone number already exists' });
    }

    const planAmount = MEMBERSHIP_PRICES[membership] || 1000;
    const amountPaid = Number(paid) || 0;

    if (amountPaid < 0) {
      return res.status(400).json({ success: false, message: 'Paid amount cannot be negative' });
    }

    if (amountPaid > planAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment exceeds plan amount. Plan: ₹${planAmount}, Amount paid: ₹${amountPaid}`
      });
    }

    const amountDue = planAmount - amountPaid;
    const hashedPassword = await bcrypt.hash(password, 10);

    const validDietPlan = DIET_PLANS.includes(diet_plan) ? diet_plan : 'None';
    const isNoDiet = validDietPlan === 'None';

    const newCustomer = await Customer.create({
      name: name.trim(),
      phone: phone.trim(),
      password: hashedPassword,
      membership,
      diet_plan: validDietPlan,
      amount_paid: amountPaid,
      amount_due: amountDue,
      calories: isNoDiet ? 0 : Number(calories) || 0,
      protein: isNoDiet ? 0 : Number(protein) || 0,
      carbs: isNoDiet ? 0 : Number(carbs) || 0,
      fats: isNoDiet ? 0 : Number(fats) || 0,
      meals: isNoDiet ? '' : meals,
      workout_plan,
      trainer_id: trainer_id || null
    });

    res.status(201).json({
      success: true,
      message: `Customer created successfully. Phone: ${phone}`,
      data: newCustomer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a customer
// @route   PUT /api/admin/customers/:id
export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const {
      name,
      phone,
      membership,
      diet_plan,
      amount_paid,
      password,
      calories,
      protein,
      carbs,
      fats,
      meals,
      workout_plan,
      trainer_id
    } = req.body;

    if (name) customer.name = name.trim();
    if (phone) {
      if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
      }
      const existingPhone = await Customer.findOne({ phone, _id: { $ne: customer._id } });
      if (existingPhone) {
        return res.status(400).json({ success: false, message: 'Phone number is already in use by another customer' });
      }
      customer.phone = phone.trim();
    }

    if (membership) {
      customer.membership = membership;
    }

    const planAmount = MEMBERSHIP_PRICES[customer.membership] || 1000;

    if (amount_paid !== undefined) {
      const paidNum = Number(amount_paid);
      if (paidNum < 0) {
        return res.status(400).json({ success: false, message: 'Amount paid cannot be negative' });
      }
      if (paidNum > planAmount) {
        return res.status(400).json({
          success: false,
          message: `Payment exceeds plan amount. Plan: ₹${planAmount}, Amount paid: ₹${paidNum}`
        });
      }
      customer.amount_paid = paidNum;
      customer.amount_due = planAmount - paidNum;
    } else {
      customer.amount_due = planAmount - customer.amount_paid;
    }

    if (diet_plan !== undefined) {
      customer.diet_plan = DIET_PLANS.includes(diet_plan) ? diet_plan : 'None';
    }

    if (customer.diet_plan === 'None') {
      customer.calories = 0;
      customer.protein = 0;
      customer.carbs = 0;
      customer.fats = 0;
      customer.meals = '';
    } else {
      if (calories !== undefined) customer.calories = Number(calories) || 0;
      if (protein !== undefined) customer.protein = Number(protein) || 0;
      if (carbs !== undefined) customer.carbs = Number(carbs) || 0;
      if (fats !== undefined) customer.fats = Number(fats) || 0;
      if (meals !== undefined) customer.meals = meals;
    }

    if (workout_plan !== undefined) customer.workout_plan = workout_plan;
    if (trainer_id !== undefined) customer.trainer_id = trainer_id || null;

    if (password && password.trim() !== '') {
      customer.password = await bcrypt.hash(password.trim(), 10);
    }

    await customer.save();
    const updatedCustomer = await Customer.findById(customer._id).populate('trainer_id', 'name username');

    res.json({
      success: true,
      message: 'Customer updated successfully',
      data: updatedCustomer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a customer
// @route   DELETE /api/admin/customers/:id
export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    await Attendance.deleteMany({ customerId: customer._id });
    await Message.deleteMany({ customerId: customer._id });
    await Customer.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trainers
// @route   GET /api/admin/trainers
export const getTrainers = async (req, res, next) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: trainers });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a trainer
// @route   POST /api/admin/trainers
export const createTrainer = async (req, res, next) => {
  try {
    const { username, password, name, phone = '', specialization = 'General Fitness', salary = 0 } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ success: false, message: 'Please provide username, password, and name' });
    }

    const existingTrainer = await Trainer.findOne({ username: username.trim() });
    if (existingTrainer) {
      return res.status(400).json({ success: false, message: 'A trainer with this username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const newTrainer = await Trainer.create({
      username: username.trim(),
      password: hashedPassword,
      name: name.trim(),
      phone: phone.trim(),
      specialization: specialization.trim(),
      salary: Number(salary) || 0,
      salary_paid: 0
    });

    res.status(201).json({
      success: true,
      message: `Trainer ${username} created successfully`,
      data: newTrainer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a trainer
// @route   PUT /api/admin/trainers/:id
export const updateTrainer = async (req, res, next) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }

    const { name, phone, specialization, salary, username, password } = req.body;

    if (username) {
      const existingUser = await Trainer.findOne({ username: username.trim(), _id: { $ne: trainer._id } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username is already taken' });
      }
      trainer.username = username.trim();
    }

    if (name) trainer.name = name.trim();
    if (phone !== undefined) trainer.phone = phone.trim();
    if (specialization !== undefined) trainer.specialization = specialization.trim();
    if (salary !== undefined) trainer.salary = Number(salary) || 0;

    if (password && password.trim() !== '') {
      trainer.password = await bcrypt.hash(password.trim(), 10);
    }

    await trainer.save();

    res.json({
      success: true,
      message: 'Trainer updated successfully',
      data: trainer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a trainer
// @route   DELETE /api/admin/trainers/:id
export const deleteTrainer = async (req, res, next) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }

    // Unassign trainer from customers
    await Customer.updateMany({ trainer_id: trainer._id }, { $set: { trainer_id: null } });
    await Attendance.deleteMany({ trainerId: trainer._id });
    await Message.deleteMany({ trainerId: trainer._id });
    await Trainer.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Trainer deleted and unassigned from clients' });
  } catch (error) {
    next(error);
  }
};

// @desc    Record customer payment towards membership
// @route   POST /api/admin/customers/:id/payment
export const recordCustomerPayment = async (req, res, next) => {
  try {
    const { payment } = req.body;
    const extraPayment = Number(payment) || 0;

    if (extraPayment <= 0) {
      return res.status(400).json({ success: false, message: 'Payment amount must be greater than 0' });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const planAmount = MEMBERSHIP_PRICES[customer.membership] || 1000;
    const newPaid = (customer.amount_paid || 0) + extraPayment;

    if (newPaid > planAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment exceeds plan amount. Plan: ₹${planAmount}, Attempted total: ₹${newPaid}`
      });
    }

    customer.amount_paid = newPaid;
    customer.amount_due = planAmount - newPaid;
    await customer.save();

    res.json({
      success: true,
      message: `Payment of ₹${extraPayment} recorded successfully`,
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Record trainer fee payment by customer
// @route   POST /api/admin/customers/:id/trainer-payment
export const recordTrainerFeePayment = async (req, res, next) => {
  try {
    const { payment } = req.body;
    const extraPayment = Number(payment) || 0;

    if (extraPayment <= 0) {
      return res.status(400).json({ success: false, message: 'Payment amount must be greater than 0' });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    customer.trainer_fee_paid = (customer.trainer_fee_paid || 0) + extraPayment;
    await customer.save();

    res.json({
      success: true,
      message: `Trainer fee payment of ₹${extraPayment} recorded successfully`,
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Record gym salary payment to trainer
// @route   POST /api/admin/trainers/:id/salary-payment
export const recordGymSalaryPayment = async (req, res, next) => {
  try {
    const { payment } = req.body;
    const extraPayment = Number(payment) || 0;

    if (extraPayment <= 0) {
      return res.status(400).json({ success: false, message: 'Payment amount must be greater than 0' });
    }

    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }

    trainer.salary_paid = (trainer.salary_paid || 0) + extraPayment;
    await trainer.save();

    res.json({
      success: true,
      message: `Salary payment of ₹${extraPayment} recorded to ${trainer.name}`,
      data: trainer
    });
  } catch (error) {
    next(error);
  }
};
