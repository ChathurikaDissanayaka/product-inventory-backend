import express from "express";
import connectDb from "./config/db.js";
import logger from "./config/logger.js";
import Product from "./models/product.model.js";

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

// Get all
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    logger.info("Products fetched successfuly");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    logger.error("Error fetching products");
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get a product
app.get("/api/products/:id", async (req, res) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id);
    logger.info("Product fetched successfuly");
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    logger.error("Error fetching product");
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Add
app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.quantity || !product.price || !product.image) {
    logger.error("Missing one or more required fields");
    return res
      .status(400)
      .json({ success: false, message: "Missing one or more required fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    logger.info("Product added successfuly");
    res.status(201).json({
      success: true,
      message: "Product added successfuly",
      data: newProduct,
    });
  } catch (error) {
    logger.error("Error adding product");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Delete
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      logger.error("Product not found");
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    logger.info("Product deleted successfuly");
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    logger.error("Error deleting product");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});
