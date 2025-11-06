import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./collection.css";

function Collection() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [likedArtworks, setLikedArtworks] = useState({});
    const [userName, setUserName] = useState("");
    const [priceFilter, setPriceFilter] = useState([]);
    const [sizeFilter, setSizeFilter] = useState([]);
  const artworks = [
    { id: 1, img: 'c1.jpg', artist: 'Bea Kusovszky', title: 'Generational Code V', gallery: 'VILTIN Gallery', price: '€6,200–€6,900', size: "Small" },
    { id: 2, img: 'c2.jpg', artist: 'Isabel Bonilla', title: 'Denim Ocean 15, 2025', gallery: 'PxP Contemporary', price: 'US$100', size: "Small" },
    { id: 3, img: 'c3.jpg', artist: 'Robert Minervini', title: 'Moon Rising, 2024', gallery: 'Rena Bransten Gallery', price: 'US$1,500' , size: "Large"},
    { id: 4, img: 'c4.jpg', artist: 'Elena Vasquez', title: 'Urban Reflections', gallery: 'Modern Art Space', price: '€4,500–€5,200' , size: "Medium"},
    { id: 5, img: 'T1.jpg', artist: 'Marcus Chen', title: 'Digital Dreams', gallery: 'Tech Art Collective', price: 'US$2,800', size: "Large" },
    { id: 6, img: 'T2.jpg', artist: 'Sophia Patel', title: 'Nature\'s Symphony', gallery: 'Green Gallery', price: 'US$3,200' , size: "Small"},
    { id: 7, img: 'T3.jpg', artist: 'Diego Ramirez', title: 'Abstract Horizons', gallery: 'Contemporary Visions', price: '€8,900–€9,500', size: "Large" },
    { id: 8, img: 'T4.jpg', artist: 'Luna Zhang', title: 'Cosmic Flow', gallery: 'Space Art Gallery', price: 'US$4,100' , size: "Medium"},
    { id: 9, img: 'T5.jpg', artist: 'Alex Thompson', title: 'Industrial Beauty', gallery: 'Urban Art Hub', price: 'US$2,600' , size: "Medium"},
    { id: 10, img: 'T6.jpg', artist: 'Maria Santos', title: 'Ocean Whispers', gallery: 'Maritime Gallery', price: '€7,300–€8,100' , size: "Small"},
  ];

  useEffect(() => {
      const fn = sessionStorage.getItem("Firstname");
      if (fn) setUserName(fn);
    }, []);
  
    const handleSearch = (keyword) => setSearchKeyword(keyword.toLowerCase());
  
    // ✅ Handle checkbox toggles
    const handlePriceChange = (value) => {
      setPriceFilter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    };
  
    const handleSizeChange = (value) => {
      setSizeFilter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    };
  
    // ✅ Helper function to extract numeric price for comparison
    const extractPrice = (priceStr) => {
      const match = priceStr.match(/\d+(?:,\d+)?/g);
      if (!match) return 0;
      return parseFloat(match[0].replace(",", ""));
    };
  
    // ✅ Combined filtering logic
    const filteredArtworks = artworks.filter((artwork) => {
      const keywordMatch =
        !searchKeyword ||
        artwork.artist.toLowerCase().includes(searchKeyword) ||
        artwork.title.toLowerCase().includes(searchKeyword);
  
      const priceValue = extractPrice(artwork.price);
      let priceMatch = true;
  
      if (priceFilter.length > 0) {
        priceMatch = priceFilter.some((range) => {
          if (range === "below1000") return priceValue < 1000;
          if (range === "1000to5000") return priceValue >= 1000 && priceValue <= 5000;
          if (range === "above5000") return priceValue > 5000;
          return false;
        });
      }
  
      const sizeMatch =
        sizeFilter.length === 0 || sizeFilter.includes(artwork.size);
  
      return keywordMatch && priceMatch && sizeMatch;
    });
  
    const toggleLike = (id) => {
      setLikedArtworks((prev) => {
        const isLiking = !prev[id];
        const updated = { ...prev, [id]: isLiking };
        if (isLiking) {
          const heartOverlay = document.querySelector(`#heart-overlay-${id}`);
          if (heartOverlay) {
            heartOverlay.classList.add("animate");
            setTimeout(() => heartOverlay.classList.remove("animate"), 600);
          }
        }
        return updated;
      });
    };

  return (
    <>
    <Navbar onSearch={handleSearch} />
    {/* Sidebar */}
      <div id="filterSidebar" className={`filter-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button id="closeSidebar" onClick={() => setSidebarOpen(false)}>
          &times;
        </button>
        <h2>Filters</h2>

        {/* Search Bar */}
        <div className="filter-search">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Search by artist or title…"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* ✅ Price Filter */}
        <div className="filter-group">
          <h3>Price Range</h3>
          <label>
            <input
              type="checkbox"
              checked={priceFilter.includes("below1000")}
              onChange={() => handlePriceChange("below1000")}
            />
            Below $1000
          </label>
          <label>
            <input
              type="checkbox"
              checked={priceFilter.includes("1000to5000")}
              onChange={() => handlePriceChange("1000to5000")}
            />
            $1000 - $5000
          </label>
          <label>
            <input
              type="checkbox"
              checked={priceFilter.includes("above5000")}
              onChange={() => handlePriceChange("above5000")}
            />
            Above $5000
          </label>
        </div>

        {/* ✅ Size Filter */}
        <div className="filter-group">
          <h3>Artwork Size</h3>
          <label>
            <input
              type="checkbox"
              checked={sizeFilter.includes("Small")}
              onChange={() => handleSizeChange("Small")}
            />
            Small
          </label>
          <label>
            <input
              type="checkbox"
              checked={sizeFilter.includes("Medium")}
              onChange={() => handleSizeChange("Medium")}
            />
            Medium
          </label>
          <label>
            <input
              type="checkbox"
              checked={sizeFilter.includes("Large")}
              onChange={() => handleSizeChange("Large")}
            />
            Large
          </label>
        </div>
      </div>

      
      <button id="openSidebar" className="filter-btn" onClick={() => setSidebarOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <div id="overlay" className={`overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)}></div>
     {/* Artwork Display */}
           <section className="artsy-grid-section">
             <div className="artsy-masonry">
               {filteredArtworks.map((artwork) => (
                 <div
                   key={artwork.id}
                   className={`artsy-card ${
                     searchKeyword
                       ? artwork.artist.toLowerCase().includes(searchKeyword) ||
                         artwork.title.toLowerCase().includes(searchKeyword)
                         ? "highlight"
                         : "dim"
                       : ""
                   }`}
                 >
                   <div className="image-wrapper">
                     <img src={artwork.img} alt={artwork.title} loading="lazy" />
                     <div id={`heart-overlay-${artwork.id}`} className="double-tap-heart">
                       <FaHeart />
                     </div>
                   </div>
     
                   <div className="artsy-card-info">
                     <div className="artist-row">
                       <p className="artist-name">{artwork.artist}</p>
                       <span
                         className={`like-icon ${likedArtworks[artwork.id] ? "liked" : ""}`}
                         onClick={() => toggleLike(artwork.id)}
                       >
                         {likedArtworks[artwork.id] ? <FaHeart /> : <FaRegHeart />}
                       </span>
                     </div>
                     <p className="art-title">{artwork.title}</p>
                     <p className="art-gallery">{artwork.gallery}</p>
                     <p className="art-price">{artwork.price}</p>
                   </div>
                 </div>
               ))}
             </div>
           </section>
    </>
  );
}

export default Collection;
