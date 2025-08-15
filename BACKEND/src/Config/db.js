import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URL;

        await mongoose.connect(mongoURI);
        
        console.log("Database connected successfully");
    }
    catch(error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}