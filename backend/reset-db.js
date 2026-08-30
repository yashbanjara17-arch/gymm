import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './src/models/Admin.js';
import Trainer from './src/models/Trainer.js';
import Customer from './src/models/Customer.js';
import Attendance from './src/models/Attendance.js';
import Message from './src/models/Message.js';

dotenv.config();

async function resetDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB at:', mongoUri.replace(/:([^:@]+)@/, ':****@'));
    await mongoose.connect(mongoUri);

    console.log('Clearing all collections...');
    await Customer.deleteMany({});
    await Trainer.deleteMany({});
    await Attendance.deleteMany({});
    await Message.deleteMany({});
    await Admin.deleteMany({});

    console.log('Collections cleared.');

    // Create fresh default admin
    const hashedPassword = await bcrypt.hash('admin', 10);
    await Admin.create({
      username: 'admin',
      password: hashedPassword
    });

    console.log('✅ Fresh default admin created:');
    console.log('   Username: admin');
    console.log('   Password: admin');
    console.log('Database is now completely clean and ready for production/forking!');

    process.exit(0);
  } catch (error) {
    console.error('Reset error:', error);
    process.exit(1);
  }
}

resetDB();
