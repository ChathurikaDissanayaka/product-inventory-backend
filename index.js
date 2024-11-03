import express from "express";
import connectDb from "./config/db.js";
import logger from "./config/logger.js";
import Product from "./models/product.model.js";

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

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if(!product.name || !product.quantity || !product.price || !product.image){
    logger.error("Missing required fileds")
    return res.status(400).json({success:false, message: "Missing required fileds"});
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    logger.info("Product added successfuly");
    res.status(201).json({success:true, message: "Product added successfuly", data:newProduct});
  } catch (error) {
    logger.error("Error adding product")
    return res.status(500).json({success:false, message: "Server Error"});
  }
});
