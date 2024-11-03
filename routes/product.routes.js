import express from "express";
import logger from "../config/logger.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers.js";
const router = express.Router();

// Get all
router.get("/", getProducts);

// Get a product
router.get("/:id", getProduct);

// Add
router.post("/", addProduct);

// Update
router.put("/:id", updateProduct);

// Delete
router.delete("/:id", deleteProduct);

export default router;
