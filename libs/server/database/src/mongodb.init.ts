import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    const path = process.env['NX_PUBLIC_MONGODB_DATABASE'] ?? '';
    await mongoose.connect(path);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
  }
};
