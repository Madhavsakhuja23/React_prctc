import React, { useState } from "react";
import "./uploadAuction.css";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing auctions from localStorage
    const existing = JSON.parse(localStorage.getItem("sellerAuctions")) || [];

    // Add new auction
    const newAuction = { ...formData, id: Date.now() };
    localStorage.setItem("sellerAuctions", JSON.stringify([...existing, newAuction]));

    // Reset form
    setFormData({ title: "", desc: "", category: "painting", status: "current", image: "" });
    setPreview("");

    // Redirect to Home
    navigate("/");
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
              <option value="past">Past</option>
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
    </div>
  );
}
