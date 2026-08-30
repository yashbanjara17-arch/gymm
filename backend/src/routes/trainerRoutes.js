import express from 'express';
import {
  getTrainerDashboard,
  updateCustomerPlans,
  getTrainerMessages,
  sendTrainerMessage
} from '../controllers/trainerController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect);
router.use(authorize('trainer'));
router.get('/dashboard', getTrainerDashboard);
router.put('/customers/:cid/plans', updateCustomerPlans);
router.get('/messages/:cid', getTrainerMessages);
router.post('/messages/:cid', sendTrainerMessage);
export default router;