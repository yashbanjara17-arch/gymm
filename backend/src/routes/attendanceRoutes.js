import express from 'express';
import {
  getCustomersAttendanceSummary,
  getCustomerAttendanceDetail,
  markCustomerAttendanceAdmin,
  getTrainersAttendanceSummary,
  getTrainerAttendanceDetail,
  markTrainerAttendanceAdmin
} from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Attendance management routes (Admin)
router.use(protect);
router.use(authorize('admin'));

router.get('/customers', getCustomersAttendanceSummary);
router.get('/customers/:cid', getCustomerAttendanceDetail);
router.post('/customers/:cid', markCustomerAttendanceAdmin);

router.get('/trainers', getTrainersAttendanceSummary);
router.get('/trainers/:tid', getTrainerAttendanceDetail);
router.post('/trainers/:tid', markTrainerAttendanceAdmin);

export default router;
