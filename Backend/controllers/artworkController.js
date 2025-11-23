import Artwork from "../models/Artwork.js";

// ----------------- CREATE ARTWORK -----------------
export const createArtwork = async (req, res) => {
  try {
    const newArt = await Artwork.create(req.body);
    res.status(201).json(newArt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ----------------- GET ALL ARTWORKS -----------------
export const getAllArtworks = async (req, res) => {
  try {
    const data = await Artwork.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------- GET SINGLE ARTWORK -----------------
export const getArtworkById = async (req, res) => {
  try {
    const art = await Artwork.findById(req.params.id);
    if (!art) return res.status(404).json({ message: "Artwork not found" });

    res.json(art);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// ----------------- UPDATE ARTWORK -----------------
export const updateArtwork = async (req, res) => {
  try {
    const updated = await Artwork.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Artwork not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// ----------------- DELETE ARTWORK -----------------
export const deleteArtwork = async (req, res) => {
  try {
    const deleted = await Artwork.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Artwork not found" });

    res.json({ message: "Artwork deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};
