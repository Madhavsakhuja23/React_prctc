// Fcollection.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./collection.css";

const API_BASE = "https://aurtistiq.onrender.com";

function Fcollection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [likedArtworks, setLikedArtworks] = useState({});
  const [priceFilter, setPriceFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [userId, setUserId] = useState(null);

  const lastTapRef = useRef({});

  // ---------------------------
  // LOAD USER FROM LOCAL STORAGE
  // ---------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;

      const parsed = JSON.parse(raw);
      const uid = parsed.id || parsed._id;

      setUserId(uid);
    } catch (e) {
      console.warn("User parse failed", e);
    }
  }, []);

  // ---------------------------
  // YOUR ARTWORK LIST (UNCHANGED)
  // ---------------------------
  const artworks = [{ id: 1, img: 'c1.jpg', artist: 'Bea Kusovszky', title: 'Generational Code V', gallery: 'VILTIN Gallery', price: '€6,200–€6,900', size: "Small" }, { id: 2, img: 'c2.jpg', artist: 'Isabel Bonilla', title: 'Denim Ocean 15, 2025', gallery: 'PxP Contemporary', price: 'US$100', size: "Small" }, { id: 3, img: 'c3.jpg', artist: 'Robert Minervini', title: 'Moon Rising, 2024', gallery: 'Rena Bransten Gallery', price: 'US$1,500', size: "Large" }, { id: 4, img: 'c4.jpg', artist: 'Elena Vasquez', title: 'Urban Reflections', gallery: 'Modern Art Space', price: '€4,500–€5,200', size: "Small" }, { id: 5, img: 'T1.jpg', artist: 'Marcus Chen', title: 'Digital Dreams', gallery: 'Tech Art Collective', price: 'US$2,800', size: "Medium" }, { id: 6, img: 'T2.jpg', artist: 'Sophia Patel', title: 'Nature\'s Symphony', gallery: 'Green Gallery', price: 'US$3,200', size: "Medium" }, { id: 7, img: 'T3.jpg', artist: 'Diego Ramirez', title: 'Abstract Horizons', gallery: 'Contemporary Visions', price: '€8,900–€9,500', size: "Small" }, { id: 8, img: 'T4.jpg', artist: 'Luna Zhang', title: 'Cosmic Flow', gallery: 'Space Art Gallery', price: 'US$4,100', size: "Large" }, { id: 9, img: 'T5.jpg', artist: 'Alex Thompson', title: 'Industrial Beauty', gallery: 'Urban Art Hub', price: 'US$2,600', size: "Large" }, { id: 10, img: 'T6.jpg', artist: 'Maria Santos', title: 'Ocean Whispers', gallery: 'Maritime Gallery', price: '€7,300–€8,100', size: "Large" }, { id: 11, img: 'c5.jpg', artist: 'James Wilson', title: 'Geometric Patterns', gallery: 'Shape & Form', price: 'US$1,900', size: "Medium" }, { id: 12, img: 'c6.jpg', artist: 'Anna Kowalski', title: 'Emotional Landscapes', gallery: 'Emotion Art', price: '€5,800–€6,400', size: "Medium" }, { id: 13, img: 'c7.jpg', artist: 'Carlos Mendoza', title: 'Cultural Fusion', gallery: 'Global Perspectives', price: 'US$3,700', size: "Medium" }, { id: 14, img: 'C8.jpg', artist: 'Yuki Tanaka', title: 'Minimalist Essence', gallery: 'Zen Gallery', price: 'US$2,200', size: "Small" }, { id: 15, img: 'C9.jpg', artist: 'Oliver Brown', title: 'Vintage Vibes', gallery: 'Retro Art House', price: '€4,100–€4,800', size: "Small" }, { id: 16, img: 'C10.jpg', artist: 'Isabella Rossi', title: 'Floral Fantasy', gallery: 'Botanical Gallery', price: 'US$3,400', size: "Large" }, { id: 17, img: 'past1.jpg', artist: 'David Kim', title: 'Street Art Revolution', gallery: 'Urban Canvas', price: 'US$1,800', size: "Large" }, { id: 18, img: 'past2.jpg', artist: 'Emma Johnson', title: 'Surreal Dreams', gallery: 'Dream Gallery', price: '€6,700–€7,300', size: "Large" }, { id: 19, img: 'past3.jpg', artist: 'Miguel Torres', title: 'Latin Rhythms', gallery: 'Rhythm Gallery', price: 'US$2,900', size: "Small" }, { id: 20, img: 'past4.jpg', artist: 'Nina Schmidt', title: 'Nordic Lights', gallery: 'Scandinavian Art', price: '€5,200–€5,900', size: "Small" }, { id: 21, img: 'past6.jpg', artist: 'Raj Patel', title: 'Spice Market', gallery: 'Cultural Heritage', price: 'US$3,100', size: "Medium" }, { id: 22, img: 'past5.jpg', artist: 'Sophie Martin', title: 'Parisian Nights', gallery: 'French Elegance', price: '€7,800–€8,400', size: "Medium" }, { id: 23, img: 'live1.jpg', artist: 'Liam Garcia', title: 'Desert Mirage', gallery: 'Desert Art Gallery', price: 'US$2,500', size: "Large" }, { id: 24, img: 'live2.jpg', artist: 'Zara Ahmed', title: 'Eastern Mystique', gallery: 'Oriental Gallery', price: 'US$4,200', size: "Large" }, { id: 25, img: 'live3.jpg', artist: 'Tom Harrison', title: 'British Countryside', gallery: 'English Heritage', price: '€6,100–€6,800', size: "Medium" }, { id: 26, img: 'live4.jpg', artist: 'Priya Sharma', title: 'Bollywood Dreams', gallery: 'Indian Cinema Art', price: 'US$1,700', size: "Medium" }, { id: 27, img: 'live5.jpg', artist: 'Hans Mueller', title: 'Alpine Majesty', gallery: 'Mountain Gallery', price: '€4,900–€5,600', size: "Large" }, { id: 28, img: 'live6.jpg', artist: 'Fatima Al-Zahra', title: 'Islamic Geometry', gallery: 'Islamic Art Center', price: 'US$3,800', size: "Large" }, { id: 29, img: 'live7.jpg', artist: 'Giovanni Romano', title: 'Italian Renaissance', gallery: 'Renaissance Gallery', price: '€8,200–€9,000', size: "Small" }, { id: 30, img: 'live8.jpg', artist: 'Aisha Khan', title: 'Tribal Patterns', gallery: 'Tribal Art Gallery', price: 'US$2,300', size: "Small" }, { id: 31, img: 'live9.jpg', artist: 'Pierre Dubois', title: 'French Impressionism', gallery: 'Impressionist Gallery', price: '€7,500–€8,200', size: "Medium" }, { id: 32, img: 'live10.jpg', artist: 'Mei Ling', title: 'Chinese Landscapes', gallery: 'Chinese Art Museum', price: 'US$4,500', size: "Large" }, { id: 33, img: 'live11.jpg', artist: 'Antonio Silva', title: 'Brazilian Carnival', gallery: 'Carnival Gallery', price: 'US$3,300', size: "Large" }, { id: 34, img: 'live13.jpg', artist: 'Sarah Connor', title: 'Cyberpunk Visions', gallery: 'Future Art Gallery', price: '€5,700–€6,400', size: "Medium" }, { id: 35, img: 'upcoming8.jpg', artist: 'Jordan Blake', title: 'Urban Exploration', gallery: 'City Art Collective', price: 'US$2,100', size: "Large" }, { id: 36, img: 'upcoming7.jpg', artist: 'Amelia Rose', title: 'Garden of Eden', gallery: 'Paradise Gallery', price: '€6,900–€7,600', size: "Medium" }, { id: 37, img: 'upcoming6.jpg', artist: 'Victor Kane', title: 'Noir Mysteries', gallery: 'Film Noir Gallery', price: 'US$3,600', size: "Small" }, { id: 38, img: 'upcoming5.jpg', artist: 'Leila Hassan', title: 'Persian Poetry', gallery: 'Persian Art Center', price: 'US$4,800', size: "Small" }, { id: 39, img: 'upcoming4.jpg', artist: 'Felix Weber', title: 'German Expressionism', gallery: 'Expressionist Gallery', price: '€7,100–€7,800', size: "Medium" }, { id: 40, img: 'upcoming3.jpg', artist: 'Rosa Martinez', title: 'Cuban Revolution', gallery: 'Revolutionary Art', price: 'US$2,800', size: "Large" }, { id: 41, img: 'upcoming2.jpg', artist: 'Kai Nakamura', title: 'Samurai Spirit', gallery: 'Japanese Heritage', price: 'US$5,200', size: "Large" }, { id: 42, img: 'upcoming1.jpg', artist: 'Olivia Parker', title: 'Victorian Elegance', gallery: 'Victorian Gallery', price: '€6,400–€7,100', size: "Medium" }, { id: 43, img: '1.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 1', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }, { id: 44, img: '3.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 2', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 45, img: '4.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 3', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }, { id: 46, img: 'artist.jpeg', artist: 'Your Collection', title: 'Artist Self-Portrait', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 47, img: 'banner.jpg', artist: 'Your Collection', title: 'Banner Collection', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 48, img: 'hero.jpg', artist: 'Your Collection', title: 'Hero Piece', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 49, img: 'new1.jpg', artist: 'Your Collection', title: 'New Acquisition 1', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }, { id: 50, img: 'new2.jpg', artist: 'Your Collection', title: 'New Acquisition 2', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 51, img: 'new3.jpg', artist: 'Your Collection', title: 'New Acquisition 3', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 52, img: 's1.jpg', artist: 'Your Collection', title: 'Series A: Beginning', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 53, img: 's2.jpg', artist: 'Your Collection', title: 'Series A: Journey', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Small" }, { id: 54, img: 's3.jpg', artist: 'Your Collection', title: 'Series A: Climax', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large" }, { id: 55, img: 's4.jpg', artist: 'Your Collection', title: 'Series A: Resolution', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" }];
  // ---------------------------
  // LOAD WISHLIST FROM DATABASE
  // ---------------------------
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
  // REMOVE FROM WISHLIST  (FIXED)
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
  // TOGGLE LIKE (FIXED)
  // ---------------------------
  const toggleLike = async (id) => {
    if (!checkLogin()) return;

    const alreadyLiked = likedArtworks[id];

    // Optimistic UI update
    setLikedArtworks((prev) => ({
      ...prev,
      [id]: !alreadyLiked,
    }));

    if (!alreadyLiked) {
      // ADD
      const art = artworks.find((a) => a.id === id);
      const ok = await addToWishlist(art);
      if (!ok) {
        setLikedArtworks((prev) => ({ ...prev, [id]: false }));
      }
    } else {
      // REMOVE
      const ok = await removeFromWishlist(id);
      if (!ok) {
        setLikedArtworks((prev) => ({ ...prev, [id]: true }));
      }
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
      if (!likedArtworks[id]) {
        const art = artworks.find((a) => a.id === id);

        setLikedArtworks((prev) => ({ ...prev, [id]: true }));

        const ok = await addToWishlist(art);
        if (!ok) {
          setLikedArtworks((prev) => ({ ...prev, [id]: false }));
        }
      }
    }

    lastTapRef.current[id] = now;
  };

  // ---------------------------
  // FILTERS (unchanged)
  // ---------------------------
  const handleSearch = (v) => setSearchKeyword(v.toLowerCase());
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
    return keywordMatch;
  });

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <>
      <Navbar onSearch={handleSearch} />

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
                    className={`like-icon ${
                      likedArtworks[art.id] ? "liked" : ""
                    }`}
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

export default Fcollection;
