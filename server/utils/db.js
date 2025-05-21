import CONFIG from "./config.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(CONFIG.MONGO_URL)
        console.log(`Connected to mongodb: ${CONFIG.MONGO_URL}`)
    } catch (e) {
        console.error(`Error connecting to mongodb: ${e}`)
    }
}

export default connectDB;