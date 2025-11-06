import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./collection.css";

function Fcollection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [likedArtworks, setLikedArtworks] = useState({});
  const [userName, setUserName] = useState("");
  const [priceFilter, setPriceFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const artworks = [
    { id: 1, img: 'c1.jpg', artist: 'Bea Kusovszky', title: 'Generational Code V', gallery: 'VILTIN Gallery', price: '€6,200–€6,900', size: "Small" },
    { id: 2, img: 'c2.jpg', artist: 'Isabel Bonilla', title: 'Denim Ocean 15, 2025', gallery: 'PxP Contemporary', price: 'US$100', size: "Small" },
    { id: 3, img: 'c3.jpg', artist: 'Robert Minervini', title: 'Moon Rising, 2024', gallery: 'Rena Bransten Gallery', price: 'US$1,500', size: "Large" },
    { id: 4, img: 'c4.jpg', artist: 'Elena Vasquez', title: 'Urban Reflections', gallery: 'Modern Art Space', price: '€4,500–€5,200', size: "Small" },
    { id: 5, img: 'T1.jpg', artist: 'Marcus Chen', title: 'Digital Dreams', gallery: 'Tech Art Collective', price: 'US$2,800', size: "Medium" },
    { id: 6, img: 'T2.jpg', artist: 'Sophia Patel', title: 'Nature\'s Symphony', gallery: 'Green Gallery', price: 'US$3,200', size: "Medium" },
    { id: 7, img: 'T3.jpg', artist: 'Diego Ramirez', title: 'Abstract Horizons', gallery: 'Contemporary Visions', price: '€8,900–€9,500', size: "Small" },
    { id: 8, img: 'T4.jpg', artist: 'Luna Zhang', title: 'Cosmic Flow', gallery: 'Space Art Gallery', price: 'US$4,100', size: "Large" },
    { id: 9, img: 'T5.jpg', artist: 'Alex Thompson', title: 'Industrial Beauty', gallery: 'Urban Art Hub', price: 'US$2,600', size: "Large" },
    { id: 10, img: 'T6.jpg', artist: 'Maria Santos', title: 'Ocean Whispers', gallery: 'Maritime Gallery', price: '€7,300–€8,100', size: "Large" },
    { id: 11, img: 'c5.jpg', artist: 'James Wilson', title: 'Geometric Patterns', gallery: 'Shape & Form', price: 'US$1,900', size: "Medium" },
    { id: 12, img: 'c6.jpg', artist: 'Anna Kowalski', title: 'Emotional Landscapes', gallery: 'Emotion Art', price: '€5,800–€6,400', size: "Medium" },
    { id: 13, img: 'c7.jpg', artist: 'Carlos Mendoza', title: 'Cultural Fusion', gallery: 'Global Perspectives', price: 'US$3,700', size: "Medium" },
    { id: 14, img: 'C8.jpg', artist: 'Yuki Tanaka', title: 'Minimalist Essence', gallery: 'Zen Gallery', price: 'US$2,200', size: "Small"  },
    { id: 15, img: 'C9.jpg', artist: 'Oliver Brown', title: 'Vintage Vibes', gallery: 'Retro Art House', price: '€4,100–€4,800', size: "Small"  },
    { id: 16, img: 'C10.jpg', artist: 'Isabella Rossi', title: 'Floral Fantasy', gallery: 'Botanical Gallery', price: 'US$3,400', size: "Large"  },
    { id: 17, img: 'past1.jpg', artist: 'David Kim', title: 'Street Art Revolution', gallery: 'Urban Canvas', price: 'US$1,800', size: "Large"  },
    { id: 18, img: 'past2.jpg', artist: 'Emma Johnson', title: 'Surreal Dreams', gallery: 'Dream Gallery', price: '€6,700–€7,300', size: "Large"  },
    { id: 19, img: 'past3.jpg', artist: 'Miguel Torres', title: 'Latin Rhythms', gallery: 'Rhythm Gallery', price: 'US$2,900', size: "Small"  },
    { id: 20, img: 'past4.jpg', artist: 'Nina Schmidt', title: 'Nordic Lights', gallery: 'Scandinavian Art', price: '€5,200–€5,900', size: "Small"  },
    { id: 21, img: 'past6.jpg', artist: 'Raj Patel', title: 'Spice Market', gallery: 'Cultural Heritage', price: 'US$3,100', size: "Medium"  },
    { id: 22, img: 'past5.jpg', artist: 'Sophie Martin', title: 'Parisian Nights', gallery: 'French Elegance', price: '€7,800–€8,400', size: "Medium"  },
    { id: 23, img: 'live1.jpg', artist: 'Liam Garcia', title: 'Desert Mirage', gallery: 'Desert Art Gallery', price: 'US$2,500', size: "Large"  },
    { id: 24, img: 'live2.jpg', artist: 'Zara Ahmed', title: 'Eastern Mystique', gallery: 'Oriental Gallery', price: 'US$4,200', size: "Large"  },
    { id: 25, img: 'live3.jpg', artist: 'Tom Harrison', title: 'British Countryside', gallery: 'English Heritage', price: '€6,100–€6,800' , size: "Medium"},
    { id: 26, img: 'live4.jpg', artist: 'Priya Sharma', title: 'Bollywood Dreams', gallery: 'Indian Cinema Art', price: 'US$1,700' , size: "Medium"},
    { id: 27, img: 'live5.jpg', artist: 'Hans Mueller', title: 'Alpine Majesty', gallery: 'Mountain Gallery', price: '€4,900–€5,600' , size: "Large" },
    { id: 28, img: 'live6.jpg', artist: 'Fatima Al-Zahra', title: 'Islamic Geometry', gallery: 'Islamic Art Center', price: 'US$3,800', size: "Large"  },
    { id: 29, img: 'live7.jpg', artist: 'Giovanni Romano', title: 'Italian Renaissance', gallery: 'Renaissance Gallery', price: '€8,200–€9,000' , size: "Small"  },
    { id: 30, img: 'live8.jpg', artist: 'Aisha Khan', title: 'Tribal Patterns', gallery: 'Tribal Art Gallery', price: 'US$2,300', size: "Small"   },
    { id: 31, img: 'live9.jpg', artist: 'Pierre Dubois', title: 'French Impressionism', gallery: 'Impressionist Gallery', price: '€7,500–€8,200', size: "Medium"  },
    { id: 32, img: 'live10.jpg', artist: 'Mei Ling', title: 'Chinese Landscapes', gallery: 'Chinese Art Museum', price: 'US$4,500' , size: "Large" },
    { id: 33, img: 'live11.jpg', artist: 'Antonio Silva', title: 'Brazilian Carnival', gallery: 'Carnival Gallery', price: 'US$3,300', size: "Large" },
    { id: 34, img: 'live13.jpg', artist: 'Sarah Connor', title: 'Cyberpunk Visions', gallery: 'Future Art Gallery', price: '€5,700–€6,400', size: "Medium" },
    { id: 35, img: 'upcoming8.jpg', artist: 'Jordan Blake', title: 'Urban Exploration', gallery: 'City Art Collective', price: 'US$2,100', size: "Large"  },
    { id: 36, img: 'upcoming7.jpg', artist: 'Amelia Rose', title: 'Garden of Eden', gallery: 'Paradise Gallery', price: '€6,900–€7,600' , size: "Medium" },
    { id: 37, img: 'upcoming6.jpg', artist: 'Victor Kane', title: 'Noir Mysteries', gallery: 'Film Noir Gallery', price: 'US$3,600' , size: "Small"  },
    { id: 38, img: 'upcoming5.jpg', artist: 'Leila Hassan', title: 'Persian Poetry', gallery: 'Persian Art Center', price: 'US$4,800', size: "Small"   },
    { id: 39, img: 'upcoming4.jpg', artist: 'Felix Weber', title: 'German Expressionism', gallery: 'Expressionist Gallery', price: '€7,100–€7,800' , size: "Medium" },
    { id: 40, img: 'upcoming3.jpg', artist: 'Rosa Martinez', title: 'Cuban Revolution', gallery: 'Revolutionary Art', price: 'US$2,800' , size: "Large" },
    { id: 41, img: 'upcoming2.jpg', artist: 'Kai Nakamura', title: 'Samurai Spirit', gallery: 'Japanese Heritage', price: 'US$5,200' , size: "Large" },
    { id: 42, img: 'upcoming1.jpg', artist: 'Olivia Parker', title: 'Victorian Elegance', gallery: 'Victorian Gallery', price: '€6,400–€7,100' , size: "Medium"},
    { id: 43, img: '1.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 1', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium" },
    { id: 44, img: '3.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 2', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Large"  },
    { id: 45, img: '4.jpg', artist: 'Your Collection', title: 'Personal Masterpiece 3', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Medium" },
    { id: 46, img: 'artist.jpeg', artist: 'Your Collection', title: 'Artist Self-Portrait', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Small"  },
    { id: 47, img: 'banner.jpg', artist: 'Your Collection', title: 'Banner Collection', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Small"  },
    { id: 48, img: 'hero.jpg', artist: 'Your Collection', title: 'Hero Piece', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Large" },
    { id: 49, img: 'new1.jpg', artist: 'Your Collection', title: 'New Acquisition 1', gallery: 'Personal Gallery', price: 'Contact for Price', size: "Medium"  },
    { id: 50, img: 'new2.jpg', artist: 'Your Collection', title: 'New Acquisition 2', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Small" },
    { id: 51, img: 'new3.jpg', artist: 'Your Collection', title: 'New Acquisition 3', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Large" },
    { id: 52, img: 's1.jpg', artist: 'Your Collection', title: 'Series A: Beginning', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Large" },
    { id: 53, img: 's2.jpg', artist: 'Your Collection', title: 'Series A: Journey', gallery: 'Personal Gallery', price: 'Contact for Price'  , size: "Small" },
    { id: 54, img: 's3.jpg', artist: 'Your Collection', title: 'Series A: Climax', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Large" },
    { id: 55, img: 's4.jpg', artist: 'Your Collection', title: 'Series A: Resolution', gallery: 'Personal Gallery', price: 'Contact for Price' , size: "Medium" }
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

      <section className="collect-header">
        <h2>Collect art and design online</h2>
      </section>

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

      <div id="overlay" className={`overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)}></div>

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

export default Fcollection;