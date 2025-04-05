import express from "express";
import * as cartController from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.put("/:itemId", cartController.updateCartItem);
router.delete("/:itemId", cartController.removeFromCart);

export default router;
