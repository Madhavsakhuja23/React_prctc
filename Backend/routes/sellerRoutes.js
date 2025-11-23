// routes/sellerRoutes.js
import express from "express";
import { getSeller, updateSeller } from "../controllers/sellerController.js";

const router = express.Router();

// Use userId as the route param because seller documents are keyed by userId
router.get("/:userId", getSeller);
router.put("/:userId", updateSeller);

export default router;
