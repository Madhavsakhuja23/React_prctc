import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import "./sellerHistory.css";

function SellerHistory() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [uploadedArtworks, setUploadedArtworks] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // NEW

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // ---------------- LOAD SELLER ARTWORKS ----------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    async function loadArtworks() {
      try {
        const res = await fetch("https://aurtistiq.onrender.com/api/artworks/all");
        const all = await res.json();

        const sellerArt = all.filter(
          (item) =>
            item.sellerId &&
            String(item.sellerId) === String(user.id) &&
            isValidObjectId(item._id)
        );

        setUploadedArtworks(sellerArt);
      } catch (err) {
        console.log("Error loading artworks:", err);
      }
    }

    loadArtworks();
  }, []);

  // ------------------- SEARCH FILTER --------------------
  const filteredArtworks = uploadedArtworks.filter((art) => {
    const kw = searchKeyword.toLowerCase();
    return (
      art.title.toLowerCase().includes(kw) ||
      art.desc.toLowerCase().includes(kw)
    );
  });

  // ------------------- DELETE ARTWORK --------------------
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://aurtistiq.onrender.com/api/artworks/${id}`,
        { method: "DELETE" }
      );

      if (res.status === 200) {
        toast.success("Artwork deleted");
        setUploadedArtworks((prev) => prev.filter((a) => a._id !== id));
        setDeleteId(null);
      } else {
        toast.error("Error deleting artwork");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // ------------------- OPEN EDIT MODAL --------------------
  const handleEdit = (item) => {
    setEditItem(item);
  };

  // ------------------- SAVE EDIT --------------------------
  const handleSave = async (updatedValues) => {
    if (!editItem?._id || !isValidObjectId(editItem._id)) {
      toast.error("Invalid artwork ID — cannot update");
      return;
    }

    try {
      const res = await fetch(
        `https://aurtistiq.onrender.com/api/artworks/${editItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedValues),
        }
      );

      const result = await res.json();

      if (res.status === 200) {
        toast.success("Artwork updated!");

        setUploadedArtworks((prev) =>
          prev.map((a) =>
            a._id === editItem._id ? { ...a, ...updatedValues } : a
          )
        );

        setEditItem(null);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      toast.error("Server error (PUT failed)");
    }
  };

  // ------------------- JSX UI --------------------------
  return (
    <>
      <Navbar onSearch={(kw) => setSearchKeyword(kw.toLowerCase())} />

      <div className="collect-header">
        <h2>Your Uploaded Artworks</h2>
      </div>

      <section className="artsy-grid-section">
        <div className="artsy-masonry">
          {filteredArtworks.length === 0 ? (
            <p style={{ padding: "20px", color: "#555" }}>
              No artworks uploaded yet.
            </p>
          ) : (
            filteredArtworks.map((art) => (
              <div key={art._id} className="artsy-card">
                <div className="image-wrapper">
                  <img src={art.image} alt={art.title} loading="lazy" />

                  <button
                    className="delete-icon"
                    onClick={() => setDeleteId(art._id)} // ← CUSTOM POPUP
                  >
                    <RxCross2 />
                  </button>
                </div>

                <div className="artsy-card-info">
                  <div className="artist-row">
                    <p className="artist-name">You</p>

                    {isValidObjectId(art._id) && (
                      <button className="edit-btn" onClick={() => handleEdit(art)}>
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>

                  <p className="art-title">{art.title}</p>
                  <p className="art-gallery">{art.category}</p>

                  <div className={`status-badge ${art.status}`}>
                    {art.status.charAt(0).toUpperCase() + art.status.slice(1)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ---------------- DELETE CONFIRM MODAL ---------------- */}
      {deleteId && (
        <div className="delete-overlay" onClick={() => setDeleteId(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Artwork?</h3>
            <p>This action cannot be undone.</p>

            <div className="delete-actions">
              <button className="cancel-btn" onClick={() => setDeleteId(null)}>
                Cancel
              </button>

              <button className="delete-btn" onClick={() => handleDelete(deleteId)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {editItem && (
        <EditModal
          artwork={editItem}
          onSave={handleSave}
          onClose={() => setEditItem(null)}
        />
      )}

      <Footer />
    </>
  );
}

export default SellerHistory;

/* ------------------------------------------------------------------
 ----------------------- EDIT MODAL ---------------------------------
 ------------------------------------------------------------------ */

function EditModal({ artwork, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: artwork.title,
    desc: artwork.desc,
    status: artwork.status,
    category: artwork.category,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Artwork</h2>

        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} />

        <label>Description</label>
        <input name="desc" value={formData.desc} onChange={handleChange} />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="current">Current</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>

        <label>Category</label>
        <input name="category" value={formData.category} onChange={handleChange} />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="save-btn" onClick={() => onSave(formData)}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
