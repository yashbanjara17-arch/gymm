import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Trainer from '../models/Trainer.js';
import Customer from '../models/Customer.js';
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_gym_jwt_key_2026_fitness_pro');
    req.user = decoded; 
    if (decoded.role === 'admin') {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) return res.status(401).json({ success: false, message: 'Admin not found' });
      req.currentUser = admin;
    } else if (decoded.role === 'trainer') {
      const trainer = await Trainer.findById(decoded.id).select('-password');
      if (!trainer) return res.status(401).json({ success: false, message: 'Trainer not found' });
      req.currentUser = trainer;
    } else if (decoded.role === 'customer') {
      const customer = await Customer.findById(decoded.id).select('-password');
      if (!customer) return res.status(401).json({ success: false, message: 'Customer not found' });
      req.currentUser = customer;
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token', error: error.message });
  }
};
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user?.role}' is not authorized to access this route`
      });
    }
    next();
  };
};