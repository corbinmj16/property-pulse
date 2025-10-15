import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    // Ensure only fields specified in schema will be saved to DB
    mongoose.set('strictQuery', true)

    // If the DB is already connected, don't connect again
    if (connected) {
        console.log('mongodb is connected');
        return
    }

    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
    } catch (error) {
        console.log(error);
    }
}

export default connectDB