import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  category: { type: String, required: true },
  image: String,
  rating: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
