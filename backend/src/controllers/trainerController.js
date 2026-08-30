import Customer from '../models/Customer.js';
import Trainer from '../models/Trainer.js';
import Message from '../models/Message.js';
export const getTrainerDashboard = async (req, res, next) => {
  try {
    const trainerId = req.user.id;
    const trainer = await Trainer.findById(trainerId).select('-password');
    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found' });
    }
    const assignedCustomers = await Customer.find({ trainer_id: trainerId }).sort({ name: 1 });
    res.json({
      success: true,
      data: {
        trainer,
        customers: assignedCustomers
      }
    });
  } catch (error) {
    next(error);
  }
};
export const updateCustomerPlans = async (req, res, next) => {
  try {
    const trainerId = req.user.id;
    const customerId = req.params.cid;
    const customer = await Customer.findOne({ _id: customerId, trainer_id: trainerId });
    if (!customer) {
      return res.status(403).json({ success: false, message: 'Unauthorized: This customer is not assigned to you' });
    }
    const { calories, protein, carbs, fats, meals, workout_plan } = req.body;
    if (calories !== undefined) customer.calories = Number(calories) || 0;
    if (protein !== undefined) customer.protein = Number(protein) || 0;
    if (carbs !== undefined) customer.carbs = Number(carbs) || 0;
    if (fats !== undefined) customer.fats = Number(fats) || 0;
    if (meals !== undefined) customer.meals = meals;
    if (workout_plan !== undefined) customer.workout_plan = workout_plan;
    await customer.save();
    res.json({
      success: true,
      message: 'Diet and workout plans updated successfully',
      data: customer
    });
  } catch (error) {
    next(error);
  }
};
export const getTrainerMessages = async (req, res, next) => {
  try {
    const trainerId = req.user.id;
    const customerId = req.params.cid;
    const customer = await Customer.findOne({ _id: customerId, trainer_id: trainerId });
    if (!customer) {
      return res.status(403).json({ success: false, message: 'Unauthorized: This customer is not assigned to you' });
    }
    const messages = await Message.find({ trainerId, customerId }).sort({ createdAt: 1 });
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};
export const sendTrainerMessage = async (req, res, next) => {
  try {
    const trainerId = req.user.id;
    const customerId = req.params.cid;
    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }
    const customer = await Customer.findOne({ _id: customerId, trainer_id: trainerId });
    if (!customer) {
      return res.status(403).json({ success: false, message: 'Unauthorized: This customer is not assigned to you' });
    }
    const newMessage = await Message.create({
      trainerId,
      customerId,
      sender: 'trainer',
      message: message.trim()
    });
    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};