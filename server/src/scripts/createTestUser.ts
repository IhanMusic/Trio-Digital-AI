import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-manager');
    console.log('Connected to MongoDB');

    const testUser = new User({
      email: 'john.doe@example.com',
      password: 'Password123!',
      name: 'John Doe',
      role: 'owner',
      subscription: {
        plan: 'free',
        status: 'active'
      }
    });

    await testUser.save();
    console.log('Test user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
