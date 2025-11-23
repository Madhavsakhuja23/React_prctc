import Seller from "../models/Seller.js";

/**
 * GET seller by userId (param :userId)
 */
export const getSellerByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    let seller = await Seller.findOne({ userId });
    // If not found, optionally create a basic record (so frontend always has something)
    if (!seller) {
      seller = await Seller.create({
        userId,
        name: "Unnamed Seller",
        bio: "",
        avatar: "",
        totalArtworks: 0,
        artworksSold: 0,
        pendingOrders: 0,
      });
    }

    res.json(seller);
  } catch (err) {
    console.error("Get seller error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * PUT update seller by userId (param :userId)
 * Body: { name, bio, avatar, totalArtworks?, artworksSold?, pendingOrders? }
 */
export const updateSellerByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const update = {};
    const allowed = ["name", "bio", "avatar", "totalArtworks", "artworksSold", "pendingOrders"];
    allowed.forEach((k) => {
      if (typeof req.body[k] !== "undefined") update[k] = req.body[k];
    });

    const seller = await Seller.findOneAndUpdate({ userId }, { $set: update }, { new: true, upsert: true });
    res.json(seller);
  } catch (err) {
    console.error("Update seller error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
