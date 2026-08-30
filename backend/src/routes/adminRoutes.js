import express from 'express';
import {
  getDashboardStats,
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  recordCustomerPayment,
  recordTrainerFeePayment,
  recordGymSalaryPayment
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin only routes
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);

// Customer CRUD
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', createCustomer);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);
router.post('/customers/:id/payment', recordCustomerPayment);
router.post('/customers/:id/trainer-payment', recordTrainerFeePayment);

// Trainer CRUD
router.get('/trainers', getTrainers);
router.post('/trainers', createTrainer);
router.put('/trainers/:id', updateTrainer);
router.delete('/trainers/:id', deleteTrainer);
router.post('/trainers/:id/salary-payment', recordGymSalaryPayment);

export default router;
