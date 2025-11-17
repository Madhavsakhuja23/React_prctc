import React from "react";

export default function AuctionCard({ img, title, desc, cta, ctaLabel = "View Catalog" }) {
  return (
    <div className="auction-card">
      <img src={img} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <button className="bid-btn" onClick={cta}>
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
