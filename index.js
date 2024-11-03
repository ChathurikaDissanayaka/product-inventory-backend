import express from "express";
import connectDb from "./config/db.js";
import logger from "./config/logger.js";
import productRoutes from "./routes/product.routes.js";

const PORT = process.env.PORT || 4000;

const app = express();

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(`Failed to start the app due to an error: ${error.message}`);
    process.exit(1);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
