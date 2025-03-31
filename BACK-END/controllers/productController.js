import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany();

    const products = [
      // Sample products data matching the frontend structure
      {
        name: "Organic Grapes",
        price: 4.99,
        originalPrice: 6.99,
        category: "vegetables",
        image: "🍇",
        rating: 4.5,
      },
      // Other products...
    ];

    await Product.insertMany(products);
    res.json({ message: "Products seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
