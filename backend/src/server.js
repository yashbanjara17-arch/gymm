import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seed.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Base route & Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gym Management API is running healthy', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/invoices', invoiceRoutes);

// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[SERVER OK] Express Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error('[SERVER BOOT ERROR]', err);
  }
};

startServer();
