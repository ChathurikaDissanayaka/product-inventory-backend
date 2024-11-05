import logger from "../config/logger.js";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    logger.info("Products fetched successfuly");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    logger.error("Error fetching products");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      logger.error("Product not found");
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    logger.info("Product fetched successfuly");
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    logger.error("Error fetching product");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
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
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updatedProduct) {
      logger.error("Product not found");
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    logger.info("Product updated successfuly");
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    logger.error("Error updating product");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
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
};
