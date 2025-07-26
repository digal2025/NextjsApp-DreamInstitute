import connectDB from './mongodb';
import User from '../models/User';

// Database utility functions
export const dbUtils = {
  // User operations
  async getAllUsers() {
    await connectDB();
    return await User.find({ isActive: true }).select('-__v').sort({ createdAt: -1 });
  },

  async getUserById(id) {
    await connectDB();
    return await User.findById(id).select('-__v');
  },

  async getUserByEmail(email) {
    await connectDB();
    return await User.findOne({ email, isActive: true }).select('-__v');
  },

  async createUser(userData) {
    await connectDB();
    const user = new User(userData);
    return await user.save();
  },

  async updateUser(id, updateData) {
    await connectDB();
    return await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-__v');
  },

  async deleteUser(id) {
    await connectDB();
    return await User.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );
  },

  // Database health check
  async healthCheck() {
    try {
      await connectDB();
      const userCount = await User.countDocuments();
      return {
        status: 'healthy',
        userCount,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  },

  // Database statistics
  async getStats() {
    await connectDB();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    return {
      totalUsers,
      activeUsers,
      usersByRole,
      timestamp: new Date().toISOString()
    };
  }
};

export default dbUtils; 