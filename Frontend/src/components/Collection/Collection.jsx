import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./collection.css";

function Collection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [likedArtworks, setLikedArtworks] = useState({});
  const [priceFilter, setPriceFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [nationalityFilter, setNationalityFilter] = useState([]);
  const [highlighted, setHighlighted] = useState(null);

  // -----------------------------------
  // Disable scroll when sidebar opens
  // -----------------------------------
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  // -----------------------------------
  // ARTWORK LIST
  // -----------------------------------
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

  // -----------------------------------
  // PRICE EXTRACTOR
  // -----------------------------------
  const extractPrice = (str) => {
    const match = String(str).match(/\d+(?:,\d+)?/);
    if (!match) return 0;
    return parseFloat(match[0].replace(/,/g, ""));
  };

  // -----------------------------------
  // FILTER TOGGLERS
  // -----------------------------------
  const toggle = (value, setter) => {
    setter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // -----------------------------------
  // SEARCH HIGHLIGHT LOGIC
  // -----------------------------------
  useEffect(() => {
    if (!searchKeyword) {
      setHighlighted(null);
      return;
    }

    const found = artworks.find(
      (a) =>
        a.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        a.artist.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    setHighlighted(found ? found.id : null);
  }, [searchKeyword]);

  // -----------------------------------
  // APPLY FILTERS
  // -----------------------------------
  const filteredArtworks = artworks.filter((art) => {
    const p = extractPrice(art.price);

    // SEARCH
    if (searchKeyword) {
      const match =
        art.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchKeyword.toLowerCase());
      if (!match) return false;
    }

    // PRICE
    if (priceFilter.length > 0) {
      let ok = false;
      if (priceFilter.includes("under1k") && p < 1000) ok = true;
      if (priceFilter.includes("1to5k") && p >= 1000 && p <= 5000) ok = true;
      if (priceFilter.includes("over5k") && p > 5000) ok = true;
      if (!ok) return false;
    }

    // SIZE
    if (sizeFilter.length > 0 && !sizeFilter.includes(art.size)) return false;

    return true;
  });

  // -----------------------------------
  // LIKE FUNCTION
  // -----------------------------------
  const toggleLike = (id) => {
    setLikedArtworks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Navbar onSearch={setSearchKeyword} />

      {/* FILTER BUTTON */}
      <button className="filter-btn-modern" onClick={() => setSidebarOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"></line>
          <line x1="4" y1="10" x2="4" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="3"></line>
          <line x1="20" y1="21" x2="20" y2="16"></line>
          <line x1="20" y1="12" x2="20" y2="3"></line>
          <line x1="1" y1="14" x2="7" y2="14"></line>
          <line x1="9" y1="8" x2="15" y2="8"></line>
          <line x1="17" y1="16" x2="23" y2="16"></line>
        </svg>
        All Filters
      </button>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="filter-overlay show"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`filter-sidebar-modern ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>

        <h3>Price</h3>
        <label><input type="checkbox" onChange={() => toggle("under1k", setPriceFilter)} /> Under $1,000</label>
        <label><input type="checkbox" onChange={() => toggle("1to5k", setPriceFilter)} /> $1,000 - $5,000</label>
        <label><input type="checkbox" onChange={() => toggle("over5k", setPriceFilter)} /> $5,000+</label>

        <h3>Size</h3>
        <label><input type="checkbox" onChange={() => toggle("Small", setSizeFilter)} /> Small</label>
        <label><input type="checkbox" onChange={() => toggle("Medium", setSizeFilter)} /> Medium</label>
        <label><input type="checkbox" onChange={() => toggle("Large", setSizeFilter)} /> Large</label>
      </div>

      {/* ART GRID */}
      <section className="artsy-grid-section">
        <div className="artsy-masonry">

          {filteredArtworks.length === 0 && (
            <p style={{ textAlign: "center", padding: "1rem" }}>
              No artworks match your filters.
            </p>
          )}

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
              <div className="image-wrapper">
                <img src={art.img} alt={art.title} />
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
