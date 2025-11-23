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
import { Package, Edit2, X, Check, LogOut } from "lucide-react";
import "./SellerDashboard.css";

// Use uploaded asset as logo (transform path to URL in your environment if needed)
const SITE_LOGO = "/mnt/data/ff82e51c-aa3c-4f1e-8903-4cfc687429a6.png";

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
  const userId = storedUser?._id || storedUser?.id;

  // redirect if user not logged
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

  // load seller profile
  useEffect(() => {
    if (!userId) return;

    async function fetchSeller() {
      try {
        const res = await fetch(`${API_BASE}/api/sellers/${userId}`);
        const data = await res.json();

        // defensive: if server returns error object
        if (!data || data.message) {
          console.warn("Seller fetch returned:", data);
          return;
        }

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
        console.error("Failed to load seller:", err);
      }
    }

    fetchSeller();
  }, [userId]);

  // input handler
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // avatar preview
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // save profile
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
      setSellerData((prev) => ({
        ...prev,
        name: updated.name || formData.name,
        bio: updated.bio || formData.bio,
        avatar: updated.avatar || previewAvatar
      }));

      setSaveSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSaveSuccess(false);
      }, 900);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Save failed. Check console.");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-wrapper modern">
      <header className="dashboard-header modern-header">
        <div className="header-left">
          <img src={SITE_LOGO} alt="logo" className="site-logo" />
          <h1 className="header-title">ArtGallery</h1>
        </div>

        <div className="header-right">
          <button className="back-home-btn subtle" onClick={() => (window.location.href = "/")}>
            ← Home
          </button>

          <div className="header-user modern-user">
            <img src={sellerData.avatar} alt="seller avatar" className="header-avatar" />
            <div className="user-meta">
              <div className="user-name">{sellerData.name}</div>
              <div className="user-role">{storedUser?.role || "Seller"}</div>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <main className="dashboard-container modern-grid">
        <section className="left-column">
          <motion.div className="card profile-card" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div className="profile-top modern-profile">
              <img src={sellerData.avatar} alt="avatar" className="profile-avatar" />
              <div className="profile-info">
                <h3 className="profile-name">{sellerData.name}</h3>
                <p className="profile-bio">{sellerData.bio || "No bio yet — tell customers about yourself."}</p>
                <div className="profile-actions">
                  <button className="edit-profile-btn" onClick={() => setShowModal(true)}><Edit2 /> Edit Profile</button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="card stats-card" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
            <div className="stat-grid">
              <div className="stat-item">
                <div className="stat-title">Total Artworks</div>
                <div className="stat-value">{sellerData.totalArtworks}</div>
              </div>
              <div className="stat-item">
                <div className="stat-title">Est. Revenue</div>
                <div className="stat-value">${(sellerData.totalArtworks * 150).toLocaleString()}</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="right-column">
          <motion.div className="card chart-card" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h3 className="card-title">Monthly Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={initialSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#efe6de" />
                <XAxis dataKey="month" stroke="#7a5a46" />
                <YAxis stroke="#7a5a46" />
                <Tooltip wrapperStyle={{ borderRadius: 8 }} />
                <Line type="monotone" dataKey="sold" stroke="#b08968" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div className="card recent-card" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn">Add New Artwork</button>
              <button className="action-btn ghost">View Gallery</button>
              <button className="action-btn ghost" onClick={() => (window.location.href = "/orders")}>Orders</button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-box modern-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
              <div className="modal-header">
                <h2>Edit Seller Details</h2>
                <button className="modal-close-btn" onClick={() => setShowModal(false)}><X /></button>
              </div>

              <div className="modal-body">
                <div className="form-row">
                  <label className="form-label">Avatar</label>
                  <div className="avatar-row">
                    <img src={previewAvatar} alt="preview" className="avatar-preview" />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>

                <div className="form-row">
                  <label className="form-label">Name</label>
                  <input className="input-field" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your display name" />
                </div>

                <div className="form-row">
                  <label className="form-label">Bio</label>
                  <textarea className="input-field textarea-field" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Short bio about you"></textarea>
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button className={`save-btn ${saveSuccess ? "save-btn-success" : ""}`} onClick={handleSave} disabled={loadingSave}>
                  {loadingSave ? "Saving..." : saveSuccess ? (<><Check /> Saved</>) : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
