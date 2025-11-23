// controllers/sellerController.js
import mongoose from "mongoose";
import Artwork from "../models/Artwork.js";
import Seller from "../models/sellerModel.js";

const tryObjectId = (val) => {
  try {
    return mongoose.Types.ObjectId.isValid(val) ? mongoose.Types.ObjectId(val) : null;
  } catch (e) {
    return null;
  }
};

// ========== GET SELLER ==========
export const getSeller = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    // find seller by userId
    let seller = await Seller.findOne({ userId });

    // auto-create seller if missing
    if (!seller) {
      seller = await Seller.create({
        userId,
        name: "New Seller",
        bio: "",
        avatar: ""
      });
    }

    // Count artworks uploaded by seller
    const idAsObjectId = tryObjectId(userId);
    const totalArtworks = await Artwork.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId }
      ]
    });

    // Return seller + artworks count ONLY
    res.json({
      ...seller.toObject(),
      totalArtworks
    });

  } catch (err) {
    console.error("Seller dashboard fetch error", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ========== UPDATE SELLER ==========
export const updateSeller = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const { name, bio, avatar } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ message: "Invalid name" });
    }

    const update = {
      name: name.trim(),
      bio: bio?.trim() || ""
    };

    if (avatar) update.avatar = avatar;

    const updated = await Seller.findOneAndUpdate(
      { userId },
      { $set: update, $setOnInsert: { userId } },
      { new: true, upsert: true }
    );

    // Count artworks (optional but useful)
    const idAsObjectId = tryObjectId(userId);
    const totalArtworks = await Artwork.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId }
      ]
    });

    res.json({
      ...updated.toObject(),
      totalArtworks
    });

  } catch (err) {
    console.error("Seller update error", err);
    res.status(500).json({ message: "Server error" });
  }
};
