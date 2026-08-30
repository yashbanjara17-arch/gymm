import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });
adminSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password === enteredPassword) return true;
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('Admin', adminSchema);