// Fcollection.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./collection.css";

/**
 * Fcollection.jsx
 * - reads logged-in user from localStorage "user" (robust parse)
 * - fetches user's wishlist from backend
 * - adds/removes wishlist items via backend
 * - keeps like state in-memory (driven by DB on load)
 * - supports single-tap like (via heart icon) and double-tap to like (mobile/desktop)
 */

const API_BASE = "https://aurtistiq.onrender.com";

function Fcollection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [likedArtworks, setLikedArtworks] = useState({}); // { [artworkId]: true }
  const [priceFilter, setPriceFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [userId, setUserId] = useState(null);
  const lastTapRef = useRef({}); // per-art last-tap timestamps

  // Example artworks list (one entry uses uploaded file path from your session)
  // Replace / extend with real artworks or keep static for demo
  const artworks = [{ id: 1, img: 'c1.jpg', artist: 'Bea Kusovszky', title: 'Generational Code V', gallery: 'VILTIN Gallery', price: '€6,200–€6,900', size: "Small" }, { id: 2, img: 'c2.jpg', artist: 'Isabel Bonilla', title: 'Denim Ocean 15, 2025', gallery: 'PxP Contemporary', price: 'US$100', size: "Small" }, { id: 3, img: 'c3.jpg', artist: 'Robert Minervini', title: 'Moon Rising, 2024', gallery: 'Rena Bransten Gallery', price: 'US$1,500', size: "Large" }, { id: 4, img: 'c4.jpg', artist: 'Elena Vasquez', title: 'Urban Reflections', gallery: 'Modern Art Space', price: '€4,500–€5,200', size: "Small" }, { id: 5, img: 'T1.jpg', artist: 'Marcus Chen', title: 'Digital Dreams', gallery: 'Tech Art Collective', price: 'US$2,800', size: "Medium" }, { id: 6, img: 'T2.jpg', artist: 'Sophia Patel', title: 'Nature\'s Symphony', gallery: 'Green Gallery', price: 'US$3,200', size: "Medium" }, { id: 7, img: 'T3.jpg', artist: 'Diego Ramirez', title: 'Abstract Horizons', gallery: 'Contemporary Visions', price: '€8,900–€9,500', size: "Small" }, { id: 8, img: 'T4.jpg', artist: 'Luna Zhang', title: 'Cosmic Flow', gallery: 'Space Art Gallery', price: 'US$4,100', size: "Large" }, { id: 9, img: 'T5.jpg', artist: 'Alex Thompson', title: 'Industrial Beauty', gallery: 'Urban Art Hub', price: 'US$2,600', size: "Large" }, { id: 10, img: 'T6.jpg', artist: 'Maria Santos', title: 'Ocean Whispers', gallery: 'Maritime Gallery', price: '€7,300–€8,100', size: "Large" }, { id: 11, img: 'c5.jpg', artist: 'James Wilson', title: 'Geometric Patterns', gallery: 'Shape & Form', price: 'US$1,900', size: "Medium" }, { id: 12, img: 'c6.jpg', artist: 'Anna Kowalski', title: 'Emotional Landscapes', gallery: 'Emotion Art', price: '€5,800–€6,400', size: "Medium" }, { id: 13, img: 'c7.jpg', artist: 'Carlos Mendoza', title: 'Cultural Fusion', gallery: 'Global Perspectives', price: 'US$3,700', size: "Medium" }, { id: 14, img: 'C8.jpg', artist: 'Yuki Tanaka', title: 'Minimalist Essence', gallery: 'Zen Gallery', price: 'US$2,200', size: "Small" }, { id: 15, img: 'C9.jpg', artist: 'Oliver Brown', title: 'Vintage Vibes', gallery: 'Retro Art House', price: '€4,100–€4,800', size: "Small" }, { id: 16, img: 'C10.jpg', artist: 'Isabella Rossi', title: 'Floral Fantasy', gallery: 'Botanical Gallery', price: 'US$3,400', size: "Large" }, { id: 17, img: 'past1.jpg', artist: 'David Kim', title: 'Street Art Revolution', gallery: 'Urban Canvas', price: 'US$1,800', size: "Large" }, { id: 18, img: 'past2.jpg', artist: 'Emma Johnson', title: 'Surreal Dreams', gallery: 'Dream Gallery', price: '€6,700–€7,300', size: "Large" }, { id: 19, img: 'past3.jpg', artist: 'Miguel Torres', title: 'Latin Rhythms', gallery: 'Rhythm Gallery', price: 'US$2,900', size: "Small" }, { id: 20, img: 'past4.jpg', artist: 'Nina Schmidt', title: 'Nordic Lights', gallery: 'Scandinavian Art', price: '€5,200–€5,900', size: "Small" }, { id: 21, img: 'past6.jpg', artist: 'Raj Patel', title: 'Spice Market', gallery: 'Cultural Heritage', price: 'US$3,100', size: "Medium" }, { id: 22, img: 'past5.jpg', artist: 'Sophie Martin', title: 'Parisian Nights', gallery: 'French Elegance', price: '€7,800–€8,400', size: "Medium" }, { id: 23, img: 'live1.jpg', artist: 'Liam Garcia', title: 'Desert Mirage', gallery: 'Desert Art Gallery', price: 'US$2,500', size: "Large" }, { id: 24, img: 'live2.jpg', artist: 'Zara Ahmed', title: 'Eastern Mystique', gallery: 'Oriental Gallery', price: 'US$4,200', size: "Large" }, { id: 25, img: 'live3.jpg', artist: 'Tom Harrison', title: 'British Countryside', gallery: 'English Heritage', price: '€6,100–€6,800', size: "Medium" }, { id: 26, img: 'live4.jpg', artist: 'Priya Sharma', title: 'Bollywood Dreams', gallery: 'Indian Cinema Art', price: 'US$1,700', size: "Medium" }, { id: 27, img: 'live5.jpg', artist: 'Hans Mueller', title: 'Alpine Majesty', gallery: 'Mountain Gallery', price: '€4,900–€5,600', size: "Large" }, { id: 28, img: 'live6.jpg', artist: 'Fatima Al-Zahra', title: 'Islamic Geometry', gallery: 'Islamic Art Center', price: 'US$3,800', size: "Large" }, { id: 29, img: 'live7.jpg', artist: 'Giovanni Romano', title: 'Italian Renaissance', gallery: 'Renaissance Gallery', price: '€8,200–€9,000', size: "Small" }, { id: 30, img: 'live8.jpg', artist: 'Aisha Khan', title: 'Tribal Patterns', gallery: 'Tribal Art Gallery', price: 'US$2,300', size: "Small" }, { id: 31, img: 'live9.jpg', artist: 'Pierre Dubois', title: 'French Impressionism', gallery: 'Impressionist Gallery', price: '€7,500–€8,200', size: "Medium" }, { id: 32, img: 'live10.jpg', artist: 'Mei Ling', title: 'Chinese Landscapes', gallery: 'Chinese Art Museum', price: 'US$4,500', size: "Large" }, { id: 33, img: 'live11.jpg', artist: 'Antonio Silva', title: 'Brazilian Carnival', gallery: 'Carnival Gallery', price: 'US$3,300', size: "Large" }, { id: 34, img: 'live13.jpg', artist: 'Sarah Connor', title: 'Cyberpunk Visions', gallery: 'Future Art Gallery', price: '€5,700–€6,400', size: "Medium" }, { id: 35, img: 'upcoming8.jpg', artist: 'Jordan Blake', title: 'Urban Exploration', gallery: 'City Art Collective', price: 'US$2,100', size: "Large" }, { id: 36, img: 'upcoming7.jpg', artist: 'Amelia Rose', title: 'Garden of Eden', gallery: 'Paradise Gallery', price: '€6,900–€7,600', size: "Medium" }, { id: 37, img: 'upcoming6.jpg', artist: 'Victor Kane', title: 'Noir Mysteries', gallery: 'Film Noir Gallery', price: 'US$3,600', size: "Small" }, { id: 38, img: 'upcoming5.jpg', artist: 'Leila Hassan', title: 'Persian Poetry', gallery: 'Persian Art Center', price: 'US$4,800', size: "Small" }, { id: 39, img: 'upcoming4.jpg', artist: 'Felix Weber', title: 'German Expressionism', gallery: 'Expressionist Gallery', price: '€7,100–€7,800', size: "Medium" }, { id: 40, img: 'upcoming3.jpg', artist: 'Rosa Martinez', title: 'Cuban Revolution', gallery: 'Revolutionary Art', price: 'US$2,800', size: "Large" }, { id: 41, img: 'upcoming2.jpg', artist: 'Kai Nakamura', title: 'Samurai Spirit', gallery: 'Japanese Heritage', price: 'US$5,200', size: "Large" }, { id: 42, img: 'upcoming1.jpg', artist: 'Olivia Parker', title: 'Victorian Elegance', gallery: 'Victorian Gallery', price: '€6,400–€7,100', size: "Medium" }, { id: 43, img: '1.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 1', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }, { id: 44, img: '3.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 2', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 45, img: '4.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 3', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }, { id: 46, img: 'artist.jpeg', artist: 'Your Collection', title: 'Artist Self-Portrait', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 47, img: 'banner.jpg', artist: 'Your Collection', title: 'Banner Collection', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 48, img: 'hero.jpg', artist: 'Your Collection', title: 'Hero Piece', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 49, img: 'new1.jpg', artist: 'Your Collection', title: 'New Acquisition 1', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }, { id: 50, img: 'new2.jpg', artist: 'Your Collection', title: 'New Acquisition 2', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 51, img: 'new3.jpg', artist: 'Your Collection', title: 'New Acquisition 3', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 52, img: 's1.jpg', artist: 'Your Collection', title: 'Series A: Beginning', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 53, img: 's2.jpg', artist: 'Your Collection', title: 'Series A: Journey', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 54, img: 's3.jpg', artist: 'Your Collection', title: 'Series A: Climax', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 55, img: 's4.jpg', artist: 'Your Collection', title: 'Series A: Resolution', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }];

  // ---------- Read logged-in user id from localStorage ----------
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      setUserId(null);
      return;
    }
    try {
      // sometimes localStorage stores stringified JSON, sometimes object coerced — handle both
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      // user object shape you showed: { id: "691c1...", name: "Madhav", email: "...", role: "Buyer" }
      const uid = parsed?.id || parsed?._id || parsed?.userId || null;
      if (uid) setUserId(uid);
      else setUserId(null);
    } catch (err) {
      // fallback: attempt naive extraction (if stored as like "[object Object]" or something strange)
      console.warn("Could not parse stored user object:", err);
      setUserId(null);
    }
  }, []);

  // ---------- Fetch wishlist from backend on mount & when userId changes ----------
  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    async function loadWishlist() {
      try {
        const res = await fetch(`${API_BASE}/api/wishlist/${userId}`);
        if (!res.ok) {
          console.warn("Failed to load wishlist:", res.status);
          return;
        }
        const list = await res.json(); // expect array of wishlist documents
        // build liked map from returned wishlist
        const likedMap = {};
        list.forEach((doc) => {
          // doc.artworkId should match artwork.id (string or number) depending how you stored
          // normalize to string keys
          likedMap[String(doc.artworkId)] = true;
        });
        if (mounted) setLikedArtworks(likedMap);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    }

    loadWishlist();
    return () => { mounted = false; };
  }, [userId]);

  // ---------- Helpers: check login ----------
  const checkLogin = () => {
    // We use presence of userId (derived from localStorage "user") to determine login
    if (!userId) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
      return false;
    }
    return true;
  };

  // ---------- UI helpers ----------
  const extractPrice = (priceStr) => {
    if (!priceStr) return 0;
    const m = String(priceStr).match(/\d+(?:,\d+)?/g);
    if (!m) return 0;
    return parseFloat(m[0].replace(/,/g, ""));
  };

  const handlePriceChange = (v) => setPriceFilter((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  const handleSizeChange = (v) => setSizeFilter((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  const handleSearch = (v) => setSearchKeyword(v.toLowerCase());

  const filteredArtworks = artworks.filter((art) => {
    const kw = searchKeyword;
    const keywordMatch = !kw || art.artist.toLowerCase().includes(kw) || art.title.toLowerCase().includes(kw);

    const priceVal = extractPrice(art.price);
    let priceMatch = true;
    if (priceFilter.length > 0) {
      priceMatch = priceFilter.some((range) => {
        if (range === "below1000") return priceVal < 1000;
        if (range === "1000to5000") return priceVal >= 1000 && priceVal <= 5000;
        if (range === "above5000") return priceVal > 5000;
        return true;
      });
    }

    const sizeMatch = sizeFilter.length === 0 || sizeFilter.includes(art.size);
    return keywordMatch && priceMatch && sizeMatch;
  });

  // ---------- Heart animation ----------
  const animateHeart = (id) => {
    const el = document.querySelector(`#heart-overlay-${id}`);
    if (!el) return;
    el.classList.add("animate");
    setTimeout(() => el.classList.remove("animate"), 600);
  };

  // ---------- Backend calls to add / remove wishlist ----------
  const addToWishlist = async (artwork) => {
    if (!userId) return false;
    try {
      const payload = {
        userId,
        artworkId: String(artwork.id),
        snapshot: {
          title: artwork.title,
          artist: artwork.artist,
          image: artwork.img,
          gallery: artwork.gallery,
          price: artwork.price,
          size: artwork.size
        }
      };
      const res = await fetch(`${API_BASE}/api/wishlist/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.text();
        console.warn("Add wishlist failed:", res.status, body);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Add wishlist error:", err);
      return false;
    }
  };

  const removeFromWishlist = async (artworkId) => {
    if (!userId) return false;
    try {
      // DELETE route: /api/wishlist/:userId/:artworkId
      const res = await fetch(`${API_BASE}/api/wishlist/${userId}/${encodeURIComponent(String(artworkId))}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.text();
        console.warn("Remove wishlist failed:", res.status, body);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Remove wishlist error:", err);
      return false;
    }
  };

  // ---------- Toggle like (single-click heart) ----------
  const toggleLike = async (id) => {
    if (!checkLogin()) return;

    const key = String(id);
    const currentlyLiked = !!likedArtworks[key];

    // Optimistic UI update
    setLikedArtworks((prev) => ({ ...prev, [key]: !currentlyLiked }));

    if (!currentlyLiked) {
      // add to wishlist in DB
      const art = artworks.find((a) => String(a.id) === key);
      const ok = await addToWishlist(art);
      if (ok) {
        animateHeart(key);
        // notify other components (if any)
        window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        // revert on failure
        setLikedArtworks((prev) => ({ ...prev, [key]: false }));
      }
    } else {
      // remove from DB
      const ok = await removeFromWishlist(key);
      if (ok) {
        window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        // revert on failure
        setLikedArtworks((prev) => ({ ...prev, [key]: true }));
      }
    }
  };

  // ---------- Double-tap handler ----------
  const handleDoubleTap = async (id) => {
    if (!checkLogin()) return;

    const now = Date.now();
    const last = lastTapRef.current[id] || 0;
    if (now - last < 300) {
      // double-tap: like the artwork (if not already)
      const key = String(id);
      if (!likedArtworks[key]) {
        // optimistic
        setLikedArtworks((p) => ({ ...p, [key]: true }));
        const art = artworks.find((a) => String(a.id) === key);
        const ok = await addToWishlist(art);
        if (ok) {
          animateHeart(key);
          window.dispatchEvent(new Event("wishlistUpdated"));
        } else {
          setLikedArtworks((p) => ({ ...p, [key]: false }));
        }
      } else {
        // already liked — still animate for feedback
        animateHeart(String(id));
      }
    }
    lastTapRef.current[id] = now;
  };

  // ---------- Render ----------
  return (
    <>
      <Navbar onSearch={handleSearch} />

      {showLoginMessage && (
        <div className="login-message-popup" role="status" aria-live="polite">
          <p>🔒 Please log in to like artworks and add them to your wishlist!</p>
          <a href="/login">Login Now</a>
        </div>
      )}

      {/* Sidebar */}
      <div className={`filter-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button id="closeSidebar" onClick={() => setSidebarOpen(false)}>&times;</button>

        <h2>Filters</h2>

        <div className="filter-search">
          <input type="text" placeholder="Search artist or title…" onChange={(e) => handleSearch(e.target.value)} />
        </div>

        <div className="filter-group">
          <h3>Price Range</h3>
          <label><input type="checkbox" checked={priceFilter.includes("below1000")} onChange={() => handlePriceChange("below1000")} /> Below $1000</label>
          <label><input type="checkbox" checked={priceFilter.includes("1000to5000")} onChange={() => handlePriceChange("1000to5000")} /> $1000 - $5000</label>
          <label><input type="checkbox" checked={priceFilter.includes("above5000")} onChange={() => handlePriceChange("above5000")} /> Above $5000</label>
        </div>

        <div className="filter-group">
          <h3>Artwork Size</h3>
          <label><input type="checkbox" checked={sizeFilter.includes("Small")} onChange={() => handleSizeChange("Small")} /> Small</label>
          <label><input type="checkbox" checked={sizeFilter.includes("Medium")} onChange={() => handleSizeChange("Medium")} /> Medium</label>
          <label><input type="checkbox" checked={sizeFilter.includes("Large")} onChange={() => handleSizeChange("Large")} /> Large</label>
        </div>
      </div>

      <button id="openSidebar" className="filter-btn" onClick={() => setSidebarOpen(true)}>All Filters</button>
      <div className={`overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      <section className="collect-header"><h2>Collect art and design online</h2></section>

      <section className="artsy-grid-section">
        <div className="artsy-masonry">
          {filteredArtworks.map((art) => {
            const idKey = String(art.id);
            const isHighlighted = searchKeyword && (art.artist.toLowerCase().includes(searchKeyword) || art.title.toLowerCase().includes(searchKeyword));
            return (
              <div key={idKey} className={`artsy-card ${searchKeyword ? (isHighlighted ? "highlight" : "dim") : ""}`}>
                <div
                  className="image-wrapper"
                  onClick={() => handleDoubleTap(art.id)}           // mobile single-tap logic triggers double-tap check
                  onDoubleClick={() => handleDoubleTap(art.id)}    // desktop double-click
                >
                  <img src={art.img} alt={art.title} loading="lazy" />
                  <div id={`heart-overlay-${idKey}`} className="double-tap-heart"><FaHeart /></div>
                </div>

                <div className="artsy-card-info">
                  <div className="artist-row">
                    <p className="artist-name">{art.artist}</p>

                    <span
                      className={`like-icon ${likedArtworks[idKey] ? "liked" : ""}`}
                      onClick={() => toggleLike(art.id)}
                      role="button"
                      aria-pressed={!!likedArtworks[idKey]}
                      aria-label={likedArtworks[idKey] ? "Unlike artwork" : "Like artwork"}
                    >
                      {likedArtworks[idKey] ? <FaHeart /> : <FaRegHeart />}
                    </span>
                  </div>

                  <p className="art-title">{art.title}</p>
                  <p className="art-gallery">{art.gallery}</p>
                  <p className="art-price">{art.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Fcollection;
