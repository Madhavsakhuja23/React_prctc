// SellerDashboard.jsx (updated)
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
import { User, Package, Clock, TrendingUp, Edit2, X, Check } from "lucide-react";
import './SellerDashboard.css';

const API_BASE = "https://aurtistiq.onrender.com"; // keep your API base
const initialSalesData = [
  { month: "Jan", sold: 2 },
  { month: "Feb", sold: 5 },
  { month: "Mar", sold: 3 },
  { month: "Apr", sold: 7 },
  { month: "May", sold: 4 },
  { month: "Jun", sold: 6 }
];

// Default avatar path (the uploaded asset from your environment)
const DEFAULT_AVATAR = "/mnt/data/95dbd176-aeee-4a5e-bb39-59d0e07d6992.png";

export default function SellerDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [sellerData, setSellerData] = useState({
    name: "Loading...",
    bio: "",
    avatar: DEFAULT_AVATAR,
    totalArtworks: 0,
    artworksSold: 0,
    pendingOrders: 0
  });

  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  // read userId from localStorage (the same shape you used)
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (e) { return null; }
  })();
  const userId = user?.id || user?._id || null;

  useEffect(() => {
    if (!userId) {
      // no user -> keep default
      return;
    }
    let mounted = true;
    async function loadSeller() {
      try {
        const res = await fetch(`${API_BASE}/api/sellers/${encodeURIComponent(userId)}`);
        if (!res.ok) {
          console.warn("Failed to load seller profile", res.status);
          return;
        }
        const data = await res.json();
        if (!mounted) return;
        setSellerData({
          name: data.name || "Unnamed Seller",
          bio: data.bio || "",
          avatar: data.avatar || DEFAULT_AVATAR,
          totalArtworks: data.totalArtworks || 0,
          artworksSold: data.artworksSold || 0,
          pendingOrders: data.pendingOrders || 0
        });
        setFormData({ name: data.name || "", bio: data.bio || "" });
        setPreviewAvatar(data.avatar || DEFAULT_AVATAR);
      } catch (err) {
        console.error("Error loading seller:", err);
      }
    }
    loadSeller();
    return () => { mounted = false; };
  }, [userId]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    else if (formData.bio.trim().length < 20) newErrors.bio = "Bio must be at least 20 characters";
    else if (formData.bio.trim().length > 500) newErrors.bio = "Bio must be less than 500 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // handle avatar file selection & preview (client-only)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setPreviewAvatar(sellerData.avatar || DEFAULT_AVATAR);
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // Save: PUT to backend. If a file is selected we send the avatar as a base64 string (simple approach).
  // In production you likely want a multipart upload to S3 / cloudinary or server-side file storage.
  const handleSave = async () => {
    if (!validateForm()) return;
    if (!userId) {
      alert("Not logged in.");
      return;
    }

    setLoadingSave(true);
    try {
      let avatarToSend = sellerData.avatar || DEFAULT_AVATAR;

      // If user selected a file, we can send it as base64 (server stores the string),
      // or you can implement a dedicated file endpoint. Here we send as dataURL.
      if (selectedFile && previewAvatar) {
        avatarToSend = previewAvatar; // data URL
      }

      const body = {
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        avatar: avatarToSend
      };

      const res = await fetch(`${API_BASE}/api/sellers/${encodeURIComponent(userId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Save failed:", res.status, text);
        alert("Failed to save profile.");
        setLoadingSave(false);
        return;
      }

      const updated = await res.json();
      setSellerData({
        name: updated.name,
        bio: updated.bio,
        avatar: updated.avatar || DEFAULT_AVATAR,
        totalArtworks: updated.totalArtworks || 0,
        artworksSold: updated.artworksSold || 0,
        pendingOrders: updated.pendingOrders || 0
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSaveSuccess(false);
      }, 1200);
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving profile.");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: sellerData.name, bio: sellerData.bio });
    setPreviewAvatar(sellerData.avatar || DEFAULT_AVATAR);
    setSelectedFile(null);
    setErrors({});
    setShowModal(false);
  };

  const totalRevenue = sellerData.artworksSold * 150;

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-logo">ArtGallery</h1>
          <div className="header-user">
            <img src={sellerData.avatar || DEFAULT_AVATAR} alt="seller avatar" className="header-avatar" />
            <span>{sellerData.name}</span>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="dashboard-title">
          Seller Dashboard
        </motion.h2>

        <div className="stats-grid">
          <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} whileHover={{ y: -4 }}>
            <div className="stat-card-header"><h3>Total Artworks</h3><Package size={24} color="#8b5e3c" /></div>
            <p className="stat-number">{sellerData.totalArtworks}</p>
            <p className="stat-label">Listed in gallery</p>
          </motion.div>

          <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} whileHover={{ y: -4 }}>
            <div className="stat-card-header"><h3>Artworks Sold</h3><TrendingUp size={24} color="#8b5e3c" /></div>
            <p className="stat-number">{sellerData.artworksSold}</p>
            <p className="stat-label">${totalRevenue.toLocaleString()} revenue</p>
          </motion.div>

          <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={{ y: -4 }}>
            <div className="stat-card-header"><h3>Pending Orders</h3><Clock size={24} color="#8b5e3c" /></div>
            <p className="stat-number">{sellerData.pendingOrders}</p>
            <p className="stat-label">Awaiting fulfillment</p>
          </motion.div>
        </div>

        <motion.div className="graph-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="graph-title">Monthly Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={initialSalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5d5c5" />
              <XAxis dataKey="month" stroke="#8b5e3c" />
              <YAxis stroke="#8b5e3c" />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5d5c5', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="sold" stroke="#8b5e3c" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="profile-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="profile-title">About Seller</h3>
          <div className="profile-top">
            <img src={sellerData.avatar || DEFAULT_AVATAR} alt="avatar" className="profile-avatar" />
            <div>
              <p className="profile-bio">{sellerData.bio}</p>
            </div>
          </div>
        </motion.div>

        <div className="edit-btn-wrapper">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)} className="edit-profile-btn">
            <Edit2 size={20} />
            Edit Profile
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-backdrop" onClick={handleCancel}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="modal-box">
              <div className="modal-header">
                <h2 className="modal-title">Edit Seller Details</h2>
                <button onClick={handleCancel} className="modal-close-btn"><X size={24} color="#8b5e3c" /></button>
              </div>

              <div className="form-group">
                <label className="form-label">Avatar</label>
                <div className="avatar-row">
                  <img src={previewAvatar || sellerData.avatar || DEFAULT_AVATAR} alt="preview" className="avatar-preview" />
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className={`input-field ${errors.name ? "input-error" : ""}`} />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Tell us about yourself" rows={5} className={`input-field textarea-field ${errors.bio ? "input-error" : ""}`} />
                <div className="bio-footer">
                  {errors.bio && <p className="error-message">{errors.bio}</p>}
                  <p className={`char-count ${formData.bio.length > 500 ? "char-count-error" : ""}`}>{formData.bio.length}/500</p>
                </div>
              </div>

              <div className="modal-actions">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCancel} className="cancel-btn">Cancel</motion.button>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} className={`save-btn ${saveSuccess ? "save-btn-success" : ""}`} disabled={loadingSave}>
                  {loadingSave ? "Saving..." : saveSuccess ? (<><Check size={18} /> Saved!</>) : "Save Changes"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
