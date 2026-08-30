import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Trainer from '../models/Trainer.js';
import Customer from '../models/Customer.js';

const generateToken = (id, role, username) => {
  return jwt.sign(
    { id, role, username },
    process.env.JWT_SECRET || 'super_secret_gym_jwt_key_2026_fitness_pro',
    { expiresIn: '30d' }
  );
};

// @desc    Admin login
// @route   POST /api/auth/admin-login
export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const token = generateToken(admin._id, 'admin', admin.username);
    res.json({
      success: true,
      token,
      user: {
        id: admin._id,
        username: admin.username,
        role: 'admin'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Trainer login
// @route   POST /api/auth/trainer-login
export const trainerLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const trainer = await Trainer.findOne({ username });
    if (!trainer) {
      return res.status(401).json({ success: false, message: 'Invalid trainer credentials' });
    }

    const isMatch = await trainer.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid trainer credentials' });
    }

    const token = generateToken(trainer._id, 'trainer', trainer.username);
    res.json({
      success: true,
      token,
      user: {
        id: trainer._id,
        username: trainer.username,
        name: trainer.name,
        role: 'trainer'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Customer login
// @route   POST /api/auth/customer-login
export const customerLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ success: false, message: 'Please provide phone and password' });
    }

    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(401).json({ success: false, message: 'Invalid phone or password' });
    }

    const isMatch = await customer.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid phone or password' });
    }

    const token = generateToken(customer._id, 'customer', customer.name);
    res.json({
      success: true,
      token,
      user: {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
        role: 'customer'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    if (!req.currentUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      user: {
        id: req.currentUser._id,
        role: req.user.role,
        ...(req.currentUser.toObject())
      }
    });
  } catch (error) {
    next(error);
  }
};
