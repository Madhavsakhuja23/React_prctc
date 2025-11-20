import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function CarouselSection({ title, subtitle, itemsPrefix = "c" }) {
  const navigate = useNavigate();
  const [showLoginMsgFor, setShowLoginMsgFor] = useState(null);

  const titles = [
    "Blue Horizon",
    "Eyes Never Lies",
    "Is It Better To Speak?",
    "Hues",
    "To Die",
    "Longing",
    "NeverEver",
    "NeverEver",
    "NeverEver",
    "NeverEver",
  ];

  const artists = [
    "Michael White",
    "John Brown",
    "Conrad Galzine",
    "Misq Evans",
    "Adam Green",
    "Lewis Allen",
    "Baillle Smith",
    "Baillle Smith",
    "Baillle Smith",
    "Baillle Smith",
  ];

  const bids = [
    "$1200",
    "$900",
    "$1000",
    "$1300",
    "$780",
    "$1000",
    "$1200",
    "$1200",
    "$1200",
    "$1200",
  ];

  const artistEmails = [
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
    "manshaverma1716@gmail.com",
  ];

  const items = titles.map((t, i) => ({
    id: i + 1,
    title: t,
    artist: artists[i],
    bid: bids[i],
    artistEmail: artistEmails[i],
  }));

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleBidClick = (itemId, item) => {
    if (isLoggedIn) {
      navigate(`/bid/${item.id}`, { state: { artwork: item } }); // ✔ FIXED
    } else {
      setShowLoginMsgFor(itemId);
    }
  };

  return (
    <div className="carousel-wrapper active">
      <div className="section-header">
        <div className="section-title">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <NavLink to="/Collection" className="view-all">
          View All →
        </NavLink>
      </div>

      <div className="carousel-track scrollable">
        {items.map((item) => (
          <div className="carousel-card" key={item.id}>
            <div className="card-img-wrapper">
              {/* ✔ FIXED IMAGE PATH */}
              <img
                src={`/${itemsPrefix}${item.id}.jpg`}
                alt={item.title}
              />
            </div>

            <div className="card-content left-align">
              <div className="art-details">
                <h3 className="art-title">{item.title}</h3>
                <p className="artist-meta">
                  {item.artist} | Base Price: {item.bid}
                </p>
              </div>

              {/* BID BUTTON */}
              <button
                className="bid-btn"
                onClick={() => handleBidClick(item.id, item)}
              >
                Bid Now
              </button>

              {/* SHOW LOGIN MESSAGE ONLY FOR THIS ITEM */}
              {showLoginMsgFor === item.id && !isLoggedIn && (
                <p
                  style={{
                    color: "#7a6c5d",
                    fontSize: "0.9rem",
                    marginTop: "5px",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  Please log in first to place a bid.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
