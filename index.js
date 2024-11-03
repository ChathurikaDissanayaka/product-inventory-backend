import express from "express";
import connectDb from "./config/db.js";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 3000;

const app = express();

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(
      `Failed to start the app due to database connection error: ${error.message}`
    );
    process.exit(1);
  });

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});
