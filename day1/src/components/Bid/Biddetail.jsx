import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Biddetail.css";

export default function BidPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(120);
  const [bids, setBids] = useState([
    { name: "James Smith", amount: 1200 },
    { name: "Ava Martinez", amount: 1100 },
    { name: "Liam Brown", amount: 1000 },
  ]);
  const [newBid, setNewBid] = useState("");
  const [bidError, setBidError] = useState("");
  const [message, setMessage] = useState("");

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto random bids every 5 seconds
  useEffect(() => {
    const randomBidders = [
      "Sophia Johnson",
      "Olivia Lee",
      "Mason Garcia",
      "Isabella Davis",
      "Ethan Wilson",
    ];

    const autoBidInterval = setInterval(() => {
      setBids((prevBids) => {
        if (timeLeft <= 0) return prevBids;

        const randomBidder =
          randomBidders[Math.floor(Math.random() * randomBidders.length)];
        const randomIncrement = Math.floor(Math.random() * 100) + 50;
        const currentHighest = Math.max(...prevBids.map((b) => b.amount));

        const newAutoBid = {
          name: randomBidder,
          amount: currentHighest + randomIncrement,
        };

        const updated = [...prevBids, newAutoBid]
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 3);

        return updated;
      });
    }, 5000);

    return () => clearInterval(autoBidInterval);
  }, []); // run once

  // Handle Bid Submission
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const bidValue = parseFloat(newBid);
    const currentHighest = Math.max(...bids.map((b) => b.amount));

    if (bidValue <= currentHighest) {
      setBidError(`⚠ Your bid must be higher than the current highest bid of $${currentHighest}.`);
      return;
    }

    const userName = localStorage.getItem("Firstname") || "You";

    const updatedBids = [...bids, { name: userName, amount: bidValue }]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);


    setBids(updatedBids);
    setNewBid("");
    setBidError("");
  };

  // Format countdown
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Hover zoom follow cursor
  useEffect(() => {
    const container = document.querySelector(".zoom-image-container");
    const image = document.querySelector(".zoomable-image");
    if (!container || !image) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--x", `${x}%`);
      container.style.setProperty("--y", `${y}%`);
    };

    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="bid-page">
      <div className="bid-container">
        {/* LEFT SIDE */}
        <div className="bidpage-left">
          <div className="zoom-image-container">
            <div className="zoom-image-wrapper">
              <img
                src={`/c${id}.jpg`}
                alt={artwork?.title}
                className="zoomable-image"
              />
            </div>
          </div>
          <div className="back-button-container">
            <button onClick={() => navigate("/Auction")} className="back-button">
              ← Back to Auctions
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bid-info-section">
          <h2 className="bid-art-title">{artwork?.title || `Artwork #${id}`}</h2>
          <p className="bid-artist-name">by {artwork?.artist}</p>

          <div className="countdown-timer">
            ⏳ Auction ends in: <span>{formatTime(timeLeft)}</span>
          </div>

          <div className="top-bids">
            <h3>🏆 Top 3 Bids</h3>
            <ul>
              {bids.map((b, i) => (
                <li key={i}>
                  <span>{b.name}</span>
                  <span>${b.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className="bid-form" onSubmit={handleBidSubmit}>
            <label>Place Your Bid:</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={newBid}
              onChange={(e) => setNewBid(e.target.value)}
              required
            />
            {bidError && <p className="bid-error">{bidError}</p>}
            <button type="submit">Submit Bid</button>
          </form>

          <div className="artist-message">
            <label>Message for Artist:</label>
            <textarea
              rows="3"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="art-description">
            <h3>About this artwork</h3>
            <p>
              {artwork?.description ||
                "This piece captures emotion and movement through subtle tones and layered textures. Each brushstroke reveals the artist’s deep connection with abstract expressionism."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
