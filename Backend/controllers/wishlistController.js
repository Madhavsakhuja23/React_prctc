import Wishlist from "../models/wishlistModel.js";

// ----------------------
// ADD TO WISHLIST
// ----------------------
export const addToWishlist = async (req, res) => {
  try {
    const { userId, artworkId, snapshot } = req.body;

    if (!userId || !artworkId || !snapshot) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await Wishlist.findOne({ userId, artworkId });
    if (exists) return res.json({ message: "Already in wishlist" });

    const newWish = await Wishlist.create({ userId, artworkId, snapshot });
    res.json(newWish);
  } catch (err) {
    console.error("Add wishlist error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ----------------------
// GET WISHLIST BY USER
// ----------------------
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Wishlist.find({ userId });

    res.json(items);
  } catch (err) {
    console.error("Get wishlist error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ----------------------
// REMOVE FROM WISHLIST
// ----------------------
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, artworkId } = req.params;

    await Wishlist.findOneAndDelete({ userId, artworkId });

    res.json({ message: "Removed" });
  } catch (err) {
    console.error("Remove wishlist error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
