// SellerDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Package, Edit2, X, Check } from "lucide-react";
import "./SellerDashboard.css";

const API_BASE = process.env.REACT_APP_API_BASE || "https://aurtistiq.onrender.com";
const DEFAULT_AVATAR = "/default-avatar.png";

const initialSalesData = [
  { month: "Jan", sold: 2 },
  { month: "Feb", sold: 5 },
  { month: "Mar", sold: 3 },
  { month: "Apr", sold: 7 },
  { month: "May", sold: 4 },
  { month: "Jun", sold: 6 }
];

export default function SellerDashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // FIX: Correct seller lookup ID
  const userId = storedUser?._id || storedUser?.id;

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn || !userId) {
      window.location.href = "/login";
    }
  }, [isLoggedIn, userId]);

  const [showModal, setShowModal] = useState(false);

  const [sellerData, setSellerData] = useState({
    name: "Loading...",
    bio: "",
    avatar: DEFAULT_AVATAR,
    totalArtworks: 0
  });

  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(DEFAULT_AVATAR);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  // Load seller profile
  useEffect(() => {
    if (!userId) return;

    async function fetchSeller() {
      try {
        const res = await fetch(`${API_BASE}/api/sellers/${userId}`);
        const data = await res.json();

        setSellerData({
          name: data.name,
          bio: data.bio,
          avatar: data.avatar || DEFAULT_AVATAR,
          totalArtworks: data.totalArtworks || 0
        });

        setFormData({
          name: data.name,
          bio: data.bio
        });

        setPreviewAvatar(data.avatar || DEFAULT_AVATAR);
      } catch (err) {
        console.error("Failed to load seller:", err);
      }
    }

    fetchSeller();
  }, [userId]);

  // Input handler
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Avatar preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => setPreviewAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // Save seller profile
  const handleSave = async () => {
    if (!formData.name || !formData.bio) {
      alert("Name & Bio are required");
      return;
    }

    setLoadingSave(true);

    const body = {
      name: formData.name,
      bio: formData.bio,
      avatar: previewAvatar
    };

    try {
      const res = await fetch(`${API_BASE}/api/sellers/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const updated = await res.json();
      setSellerData(updated);
      setSaveSuccess(true);

      setTimeout(() => {
        setShowModal(false);
        setSaveSuccess(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to save:", err);
    }

    setLoadingSave(false);
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-logo">ArtGallery</h1>

          <div className="header-user">
            <img src={sellerData.avatar} alt="seller avatar" className="header-avatar small-avatar" />
            <span>{sellerData.name}</span>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <h2 className="dashboard-title">Seller Dashboard</h2>

        {/* Total artworks */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <h3>Total Artworks</h3>
              <Package size={24} color="#8b5e3c" />
            </div>
            <p className="stat-number">{sellerData.totalArtworks}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="graph-container">
          <h3 className="graph-title">Monthly Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={initialSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sold" stroke="#8b5e3c" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* About Section */}
        <div className="profile-section">
          <h3 className="profile-title">About Seller</h3>
          <div className="profile-top">
            <img src={sellerData.avatar} alt="avatar" className="profile-avatar small-avatar" />
            <p className="profile-bio">{sellerData.bio}</p>
          </div>
        </div>

        <div className="edit-btn-wrapper">
          <button className="edit-profile-btn" onClick={() => setShowModal(true)}>
            <Edit2 size={20} /> Edit Profile
          </button>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-backdrop" onClick={() => setShowModal(false)}>
            <motion.div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Seller Details</h2>
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                  <X />
                </button>
              </div>

              {/* Avatar */}
              <div className="form-group">
                <label>Avatar</label>
                <img src={previewAvatar} alt="preview" className="avatar-preview small-avatar" />
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              {/* Name */}
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={formData.name} onChange={handleInputChange} />
              </div>

              {/* Bio */}
              <div className="form-group">
                <label>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
              </div>

              {/* Actions */}
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>

                <button className={`save-btn ${saveSuccess ? "save-btn-success" : ""}`}
                  onClick={handleSave}>
                  {loadingSave ? "Saving..." : saveSuccess ? <><Check /> Saved</> : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
