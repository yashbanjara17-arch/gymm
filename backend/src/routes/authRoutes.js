import express from 'express';
import { adminLogin, trainerLogin, customerLogin, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/admin-login', adminLogin);
router.post('/trainer-login', trainerLogin);
router.post('/customer-login', customerLogin);
router.get('/me', protect, getMe);

export default router;
