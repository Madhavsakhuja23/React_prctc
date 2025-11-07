import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Biddetail.css";
import { toast } from "sonner";

export default function BidPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft; // keep ref synced

  const [bids, setBids] = useState([
    { name: "James Smith", amount: 1200 },
    { name: "Ava Martinez", amount: 1100 },
    { name: "Liam Brown", amount: 1000 },
  ]);
  const [newBid, setNewBid] = useState("");
  const [bidError, setBidError] = useState("");
  const [message, setMessage] = useState("");

  // ⏳ Countdown timer + Winner detection + Redirect to Payment
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        if (prev === 1) {
          const userName = localStorage.getItem("Firstname");
          const highestBid = Math.max(...bids.map((b) => b.amount));
          const userBid = bids.find((b) => b.name === userName);
          const bidHistory = JSON.parse(localStorage.getItem("bidHistory") || "[]");

          const artworkEntry = bidHistory.find(
            (entry) => entry.id === id && entry.status === "Participated"
          );

          if (artworkEntry) {
            if (userBid && userBid.amount === highestBid) {
              artworkEntry.status = "Winner";
              localStorage.setItem("isWinner", "true");
              localStorage.setItem("winningArtwork", JSON.stringify(artwork));

              // 🎉 Notify + redirect to payment page
              toast.success(
                "🎉 Congratulations! You are the highest bidder. Redirecting to Payment Page..."
              );

              setTimeout(() => {
                navigate("/Payment", {
                  state: { artwork, winningBid: highestBid },
                });
              }, 3000);
            } else if (bids.some((b) => b.name === userName)) {
              artworkEntry.status = "Top 3";
            } else {
              const index = bidHistory.indexOf(artworkEntry);
              if (index !== -1) bidHistory.splice(index, 1);
            }
            localStorage.setItem("bidHistory", JSON.stringify(bidHistory));
          }
          return 0;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bids, id, artwork, navigate]);

  // 🤖 Auto-bidding simulation (random bidders)
  useEffect(() => {
    const randomBidders = [
      "Sophia Johnson",
      "Olivia Lee",
      "Mason Garcia",
      "Isabella Davis",
      "Ethan Wilson",
      "Benjamin White",
      "Charlotte Young",
    ];

    let timeoutId = null;

    const placeRandomBid = () => {
      if (timeLeftRef.current <= 0) {
        console.log("[AutoBid] Auction ended — stopping auto bids.");
        return;
      }

      setBids((prevBids) => {
        const currentHighest = prevBids.length
          ? Math.max(...prevBids.map((b) => b.amount))
          : 0;

        const randomBidder =
          randomBidders[Math.floor(Math.random() * randomBidders.length)];
        const randomIncrement = Math.floor(Math.random() * 200) + 50;

        const newAutoBid = {
          name: randomBidder,
          amount: currentHighest + randomIncrement,
        };

        console.log(`[AutoBid] ${randomBidder} placed $${newAutoBid.amount}`);

        const updated = [...prevBids, newAutoBid]
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 3);

        // Optional: Save in bid history
        const bidHistory = JSON.parse(localStorage.getItem("bidHistory") || "[]");
        bidHistory.push({
          id,
          title: artwork?.title || `Artwork #${id}`,
          artist: artwork?.artist || "Unknown Artist",
          bidAmount: newAutoBid.amount,
          bidder: randomBidder,
          date: new Date().toISOString(),
          status: "Auto Bid",
        });
        localStorage.setItem("bidHistory", JSON.stringify(bidHistory));

        return updated;
      });

      // Schedule next auto-bid (2–8 seconds)
      const nextDelay = Math.random() * 6000 + 2000;
      timeoutId = setTimeout(placeRandomBid, nextDelay);
    };

    // Start after 3 seconds
    timeoutId = setTimeout(placeRandomBid, 3000);

    return () => clearTimeout(timeoutId);
  }, [id, artwork?.title, artwork?.artist]);

  // 💰 User bid submission
  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (timeLeft <= 0) {
      setBidError("⚠ Auction has ended. No more bids accepted.");
      return;
    }

    const bidValue = parseFloat(newBid);
    if (Number.isNaN(bidValue)) {
      setBidError("⚠ Please enter a valid number.");
      return;
    }

    const currentHighest = bids.length ? Math.max(...bids.map((b) => b.amount)) : 0;

    if (bidValue <= currentHighest) {
      setBidError(
        `⚠ Your bid must be higher than the current highest bid of $${currentHighest}.`
      );
      return;
    }

    const userName = localStorage.getItem("Firstname") || "You";

    const updatedBids = [...bids, { name: userName, amount: bidValue }]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    // 🗂 Save bid to history
    const bidHistory = JSON.parse(localStorage.getItem("bidHistory") || "[]");
    const newEntry = {
      id,
      title: artwork?.title || `Artwork #${id}`,
      artist: artwork?.artist || "Unknown Artist",
      bidAmount: bidValue,
      date: new Date().toISOString(),
      status: "Participated",
    };
    bidHistory.push(newEntry);
    localStorage.setItem("bidHistory", JSON.stringify(bidHistory));

    setBids(updatedBids);
    setNewBid("");
    setBidError("");
  };

  // ⏱ Format countdown
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 🔍 Image zoom
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
        {/* LEFT SECTION */}
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

        {/* RIGHT SECTION */}
        <div className="bid-info-section">
          <h2 className="bid-art-title">{artwork?.title || `Artwork #${id}`}</h2>
          <p className="bid-artist-name">by {artwork?.artist}</p>

          <div className="countdown-timer">
            ⏳ Auction ends in:{" "}
            <span>{timeLeft > 0 ? formatTime(timeLeft) : "ENDED"}</span>
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

          {timeLeft > 0 ? (
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
          ) : (
            <div className="auction-ended">
              <h3>🏁 Auction Ended</h3>
              <p>The highest bid wins! Check your bid history for results.</p>
            </div>
          )}

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
