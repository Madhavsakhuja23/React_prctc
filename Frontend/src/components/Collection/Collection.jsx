import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./collection.css";

const API_BASE = "https://aurtistiq.onrender.com";

function Collection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [likedArtworks, setLikedArtworks] = useState({});
  const [priceFilter, setPriceFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [userId, setUserId] = useState(null);

  const lastTapRef = useRef({});

  // ---------------------------
  // READ USER FROM LOCAL STORAGE
  // ---------------------------
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserId(parsed.id || parsed._id);
      }
    } catch (e) {
      console.warn("User parse failed", e);
    }
  }, []);

  // ---------------------------
  // HARD-CODED ARTWORKS
  // ---------------------------
  const artworks = [ { id: 1, img: "c1.jpg", artist: "Bea Kusovszky", title: "Generational Code V", gallery: "VILTIN Gallery", price: "€6,200–€6,900", size: "Small" }, { id: 2, img: "c2.jpg", artist: "Isabel Bonilla", title: "Denim Ocean 15, 2025", gallery: "PxP Contemporary", price: "US$100", size: "Small" }, { id: 3, img: "c3.jpg", artist: "Robert Minervini", title: "Moon Rising, 2024", gallery: "Rena Bransten Gallery", price: "US$1,500", size: "Large" }, { id: 4, img: "c4.jpg", artist: "Elena Vasquez", title: "Urban Reflections", gallery: "Modern Art Space", price: "€4,500–€5,200", size: "Medium" }, { id: 5, img: "T1.jpg", artist: "Marcus Chen", title: "Digital Dreams", gallery: "Tech Art Collective", price: "US$2,800", size: "Large" }, { id: 6, img: "T2.jpg", artist: "Sophia Patel", title: "Nature's Symphony", gallery: "Green Gallery", price: "US$3,200", size: "Small" }, { id: 7, img: "T3.jpg", artist: "Diego Ramirez", title: "Abstract Horizons", gallery: "Contemporary Visions", price: "€8,900–€9,500", size: "Large" }, { id: 8, img: "T4.jpg", artist: "Luna Zhang", title: "Cosmic Flow", gallery: "Space Art Gallery", price: "US$4,100", size: "Medium" }, { id: 9, img: "T5.jpg", artist: "Alex Thompson", title: "Industrial Beauty", gallery: "Urban Art Hub", price: "US$2,600", size: "Medium" }, { id: 10, img: "T6.jpg", artist: "Maria Santos", title: "Ocean Whispers", gallery: "Maritime Gallery", price: "€7,300–€8,100", size: "Small" } ];

  // ---------------------------
  // LOAD USER WISHLIST FROM DB
  // ---------------------------
  useEffect(() => {
    if (!userId) return;

    async function loadWishlist() {
      try {
        const res = await fetch(`${API_BASE}/api/wishlist/${userId}`);
        if (!res.ok) return;

        const data = await res.json();
        const likedMap = {};

        data.forEach((item) => {
          likedMap[item.artworkId] = true;
        });

        setLikedArtworks(likedMap);
      } catch (err) {
        console.error("Wishlist load error:", err);
      }
    }

    loadWishlist();
  }, [userId]);

  const checkLogin = () => {
    if (!userId) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 2000);
      return false;
    }
    return true;
  };

  const handleSearch = (v) => setSearchKeyword(v.toLowerCase());

  // Extract just first price number
  const extractPrice = (str) => {
    const m = String(str).match(/\d+(?:,\d+)?/g);
    return m ? parseFloat(m[0].replace(/,/g, "")) : 0;
  };

  // ---------------------------
  // ADD TO WISHLIST
  // ---------------------------
  const addToWishlist = async (art) => {
    try {
      const res = await fetch(`${API_BASE}/api/wishlist/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          artworkId: String(art.id),
          snapshot: {
            title: art.title,
            artist: art.artist,
            image: art.img,
            gallery: art.gallery,
            price: art.price,
            size: art.size,
          },
        }),
      });

      return res.ok;
    } catch (err) {
      console.error("Add wishlist error:", err);
      return false;
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
      return res.ok;
    } catch (err) {
      console.error("Remove wishlist error:", err);
      return false;
    }
  };

  // ---------------------------
  // TOGGLE LIKE
  // ---------------------------
  const toggleLike = async (id) => {
    if (!checkLogin()) return;

    const liked = likedArtworks[id];

    // Optimistic UI Update
    setLikedArtworks((p) => ({ ...p, [id]: !liked }));

    if (!liked) {
      const art = artworks.find((a) => a.id === id);
      const ok = await addToWishlist(art);
      if (!ok) setLikedArtworks((p) => ({ ...p, [id]: false }));
    } else {
      const ok = await removeFromWishlist(id);
      if (!ok) setLikedArtworks((p) => ({ ...p, [id]: true }));
    }
  };

  const filteredArtworks = artworks.filter((a) => {
    if (!searchKeyword) return true;
    return (
      a.artist.toLowerCase().includes(searchKeyword) ||
      a.title.toLowerCase().includes(searchKeyword)
    );
  });

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <section className="artsy-grid-section">
        <div className="artsy-masonry">
          {filteredArtworks.map((art) => (
            <div key={art.id} className="artsy-card">
              <div className="image-wrapper">
                <img src={art.img} alt={art.title} />

                <div id={`heart-overlay-${art.id}`} className="double-tap-heart">
                  <FaHeart />
                </div>
              </div>

              <div className="artsy-card-info">
                <div className="artist-row">
                  <p className="artist-name">{art.artist}</p>

                  <span
                    className={`like-icon ${likedArtworks[art.id] ? "liked" : ""}`}
                    onClick={() => toggleLike(art.id)}
                  >
                    {likedArtworks[art.id] ? <FaHeart /> : <FaRegHeart />}
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
    </>
  );
}

export default Collection;
