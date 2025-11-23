import express from "express";
import {
  createArtwork,
  getAllArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork
} from "../controllers/artworkController.js";

const router = express.Router();

// CREATE
router.post("/", createArtwork);

// READ
router.get("/all", getAllArtworks);
router.get("/:id", getArtworkById);

// UPDATE (FIXED)
router.put("/:id", updateArtwork);

// DELETE (FIXED)
router.delete("/:id", deleteArtwork);

export default router;
