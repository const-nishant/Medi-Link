import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define DB_URI in your environment variables inside .env.<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToDatabase;