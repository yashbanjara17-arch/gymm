import Attendance from '../models/Attendance.js';
import Customer from '../models/Customer.js';
import Trainer from '../models/Trainer.js';
export const getCustomersAttendanceSummary = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    const attendanceStats = await Attendance.aggregate([
      { $match: { userType: 'customer' } },
      {
        $group: {
          _id: { customerId: '$customerId', status: '$status' },
          count: { $sum: 1 }
        }
      }
    ]);
    const summary = customers.map(c => {
      const presentItem = attendanceStats.find(
        s => s._id.customerId && s._id.customerId.toString() === c._id.toString() && s._id.status === 'present'
      );
      const absentItem = attendanceStats.find(
        s => s._id.customerId && s._id.customerId.toString() === c._id.toString() && s._id.status === 'absent'
      );
      const presentCount = presentItem ? presentItem.count : 0;
      const absentCount = absentItem ? absentItem.count : 0;
      return {
        id: c._id,
        name: c.name,
        phone: c.phone,
        membership: c.membership,
        totalAttendance: presentCount + absentCount,
        presentCount,
        absentCount
      };
    });
    res.json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};
export const getCustomerAttendanceDetail = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.cid);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    const attendanceRecords = await Attendance.find({
      userType: 'customer',
      customerId: req.params.cid
    }).sort({ attendance_date: -1 }).limit(60);
    res.json({
      success: true,
      data: {
        customer,
        records: attendanceRecords
      }
    });
  } catch (error) {
    next(error);
  }
};
export const markCustomerAttendanceAdmin = async (req, res, next) => {
  try {
    const { date, status } = req.body;
    const customerId = req.params.cid;
    if (!date || !status || !['present', 'absent'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Please provide valid date and status (present/absent)' });
    }
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    const record = await Attendance.findOneAndUpdate(
      { customerId, attendance_date: date },
      { userType: 'customer', customerId, attendance_date: date, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({
      success: true,
      message: `Customer attendance set to ${status} for ${date}`,
      data: record
    });
  } catch (error) {
    next(error);
  }
};
export const getTrainersAttendanceSummary = async (req, res, next) => {
  try {
    const trainers = await Trainer.find().sort({ name: 1 });
    const attendanceStats = await Attendance.aggregate([
      { $match: { userType: 'trainer' } },
      {
        $group: {
          _id: { trainerId: '$trainerId', status: '$status' },
          count: { $sum: 1 }
        }
      }
    ]);
    const summary = trainers.map(t => {
      const presentItem = attendanceStats.find(
        s => s._id.trainerId && s._id.trainerId.toString() === t._id.toString() && s._id.status === 'present'
      );
      const absentItem = attendanceStats.find(
        s => s._id.trainerId && s._id.trainerId.toString() === t._id.toString() && s._id.status === 'absent'
      );
      const presentCount = presentItem ? presentItem.count : 0;
      const absentCount = absentItem ? absentItem.count : 0;
      return {
        id: t._id,
        name: t.name,
        username: t.username,
        phone: t.phone,
        specialization: t.specialization,
        totalAttendance: presentCount + absentCount,
        presentCount,
        absentCount
      };
    });
    res.json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};
export const getTrainerAttendanceDetail = async (req, res, next) => {
  try {
    const trainer = await Trainer.findById(req.params.tid);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    const attendanceRecords = await Attendance.find({
      userType: 'trainer',
      trainerId: req.params.tid
    }).sort({ attendance_date: -1 }).limit(60);
    res.json({
      success: true,
      data: {
        trainer,
        records: attendanceRecords
      }
    });
  } catch (error) {
    next(error);
  }
};
export const markTrainerAttendanceAdmin = async (req, res, next) => {
  try {
    const { date, status } = req.body;
    const trainerId = req.params.tid;
    if (!date || !status || !['present', 'absent'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Please provide valid date and status (present/absent)' });
    }
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    const record = await Attendance.findOneAndUpdate(
      { trainerId, attendance_date: date },
      { userType: 'trainer', trainerId, attendance_date: date, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({
      success: true,
      message: `Trainer attendance set to ${status} for ${date}`,
      data: record
    });
  } catch (error) {
    next(error);
  }
};