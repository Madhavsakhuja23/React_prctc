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
  // READ USER FROM LOCALSTORAGE
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
  // HARD-CODED SAMPLE ARTWORKS
  // ---------------------------
  const artworks = [ { id: 1, img: "c1.jpg", artist: "Bea Kusovszky", title: "Generational Code V", gallery: "VILTIN Gallery", price: "€6,200–€6,900", size: "Small" }, { id: 2, img: "c2.jpg", artist: "Isabel Bonilla", title: "Denim Ocean 15, 2025", gallery: "PxP Contemporary", price: "US$100", size: "Small" }, { id: 3, img: "c3.jpg", artist: "Robert Minervini", title: "Moon Rising, 2024", gallery: "Rena Bransten Gallery", price: "US$1,500", size: "Large" }, { id: 4, img: "c4.jpg", artist: "Elena Vasquez", title: "Urban Reflections", gallery: "Modern Art Space", price: "€4,500–€5,200", size: "Medium" }, { id: 5, img: "T1.jpg", artist: "Marcus Chen", title: "Digital Dreams", gallery: "Tech Art Collective", price: "US$2,800", size: "Large" }, { id: 6, img: "T2.jpg", artist: "Sophia Patel", title: "Nature's Symphony", gallery: "Green Gallery", price: "US$3,200", size: "Small" }, { id: 7, img: "T3.jpg", artist: "Diego Ramirez", title: "Abstract Horizons", gallery: "Contemporary Visions", price: "€8,900–€9,500", size: "Large" }, { id: 8, img: "T4.jpg", artist: "Luna Zhang", title: "Cosmic Flow", gallery: "Space Art Gallery", price: "US$4,100", size: "Medium" }, { id: 9, img: "T5.jpg", artist: "Alex Thompson", title: "Industrial Beauty", gallery: "Urban Art Hub", price: "US$2,600", size: "Medium" }, { id: 10, img: "T6.jpg", artist: "Maria Santos", title: "Ocean Whispers", gallery: "Maritime Gallery", price: "€7,300–€8,100", size: "Small" } ];

  // ---------------------------
  // LOAD USER'S WISHLIST FROM DB
  // ---------------------------
  useEffect(() => {
    if (!userId) return;

    async function loadWishlist() {
      try {
        const res = await fetch(`${API_BASE}/api/wishlist/${userId}`);
        if (!res.ok) return;

        const data = await res.json();
        const likedMap = {};
        data.forEach(item => likedMap[item.artworkId] = true);

        setLikedArtworks(likedMap);
      } catch (err) {
        console.error("Wishlist load error:", err);
      }
    }

    loadWishlist();
  }, [userId]);

  // ---------------------------
  // LOGIN CHECK
  // ---------------------------
  const checkLogin = () => {
    if (!userId) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return false;
    }
    return true;
  };

  // ---------------------------
  // FILTERS + SEARCH
  // ---------------------------
  const handleSearch = (k) => setSearchKeyword(k.toLowerCase());

  const handlePriceChange = (v) =>
    setPriceFilter((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  const handleSizeChange = (v) =>
    setSizeFilter((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  const extractPrice = (str) => {
    const m = String(str).match(/\d+(?:,\d+)?/g);
    return m ? parseFloat(m[0].replace(/,/g, "")) : 0;
  };

  const filteredArtworks = artworks.filter((art) => {
    const kw = searchKeyword;
    const keywordMatch =
      !kw ||
      art.artist.toLowerCase().includes(kw) ||
      art.title.toLowerCase().includes(kw);

    const p = extractPrice(art.price);
    let priceMatch = true;

    if (priceFilter.length > 0) {
      priceMatch = priceFilter.some((range) => {
        if (range === "below1000") return p < 1000;
        if (range === "1000to5000") return p >= 1000 && p <= 5000;
        if (range === "above5000") return p > 5000;
        return true;
      });
    }

    const sizeMatch = sizeFilter.length === 0 || sizeFilter.includes(art.size);

    return keywordMatch && priceMatch && sizeMatch;
  });

  // ---------------------------
  // HEART ANIMATION
  // ---------------------------
  const animateHeart = (id) => {
    const el = document.querySelector(`#heart-overlay-${id}`);
    if (!el) return;
    el.classList.add("animate");
    setTimeout(() => el.classList.remove("animate"), 600);
  };

  // ---------------------------
  // DB: ADD TO WISHLIST
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
  // DB: REMOVE FROM WISHLIST
  // ---------------------------
  const removeFromWishlist = async (artId) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/wishlist/${userId}/${artId}`,
        { method: "DELETE" }
      );
      return res.ok;
    } catch (err) {
      console.error("Remove wishlist error:", err);
      return false;
    }
  };

  // ---------------------------
  // TOGGLE LIKE (heart click)
  // ---------------------------
  const toggleLike = async (id) => {
    if (!checkLogin()) return;

    const already = likedArtworks[id];

    // Optimistic UI
    setLikedArtworks((p) => ({ ...p, [id]: !already }));

    if (!already) {
      // Add
      const art = artworks.find((a) => a.id === id);
      const ok = await addToWishlist(art);
      if (ok) animateHeart(id);
      else setLikedArtworks((p) => ({ ...p, [id]: false }));
    } else {
      // Remove
      const ok = await removeFromWishlist(id);
      if (!ok) setLikedArtworks((p) => ({ ...p, [id]: true }));
    }
  };

  // ---------------------------
  // DOUBLE TAP LIKE
  // ---------------------------
  const handleDoubleTap = async (id) => {
    if (!checkLogin()) return;

    const now = Date.now();
    const last = lastTapRef.current[id] || 0;

    if (now - last < 300) {
      // Double-tap → like
      if (!likedArtworks[id]) {
        const art = artworks.find((a) => a.id === id);
        setLikedArtworks((p) => ({ ...p, [id]: true }));

        const ok = await addToWishlist(art);
        if (ok) animateHeart(id);
        else setLikedArtworks((p) => ({ ...p, [id]: false }));
      } else {
        animateHeart(id); // already liked → just animate
      }
    }

    lastTapRef.current[id] = now;
  };

  // ---------------------------
  // RENDER UI
  // ---------------------------
  return (
    <>
      <Navbar onSearch={handleSearch} />

      {showLoginMessage && (
        <div className="login-message-popup">
          <p>🔒 Please login first to like artworks!</p>
          <a href="/login">Login Now</a>
        </div>
      )}

      {/* SIDEBAR */}
      <div id="filterSidebar" className={`filter-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button id="closeSidebar" onClick={() => setSidebarOpen(false)}>&times;</button>

        <h2>Filters</h2>

        <div className="filter-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by artist or title…"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <h3>Price Range</h3>
          <label>
            <input type="checkbox" checked={priceFilter.includes("below1000")} onChange={() => handlePriceChange("below1000")} />
            Below $1000
          </label>
          <label>
            <input type="checkbox" checked={priceFilter.includes("1000to5000")} onChange={() => handlePriceChange("1000to5000")} />
            $1000 - $5000
          </label>
          <label>
            <input type="checkbox" checked={priceFilter.includes("above5000")} onChange={() => handlePriceChange("above5000")} />
            Above $5000
          </label>
        </div>

        <div className="filter-group">
          <h3>Artwork Size</h3>
          <label>
            <input type="checkbox" checked={sizeFilter.includes("Small")} onChange={() => handleSizeChange("Small")} />
            Small
          </label>
          <label>
            <input type="checkbox" checked={sizeFilter.includes("Medium")} onChange={() => handleSizeChange("Medium")} />
            Medium
          </label>
          <label>
            <input type="checkbox" checked={sizeFilter.includes("Large")} onChange={() => handleSizeChange("Large")} />
            Large
          </label>
        </div>
      </div>

      <button id="openSidebar" className="filter-btn" onClick={() => setSidebarOpen(true)}>
        Filters
      </button>

      <div id="overlay" className={`overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* GRID */}
      <section className="collect-header">
        <h2>Collect art and design online</h2>
      </section>

      <section className="artsy-grid-section">
        <div className="artsy-masonry">
          {filteredArtworks.map((art) => (
            <div key={art.id} className="artsy-card">
              <div
                className="image-wrapper"
                onClick={() => handleDoubleTap(art.id)}
              >
                <img src={art.img} alt={art.title} loading="lazy" />
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
