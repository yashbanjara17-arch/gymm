import express from 'express';
import { generateInvoice } from '../controllers/invoiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route for invoice download
router.get('/:cid', protect, generateInvoice);

export default router;
