import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        await mongoose.connect(mongoUri);
        console.log('DB is connected');
    } catch (error) {
        console.log('Database connection error:', error);
        process.exit(1);
    }
}

export default connectDB;