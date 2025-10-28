import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function CarouselSection({ title, subtitle, itemsPrefix = "c" }) {
  const navigate = useNavigate();
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

  const items = titles.map((t, i) => ({
    id: i + 1,
    title: t,
    artist: artists[i],
    bid: bids[i],
  }));

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
              <img src={`./${itemsPrefix}${item.id}.jpg`} alt={item.title} />
            </div>
            <div className="card-content left-align">
              <div className="art-details">
                <h3 className="art-title">{item.title}</h3>
                <p className="artist-meta">
                  {item.artist} | Current Bid: {item.bid}
                </p>
              </div>
              
              <button
              className="bid-btn"
              onClick={() => navigate(`/bid/${item.id}`, { state: { artwork: item } })}
              >
              Bid Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
