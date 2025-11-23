// controllers/sellerController.js
import mongoose from "mongoose";
import Artwork from "../models/artworkModel.js";
import Order from "../models/orderModel.js";
import Seller from "../models/sellerModel.js";

const tryObjectId = (val) => {
  try {
    return mongoose.Types.ObjectId.isValid(val) ? mongoose.Types.ObjectId(val) : null;
  } catch (e) {
    return null;
  }
};

export const getSeller = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    // find by userId
    let seller = await Seller.findOne({ userId });

    // If seller does not exist, create a default one
    if (!seller) {
      seller = await Seller.create({
        userId,
        name: "New Seller",
        bio: "",
        avatar: ""
      });
    }

    // Count total artworks uploaded by this seller.
    // Artwork schema may store seller as sellerId (string or ObjectId) or sellerUserId. We'll try both.
    const idAsObjectId = tryObjectId(userId);
    const totalArtworks = await Artwork.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId },
      ]
    });

    // Count artworks sold (orders with status "completed")
    const artworksSold = await Order.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId },
      ],
      status: "completed"
    });

    // Count pending orders
    const pendingOrders = await Order.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId },
      ],
      status: "pending"
    });

    // Return seller document and counts
    res.json({
      ...seller.toObject(),
      totalArtworks,
      artworksSold,
      pendingOrders
    });
  } catch (err) {
    console.error("Seller dashboard fetch error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const { name, bio, avatar } = req.body;

    // Basic validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ message: "Invalid name" });
    }

    const update = {
      name: name.trim(),
      bio: (bio && typeof bio === "string") ? bio.trim() : "",
    };
    if (avatar) update.avatar = avatar;

    // findOneAndUpdate with upsert: create if not exists
    const updated = await Seller.findOneAndUpdate(
      { userId },
      { $set: update, $setOnInsert: { userId } },
      { new: true, upsert: true }
    );

    // Optionally, update counts if you want real-time stored stats (or keep them computed in GET)
    // We'll compute counts and attach to response
    const idAsObjectId = tryObjectId(userId);
    const totalArtworks = await Artwork.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId },
      ]
    });
    const artworksSold = await Order.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId },
      ],
      status: "completed"
    });
    const pendingOrders = await Order.countDocuments({
      $or: [
        { sellerId: userId },
        ...(idAsObjectId ? [{ sellerId: idAsObjectId }] : []),
        { sellerUserId: userId },
      ],
      status: "pending"
    });

    res.json({
      ...updated.toObject(),
      totalArtworks,
      artworksSold,
      pendingOrders
    });
  } catch (err) {
    console.error("Seller update error", err);
    res.status(500).json({ message: "Server error" });
  }
};
