import express from "express";
import mongoose from "mongoose";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 3000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    logger.info("Database connected");
    app.listen(PORT, () => {
      logger.info(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => logger.error(err.message));
