import Seller from "../models/sellerModel.js";
import Artwork from "../models/Artwork.js";

export const getSeller = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    // Find seller using userId
    let seller = await Seller.findOne({ userId });

    // If not exist — create once
    if (!seller) {
      seller = await Seller.create({
        userId,
        name: "New Seller",
        bio: "",
        avatar: "/default-avatar.png"
      });
    }

    // Count artworks by this seller
    const totalArtworks = await Artwork.countDocuments({ sellerId: userId });

    res.json({
      ...seller.toObject(),
      totalArtworks
    });

  } catch (err) {
    console.error("GET seller error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, bio, avatar } = req.body;

    const updated = await Seller.findOneAndUpdate(
      { userId },
      { name, bio, avatar },
      { new: true }
    );

    const totalArtworks = await Artwork.countDocuments({ sellerId: userId });

    res.json({
      ...updated.toObject(),
      totalArtworks
    });

  } catch (err) {
    console.error("UPDATE seller error", err);
    res.status(500).json({ message: "Server error" });
  }
};
