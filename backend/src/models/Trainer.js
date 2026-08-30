import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const trainerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  specialization: {
    type: String,
    default: 'General Fitness'
  },
  salary: {
    type: Number,
    default: 0
  },
  salary_paid: {
    type: Number,
    default: 0
  }
}, { timestamps: true });
trainerSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password === enteredPassword) return true;
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('Trainer', trainerSchema);