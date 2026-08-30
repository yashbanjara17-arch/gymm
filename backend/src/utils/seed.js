import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
export const seedDatabase = async () => {
  try {
    const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin';
    const adminExists = await Admin.findOne({ username: adminUsername });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await Admin.create({
        username: adminUsername,
        password: hashedPassword
      });
      console.log(`[SEED OK] Default administrator account ensured:`);
      console.log(`          Username: ${adminUsername}`);
      console.log(`          Password: ${adminPassword}`);
    } else {
      console.log(`[SEED OK] Administrator account verified (${adminUsername}).`);
    }
  } catch (error) {
    console.error('[SEED ERROR] Failed to verify default admin on startup:', error.message);
  }
};