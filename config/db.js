import mongoose from "mongoose";
import logger from "./logger.js";

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_DB_URL);
    logger.info("Database connected");
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    throw error;
  }
};

export default connectDb;
