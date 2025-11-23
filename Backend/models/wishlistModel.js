import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  artworkId: { type: String, required: true },

  snapshot: {
    title: String,
    artist: String,
    image: String,
    gallery: String,
    price: String,
    size: String,
  }
}, { timestamps: true });

// Prevent duplicate wishlist entries for the same user
wishlistSchema.index({ userId: 1, artworkId: 1 }, { unique: true });

export default mongoose.model("Wishlist", wishlistSchema);
