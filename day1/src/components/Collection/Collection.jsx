import React, { useState, useEffect } from 'react';
import "./collection.css";

function Collection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userName, setUserName] = useState('');
  const artworks = [
    { id: 1, img: 'c1.jpg', artist: 'Bea Kusovszky', title: 'Generational Code V', gallery: 'VILTIN Gallery', price: '€6,200–€6,900' },
    { id: 2, img: 'c2.jpg', artist: 'Isabel Bonilla', title: 'Denim Ocean 15, 2025', gallery: 'PxP Contemporary', price: 'US$100' },
    { id: 3, img: 'c3.jpg', artist: 'Robert Minervini', title: 'Moon Rising, 2024', gallery: 'Rena Bransten Gallery', price: 'US$1,500' },
    { id: 4, img: 'c4.jpg', artist: 'Elena Vasquez', title: 'Urban Reflections', gallery: 'Modern Art Space', price: '€4,500–€5,200' },
    { id: 5, img: 'T1.jpg', artist: 'Marcus Chen', title: 'Digital Dreams', gallery: 'Tech Art Collective', price: 'US$2,800' },
    { id: 6, img: 'T2.jpg', artist: 'Sophia Patel', title: 'Nature\'s Symphony', gallery: 'Green Gallery', price: 'US$3,200' },
    { id: 7, img: 'T3.jpg', artist: 'Diego Ramirez', title: 'Abstract Horizons', gallery: 'Contemporary Visions', price: '€8,900–€9,500' },
    { id: 8, img: 'T4.jpg', artist: 'Luna Zhang', title: 'Cosmic Flow', gallery: 'Space Art Gallery', price: 'US$4,100' },
    { id: 9, img: 'T5.jpg', artist: 'Alex Thompson', title: 'Industrial Beauty', gallery: 'Urban Art Hub', price: 'US$2,600' },
    { id: 10, img: 'T6.jpg', artist: 'Maria Santos', title: 'Ocean Whispers', gallery: 'Maritime Gallery', price: '€7,300–€8,100' },
  ];

  useEffect(() => {
    const fn = sessionStorage.getItem("Firstname");
    if (fn) {
      setUserName(fn);
    }
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      const emailInput = document.getElementById("email");
      if (emailInput) {
        emailInput.value = savedEmail;
      }
    }
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword.toLowerCase());
  };

  const filteredArtworks = artworks.filter(artwork => {
    if (!searchKeyword) return true;
    return artwork.artist.toLowerCase().includes(searchKeyword) ||
      artwork.title.toLowerCase().includes(searchKeyword);
  });

  // const isLiked = (imgSrc) => {
  //   return wishlistItems.some(item => (item.imgSrc || item.img) === imgSrc);
  // };

  return (
    <>
      <div id="filterSidebar" className={`filter-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button id="closeSidebar" onClick={() => setSidebarOpen(false)}>&times;</button>
        <h2>Filters</h2>

        <div className="filter-search">
          <span className="search-icon">&#128269;</span>
          <input type="text" placeholder="Search by keyword…" onChange={(e) => handleSearch(e.target.value)} />
        </div>

        <div className="filter-group">
          <h3>Price</h3>
          <label><input type="checkbox" /> Under $1,000</label><br />
          <label><input type="checkbox" /> $1,000 - $5,000</label><br />
          <label><input type="checkbox" /> $5,000+</label>
        </div>

        <div className="filter-group">
          <h3>Size</h3>
          <label><input type="checkbox" /> Small</label><br />
          <label><input type="checkbox" /> Medium</label><br />
          <label><input type="checkbox" /> Large</label>
        </div>

        <div className="filter-group">
          <h3>Artist Nationality</h3>
          <label><input type="checkbox" /> Indian</label><br />
          <label><input type="checkbox" /> International</label>
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
      <section className="artsy-grid-section">
        <div className="artsy-masonry">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className={`artsy-card ${searchKeyword && (artwork.artist.toLowerCase().includes(searchKeyword) || artwork.title.toLowerCase().includes(searchKeyword)) ? 'highlight' : searchKeyword ? 'dim' : ''}`}
            >
              <div className="image-wrapper">
                <img src={artwork.img} alt={artwork.title} loading="lazy" />
                <div className="double-tap-heart"><i className="fas fa-heart"></i></div>
              </div>
              <div className="artsy-card-info">
                <p className="artist-name">
                  {artwork.artist}
                </p>
                <p className="art-title">{artwork.title}</p>
                <p className="art-gallery">{artwork.gallery}</p>
                <p className="art-price">{artwork.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section >
    </>
  );
}

export default Collection;
