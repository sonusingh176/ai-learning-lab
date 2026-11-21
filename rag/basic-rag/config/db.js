import mongoose from "mongoose";



const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes_saas';

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5 sec me try kar ke haar maan lo, taaki app "hang" na lage
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // 1 = exit code for "something went wrong"
  }
};

export default connectDB;