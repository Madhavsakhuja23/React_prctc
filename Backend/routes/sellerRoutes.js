import express from "express";
import { getSellerByUserId, updateSellerByUserId } from "../controllers/sellerController.js";

const router = express.Router();

// GET /api/sellers/:userId
router.get("/:userId", getSellerByUserId);

// PUT /api/sellers/:userId
router.put("/:userId", updateSellerByUserId);

export default router;
