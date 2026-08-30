import mongoose from 'mongoose';
const attendanceSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['customer', 'trainer'],
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    default: null
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    default: null
  },
  attendance_date: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'present'
  }
}, { timestamps: true });
attendanceSchema.index({ customerId: 1, attendance_date: 1 }, { unique: true, sparse: true });
attendanceSchema.index({ trainerId: 1, attendance_date: 1 }, { unique: true, sparse: true });
export default mongoose.model('Attendance', attendanceSchema);