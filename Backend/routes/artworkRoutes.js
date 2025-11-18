import express from "express";
import Artwork from "../models/Artwork.js";

const router = express.Router();

// Upload Artwork API
router.post("/upload", async (req, res) => {
  try {
    const { title, desc, category, status, image, sellerId } = req.body;

    if (!title || !desc || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const artwork = new Artwork({
      title,
      desc,
      category,
      status,
      image,     // Base64 image stored
      sellerId,
    });

    await artwork.save();

    res.status(201).json({
      message: "Artwork uploaded successfully",
      artwork
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.status(200).json(artworks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ message: "Not found" });
    res.json(artwork);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
