import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // link to your users collection
  name: { type: String, required: true },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" }, // URL or path to image
  totalArtworks: { type: Number, default: 0 },
  artworksSold: { type: Number, default: 0 },
  pendingOrders: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);
