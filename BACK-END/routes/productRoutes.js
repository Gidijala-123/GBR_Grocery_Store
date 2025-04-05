// BACK-END/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:category", getProductsByCategory);

export default router;
