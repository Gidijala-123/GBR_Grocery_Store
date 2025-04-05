import express from "express";
import {
  getProducts,
  getProductsByCategory,
  getFeaturedProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:categoryId", getProductsByCategory);

export default router;
