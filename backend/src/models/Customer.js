import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  membership: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'],
    default: 'Monthly'
  },
  diet_plan: {
    type: String,
    enum: ['None', 'Standard', 'Weight Loss', 'Muscle Gain', 'Maintenance'],
    default: 'None'
  },
  amount_paid: {
    type: Number,
    default: 0
  },
  amount_due: {
    type: Number,
    default: 0
  },
  trainer_fee_paid: {
    type: Number,
    default: 0
  },
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    default: null
  },
  calories: {
    type: Number,
    default: 0
  },
  protein: {
    type: Number,
    default: 0
  },
  carbs: {
    type: Number,
    default: 0
  },
  fats: {
    type: Number,
    default: 0
  },
  meals: {
    type: String,
    default: ''
  },
  workout_plan: {
    type: String,
    default: ''
  }
}, { timestamps: true });
customerSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password === enteredPassword) return true;
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('Customer', customerSchema);