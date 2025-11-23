import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: "current" },
    image: { type: String, required: true }, // base64 or URL
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Artwork", artworkSchema);
