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
import './SellerDashboard.css';

const API_BASE = process.env.REACT_APP_API_BASE || "https://aurtistiq.onrender.com";

const initialSalesData = [
  { month: "Jan", sold: 2 },
  { month: "Feb", sold: 5 },
  { month: "Mar", sold: 3 },
  { month: "Apr", sold: 7 },
  { month: "May", sold: 4 },
  { month: "Jun", sold: 6 }
];

const DEFAULT_AVATAR = "/default-avatar.png";

export default function SellerDashboard() {
  const [showModal, setShowModal] = useState(false);

  const [sellerData, setSellerData] = useState({
    name: "Loading...",
    bio: "",
    avatar: DEFAULT_AVATAR,
    totalArtworks: 0
  });

  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(DEFAULT_AVATAR);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (e) {
      return null;
    }
  })();

  // Use ONLY the real MongoDB id
  const userId = user?._id;

  // ======================
  // LOAD SELLER DATA
  // ======================
  useEffect(() => {
    if (!userId) return;

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
          totalArtworks: data.totalArtworks || 0
        });

        setFormData({
          name: data.name || "",
          bio: data.bio || ""
        });

        setPreviewAvatar(data.avatar || DEFAULT_AVATAR);

      } catch (err) {
        console.error("Error loading seller:", err);
      }
    }

    loadSeller();
    return () => { mounted = false; };
  }, [userId]);


  // ======================
  // INPUT HANDLER (FIXED)
  // ======================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };


  // ======================
  // FORM VALIDATION
  // ======================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.bio.trim())
      newErrors.bio = "Bio is required";
    else if (formData.bio.trim().length < 20)
      newErrors.bio = "Bio must be at least 20 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // ======================
  // AVATAR PREVIEW
  // ======================
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setPreviewAvatar(sellerData.avatar);
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewAvatar(reader.result);
    reader.readAsDataURL(file);
  };


  // ======================
  // SAVE PROFILE
  // ======================
  const handleSave = async () => {
    if (!validateForm()) return;
    if (!userId) return alert("Not logged in");

    setLoadingSave(true);

    try {
      let avatarToSend = previewAvatar || sellerData.avatar;

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
        alert("Failed to save");
        setLoadingSave(false);
        return;
      }

      const updated = await res.json();

      setSellerData({
        name: updated.name,
        bio: updated.bio,
        avatar: updated.avatar || DEFAULT_AVATAR,
        totalArtworks: updated.totalArtworks || 0
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSaveSuccess(false);
      }, 1200);

    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoadingSave(false);
    }
  };


  // Close modal
  const handleCancel = () => {
    setFormData({ name: sellerData.name, bio: sellerData.bio });
    setPreviewAvatar(sellerData.avatar);
    setSelectedFile(null);
    setErrors({});
    setShowModal(false);
  };


  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-logo">ArtGallery</h1>
          <div className="header-user">
            <img src={sellerData.avatar} alt="seller avatar" className="header-avatar" />
            <span>{sellerData.name}</span>
          </div>
        </div>
      </header>

      <div className="dashboard-container">

        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="dashboard-title">
          Seller Dashboard
        </motion.h2>

        {/* TOTAL ARTWORKS */}
        <div className="stats-grid">
          <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="stat-card-header">
              <h3>Total Artworks</h3>
              <Package size={24} color="#8b5e3c" />
            </div>
            <p className="stat-number">{sellerData.totalArtworks}</p>
            <p className="stat-label">Listed in gallery</p>
          </motion.div>
        </div>

        {/* GRAPH */}
        <motion.div className="graph-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="graph-title">Monthly Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={initialSalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5d5c5" />
              <XAxis dataKey="month" stroke="#8b5e3c" />
              <YAxis stroke="#8b5e3c" />
              <Tooltip />
              <Line type="monotone" dataKey="sold" stroke="#8b5e3c" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ABOUT SELLER */}
        <motion.div className="profile-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="profile-title">About Seller</h3>
          <div className="profile-top">
            <img src={sellerData.avatar} alt="avatar" className="profile-avatar" />
            <p className="profile-bio">{sellerData.bio}</p>
          </div>
        </motion.div>

        {/* EDIT BUTTON */}
        <div className="edit-btn-wrapper">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)} className="edit-profile-btn">
            <Edit2 size={20} /> Edit Profile
          </motion.button>
        </div>
      </div>


      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCancel}>
            <motion.div className="modal-box" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()}>

              <div className="modal-header">
                <h2 className="modal-title">Edit Seller Details</h2>
                <button onClick={handleCancel} className="modal-close-btn"><X /></button>
              </div>

              {/* AVATAR */}
              <div className="form-group">
                <label className="form-label">Avatar</label>
                <div className="avatar-row">
                  <img src={previewAvatar} alt="preview" className="avatar-preview" />
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              {/* NAME */}
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`input-field ${errors.name ? "input-error" : ""}`} />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              {/* BIO */}
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={5} className={`input-field textarea-field ${errors.bio ? "input-error" : ""}`} />
                {errors.bio && <p className="error-message">{errors.bio}</p>}
              </div>

              {/* ACTION BUTTONS */}
              <div className="modal-actions">
                <motion.button onClick={handleCancel} className="cancel-btn">Cancel</motion.button>
                <motion.button onClick={handleSave} className={`save-btn ${saveSuccess ? "save-btn-success" : ""}`} disabled={loadingSave}>
                  {loadingSave ? "Saving..." : saveSuccess ? (<><Check /> Saved!</>) : "Save Changes"}
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
