import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: "current" },
  image: { type: String, required: true },  // Base64 Image
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Artwork", artworkSchema);
