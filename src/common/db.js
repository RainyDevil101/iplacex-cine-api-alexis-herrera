import mongoose from 'mongoose';
import { URI_MONGODB } from './consts/consts.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(URI_MONGODB);
    console.log('Connection to MongoDB Atlas established correctly with Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    throw error;
  }
};
