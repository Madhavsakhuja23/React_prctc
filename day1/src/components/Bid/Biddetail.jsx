import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Biddetail.css";

export default function BidDetail() {
  const location = useLocation();
  const { artwork } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(120); // 2 mins timer
  const [currentBid, setCurrentBid] = useState(
    parseInt(artwork?.bid?.replace("$", "")) || 1200
  );
  const [newBid, setNewBid] = useState("");
  const [error, setError] = useState("");

  const [topBidders, setTopBidders] = useState([
    { name: "Alice", amount: currentBid },
    { name: "John", amount: currentBid - 50 },
    { name: "Emma", amount: currentBid - 100 },
  ]);

  // ⏱ Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🤖 Simulate random bids every few seconds
  useEffect(() => {
    const randomBidInterval = setInterval(() => {
      setTopBidders((prev) => {
        const highestBid = Math.max(...prev.map((b) => b.amount));
        const randomIncrease = Math.floor(Math.random() * 50) + 10;
        const newRandomBid = highestBid + randomIncrease;

        const randomNames = ["Sophia", "Oliver", "Liam", "Mia", "Noah"];
        const newBidder = {
          name: randomNames[Math.floor(Math.random() * randomNames.length)],
          amount: newRandomBid,
        };

        const updated = [...prev, newBidder]
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 3);

        setCurrentBid(updated[0].amount);
        return updated;
      });
    }, 8000); // Every 8 seconds

    return () => clearInterval(randomBidInterval);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleBid = () => {
    const bidValue = parseInt(newBid);
    const minBid = currentBid + 20;

    if (isNaN(bidValue)) {
      setError("Please enter a valid number.");
      return;
    }

    if (bidValue < minBid) {
      setError(`Minimum bid should be $${minBid}.`);
      return;
    }

    setError("");
    setNewBid("");

    // 👑 Update top 3 bidders
    const updatedBidders = [
      ...topBidders,
      { name: "You", amount: bidValue },
    ]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    setTopBidders(updatedBidders);
    setCurrentBid(updatedBidders[0].amount);
  };

  return (
    <div className="bid-detail-container">
      <div className="bid-detail-card">
        <div className="bid-left">
          <img
            src={`/c${artwork?.id}.jpg`}
            alt={artwork?.title}
            className="bid-image"
          />
        </div>

        <div className="bid-right">
          <h2 className="bid-title">{artwork?.title}</h2>

          <p className="bid-timer">Auction ends in: {formatTime(timeLeft)}</p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(timeLeft / 120) * 100}%` }}
            ></div>
          </div>

          <p className="current-bid">Current Bid: ${currentBid}</p>
          <p className="next-bid">Next Minimum Bid: ${currentBid + 20}</p>

          <div className="bid-input-section">
            <input
              type="number"
              value={newBid}
              onChange={(e) => setNewBid(e.target.value)}
              placeholder="Enter your bid"
            />
            <button className="place-bid" onClick={handleBid}>
              Place Bid
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="top-bidders">
            <h3>Top 3 Bidders</h3>
            {topBidders.map((bidder, index) => (
              <div
                key={index}
                className={`bid-box ${bidder.name === "You" ? "your-bid" : ""}`}
              >
                {bidder.name}: ${bidder.amount}
              </div>
            ))}
          </div>

          <div className="starting-bid">
            Starting bid: ${artwork?.bid?.replace("$", "")}
          </div>
        </div>
      </div>
    </div>
  );
}
