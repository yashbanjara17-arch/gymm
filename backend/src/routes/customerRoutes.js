import express from 'express';
import {
  getCustomerDashboard,
  markSelfAttendance,
  sendCustomerMessage,
  makeCustomerPayment
} from '../controllers/customerController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('customer'));

router.get('/dashboard', getCustomerDashboard);
router.post('/mark-attendance', markSelfAttendance);
router.post('/send-message', sendCustomerMessage);
router.post('/payment', makeCustomerPayment);

export default router;
