import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all cart routes
router.use(authMiddleware);

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);
router.put("/:productId", updateCartItem);
router.delete("/", clearCart);

export default router;
