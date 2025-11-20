import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";import artworkRoutes from "./routes/artworkRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
// import cors from "cors";

app.use(cors({
  origin: "*",  // or "https://your-vercel-domain"
  credentials: true,
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/artworks", artworkRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
