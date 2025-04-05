import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(12);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
