// Collection.jsx
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
  const [highlighted, setHighlighted] = useState(null);

  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [userId, setUserId] = useState(null);

  const lastTapRef = useRef({});

  // -------------------------------
  // LOAD USER FROM LOCAL STORAGE
  // -------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const uid = parsed.id || parsed._id;
      setUserId(uid);
    } catch (err) {
      console.warn("User parse failed", err);
    }
  }, []);

  // -------------------------------
  // DISABLE BODY SCROLL WHEN FILTER OPEN
  // -------------------------------
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  // -------------------------------
  // ARTWORK LIST
  // -------------------------------
  const artworks = [
    { id: 1, img: "c1.jpg", artist: "Bea Kusovszky", title: "Generational Code V", gallery: "VILTIN Gallery", price: "€6,200–€6,900", size: "Small" },
    { id: 2, img: "c2.jpg", artist: "Isabel Bonilla", title: "Denim Ocean 15, 2025", gallery: "PxP Contemporary", price: "US$100", size: "Small" },
    { id: 3, img: "c3.jpg", artist: "Robert Minervini", title: "Moon Rising, 2024", gallery: "Rena Bransten Gallery", price: "US$1,500", size: "Large" },
    { id: 4, img: "c4.jpg", artist: "Elena Vasquez", title: "Urban Reflections", gallery: "Modern Art Space", price: "€4,500–€5,200", size: "Medium" },
    { id: 5, img: "T1.jpg", artist: "Marcus Chen", title: "Digital Dreams", gallery: "Tech Art Collective", price: "US$2,800", size: "Large" },
    { id: 6, img: "T2.jpg", artist: "Sophia Patel", title: "Nature's Symphony", gallery: "Green Gallery", price: "US$3,200", size: "Small" },
    { id: 7, img: "T3.jpg", artist: "Diego Ramirez", title: "Abstract Horizons", gallery: "Contemporary Visions", price: "€8,900–€9,500", size: "Large" },
    { id: 8, img: "T4.jpg", artist: "Luna Zhang", title: "Cosmic Flow", gallery: "Space Art Gallery", price: "US$4,100", size: "Medium" },
    { id: 9, img: "T5.jpg", artist: "Alex Thompson", title: "Industrial Beauty", gallery: "Urban Art Hub", price: "US$2,600", size: "Medium" },
    { id: 10, img: "T6.jpg", artist: "Maria Santos", title: "Ocean Whispers", gallery: "Maritime Gallery", price: "€7,300–€8,100", size: "Small" }
  ];

  // -------------------------------
  // LOAD USER WISHLIST
  // -------------------------------
  useEffect(() => {
    if (!userId) return;

    async function loadWishlist() {
      try {
        const res = await fetch(`${API_BASE}/api/wishlist/${userId}`);
        if (!res.ok) return;

        const data = await res.json();
        const liked = {};
        data.forEach((item) => {
          liked[String(item.artworkId)] = true;
        });

        setLikedArtworks(liked);
      } catch (err) {
        console.log("Wishlist load failed:", err);
      }
    }

    loadWishlist();
  }, [userId]);

  // -------------------------------
  // LOGIN CHECK
  // -------------------------------
  const checkLogin = () => {
    if (!userId) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 2500);
      return false;
    }
    return true;
  };

  // -------------------------------
  // WISHLIST API FUNCTIONS
  // -------------------------------
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
            size: art.size
          }
        })
      });
      return res.ok;
    } catch (err) {
      console.error("Wishlist add failed", err);
      return false;
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/wishlist/${userId}/${id}`, {
        method: "DELETE"
      });
      return res.ok;
    } catch (err) {
      console.error("Wishlist remove failed", err);
      return false;
    }
  };

  // -------------------------------
  // LIKE BUTTON CLICK
  // -------------------------------
  const toggleLike = async (id) => {
    if (!checkLogin()) return;

    const alreadyLiked = Boolean(likedArtworks[id]);

    // Optimistic UI update
    setLikedArtworks((prev) => ({ ...prev, [id]: !alreadyLiked }));

    if (!alreadyLiked) {
      const art = artworks.find((a) => a.id === id);
      const ok = await addToWishlist(art);
      if (!ok) setLikedArtworks((prev) => ({ ...prev, [id]: false }));
    } else {
      const ok = await removeFromWishlist(id);
      if (!ok) setLikedArtworks((prev) => ({ ...prev, [id]: true }));
    }
  };

  // -------------------------------
  // DOUBLE-TAP + HEART ANIMATION
  // -------------------------------
  const triggerHeartAnimation = (id) => {
    const el = document.getElementById(`heart-overlay-${id}`);
    if (!el) return;

    el.classList.add("animate");

    const remove = () => {
      el.classList.remove("animate");
      el.removeEventListener("animationend", remove);
    };

    el.addEventListener("animationend", remove);

    setTimeout(() => el.classList.remove("animate"), 700);
  };

  const handleDoubleTap = async (id) => {
    if (!checkLogin()) return;

    const now = Date.now();
    const lastTap = lastTapRef.current[id] || 0;

    if (now - lastTap < 300) {
      // DOUBLE TAP
      triggerHeartAnimation(id);

      if (!likedArtworks[id]) {
        setLikedArtworks((prev) => ({ ...prev, [id]: true }));

        const art = artworks.find((a) => a.id === id);
        const ok = await addToWishlist(art);

        if (!ok) setLikedArtworks((prev) => ({ ...prev, [id]: false }));
      }
    }

    lastTapRef.current[id] = now;
  };

  // -------------------------------
  // SEARCH HIGHLIGHT LOGIC
  // -------------------------------
  useEffect(() => {
    if (!searchKeyword) {
      setHighlighted(null);
      return;
    }
    const found = artworks.find(
      (a) =>
        a.artist.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        a.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setHighlighted(found ? found.id : null);
  }, [searchKeyword]);

  // -------------------------------
  // FILTER HELPERS
  // -------------------------------
  const extractPrice = (str) => {
    const match = String(str).match(/\d+(?:,\d+)?/);
    return match ? parseFloat(match[0].replace(/,/g, "")) : 0;
  };

  const filteredArtworks = artworks.filter((art) => {
    const kw = searchKeyword?.trim().toLowerCase();

    if (kw) {
      const match =
        art.artist.toLowerCase().includes(kw) ||
        art.title.toLowerCase().includes(kw);
      if (!match) return false;
    }

    if (priceFilter.length > 0) {
      const p = extractPrice(art.price);
      let ok = false;
      if (priceFilter.includes("under1k") && p < 1000) ok = true;
      if (priceFilter.includes("1to5k") && p >= 1000 && p <= 5000) ok = true;
      if (priceFilter.includes("over5k") && p > 5000) ok = true;
      if (!ok) return false;
    }

    if (sizeFilter.length > 0 && !sizeFilter.includes(art.size)) return false;

    return true;
  });

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <>
      <Navbar onSearch={setSearchKeyword} />

      {/* Login message */}
      {showLoginMessage && (
        <div className="login-message-popup">
          <p>Please sign in to add artworks to your wishlist.</p>
          <a href="/signup">Sign In / Sign Up</a>
        </div>
      )}

      {/* Filter button */}
      <button className="filter-btn-modern" onClick={() => setSidebarOpen(true)}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="4" y1="21" x2="4" y2="14"></line> <line x1="4" y1="10" x2="4" y2="3"></line> <line x1="12" y1="21" x2="12" y2="12"></line> <line x1="12" y1="8" x2="12" y2="3"></line> <line x1="20" y1="21" x2="20" y2="16"></line> <line x1="20" y1="12" x2="20" y2="3"></line> <line x1="1" y1="14" x2="7" y2="14"></line> <line x1="9" y1="8" x2="15" y2="8"></line> <line x1="17" y1="16" x2="23" y2="16"></line> </svg> All Filters </button>

      {/* Overlay */}
      {sidebarOpen && <div className="filter-overlay show" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`filter-sidebar-modern ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>

        <h3>Price</h3>
        <label><input type="checkbox" onChange={() => setPriceFilter((p)=>p.includes("under1k")?p.filter((x)=>x!=="under1k"):[...p,"under1k"])} /> Under $1,000</label>
        <label><input type="checkbox" onChange={() => setPriceFilter((p)=>p.includes("1to5k")?p.filter((x)=>x!=="1to5k"):[...p,"1to5k"])} /> $1,000 - $5,000</label>
        <label><input type="checkbox" onChange={() => setPriceFilter((p)=>p.includes("over5k")?p.filter((x)=>x!=="over5k"):[...p,"over5k"])} /> $5,000+</label>

        <h3>Size</h3>
        <label><input type="checkbox" onChange={() => setSizeFilter((p)=>p.includes("Small")?p.filter((x)=>x!=="Small"):[...p,"Small"])} /> Small</label>
        <label><input type="checkbox" onChange={() => setSizeFilter((p)=>p.includes("Medium")?p.filter((x)=>x!=="Medium"):[...p,"Medium"])} /> Medium</label>
        <label><input type="checkbox" onChange={() => setSizeFilter((p)=>p.includes("Large")?p.filter((x)=>x!=="Large"):[...p,"Large"])} /> Large</label>
      </div>

      {/* ART GRID */}
      <section className="artsy-grid-section">
        <div className="artsy-masonry">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              className={`artsy-card ${
                highlighted === art.id
                  ? "highlight"
                  : searchKeyword && highlighted !== art.id
                  ? "dim"
                  : ""
              }`}
            >
              <div
                className="image-wrapper"
                onClick={() => handleDoubleTap(art.id)}
              >
                <img src={art.img} alt={art.title} loading="lazy" />

                {/* Double-tap heart animation */}
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
