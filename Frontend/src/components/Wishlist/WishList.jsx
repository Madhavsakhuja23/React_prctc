import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Wishlist.css";

const API_BASE = "https://aurtistiq.onrender.com";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // ---------------------------
  // LOAD USER FROM LOCAL STORAGE
  // ---------------------------
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      if (u && (u.id || u._id)) {
        setUserId(u.id || u._id);
      }
    } catch (err) {
      console.error("User parse error:", err);
    }
  }, []);

  // ---------------------------
  // LOAD WISHLIST
  // ---------------------------
  useEffect(() => {
    if (!userId) return;
    loadWishlist();
  }, [userId]);

  const loadWishlist = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/wishlist/${userId}`);

      if (!res.ok) {
        setWishlistItems([]);
        return;
      }

      const data = await res.json();

      const formatted = data.map((item) => ({
        id: item.artworkId,
        ...item.snapshot,
      }));

      setWishlistItems(formatted);
    } catch (err) {
      console.error("Wishlist load error:", err);
      setWishlistItems([]);
    }
  };

  // ---------------------------
  // REMOVE FROM WISHLIST (FIXED)
  // ---------------------------
  const removeFromWishlist = async (artworkId) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/wishlist/${userId}/${artworkId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setWishlistItems((prev) =>
          prev.filter((item) => String(item.id) !== String(artworkId))
        );
      }
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  return (
    <>
      <section className="wishlist-header">
        <h2>Your Wishlist</h2>
        <p className="wishlist-count">{wishlistItems.length} artworks saved</p>
      </section>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <FaRegHeart className="empty-heart-icon" />
          <h3>Your wishlist is empty</h3>
          <p>Click the heart icon on artworks to add them!</p>
        </div>
      ) : (
        <section className="artsy-grid-section">
          <div className="artsy-masonry">
            {wishlistItems.map((art) => (
              <div key={art.id} className="artsy-card">
                <div className="image-wrapper">
                  <img src={art.image} alt={art.title} loading="lazy" />
                </div>

                <div className="artsy-card-info">
                  <div className="artist-row">
                    <p className="artist-name">{art.artist}</p>

                    <span
                      className="like-icon liked"
                      onClick={() => removeFromWishlist(art.id)}
                    >
                      <FaHeart />
                    </span>
                  </div>

                  <p className="art-title">{art.title}</p>
                  <p className="art-gallery">{art.gallery}</p>
                  <p className="art-price">{art.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Wishlist;
