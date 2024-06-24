import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI as string;
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;