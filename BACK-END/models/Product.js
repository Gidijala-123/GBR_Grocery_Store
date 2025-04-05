import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  originalPrice: Number,
  category: String,
  image: String, // Should match emoji format (e.g., "🍇")
  rating: Number,
});

export default mongoose.model("Product", productSchema);
