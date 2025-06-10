import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { env } from "./env.js";
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/urlShortener");
        console.log("Database connected successfully");
        mongoose.set("debug", true);
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

export { connectDB };