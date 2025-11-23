import express from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);

// FIXED: now both userId & artworkId are sent
router.delete("/:userId/:artworkId", removeFromWishlist);

router.get("/:userId", getWishlist);

export default router;
