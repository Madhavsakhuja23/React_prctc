import React from "react";
import { useNavigate } from "react-router-dom";
import "./Biddetail.css"; // Reuse styles for consistency

export default function BidHistory() {
  const navigate = useNavigate();

  // Get bid history from localStorage, filter for Winner and Top 3 only
  const bidHistory = JSON.parse(localStorage.getItem("bidHistory") || "[]")
    .filter(entry => entry.status === "Winner" || entry.status === "Top 3")
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="bid-page">
      <div className="bid-container">
        <div className="bid-info-section">
          <h2>Your Bid History</h2>
          <p>Track your bidding activity and won auctions.</p>

          {bidHistory.length > 0 ? (
            <div className="bid-history-list">
              {bidHistory.map((bid, index) => (
                <div key={index} className="bid-history-item">
                  <h3>{bid.title}</h3>
                  <p>by {bid.artist}</p>
                  <p>Your Bid: ${bid.bidAmount}</p>
                  <p>Status: <span className={bid.status === "Winner" ? "winner-status" : "top3-status"}>
                    {bid.status === "Winner" ? "🏆 Winner" : "Top 3"}
                  </span></p>
                  <p>Date: {formatDate(bid.date)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't placed any bids yet.</p>
          )}

          <button onClick={() => navigate("/Auction")} className="back-button">
            ← Back to Auctions
          </button>
        </div>
      </div>
    </div>
  );
}
