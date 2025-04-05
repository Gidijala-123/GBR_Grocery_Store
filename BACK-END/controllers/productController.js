import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("Products from DB:", products);
    if (products.length === 0) {
      console.warn("No products found in database");
      return res.status(200).json({
        success: true,
        message: "No products found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products in this category" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
