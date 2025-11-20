import React, { useState } from "react";
import "./uploadAuction.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function UploadAuction() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "painting",
    status: "current",
    image: "",
  });
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const seller = JSON.parse(localStorage.getItem("user"));
    if (!seller) {
      toast.error("You must be logged in to upload artwork");
      return;
    }

    const dataToSend = {
      ...formData,
      sellerId: seller.id, // user _id from backend
    };

    try {
      const res = await fetch("https://aurtistiq.onrender.com/api/artworks/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success("🎨 Artwork Uploaded Successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Server error! Please try again.");
    }
  };


  return (
    <div className="upload-auction-container">
      <h2 className="upload-title">Upload a New Auction</h2>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Auction Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Describe the item..."
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="antique">Antique</option>
              <option value="digital">Digital Art</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="current">Current</option>
              <option value="upcoming">Upcoming</option>
              {/* <option value="past">Past</option> */}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImage} required />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="upload-btn">
          Upload Auction
        </button>
      </form>
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

    </div>
  );
}
