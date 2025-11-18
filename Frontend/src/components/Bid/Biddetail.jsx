import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Biddetail.css";
import emailjs from "@emailjs/browser";

export default function BidPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork } = location.state || {};

  // BASE PRICE FIX
  const basePrice = Number(
    (artwork?.currentBid ??
      artwork?.price ??
      artwork?.bid ??
      "0")
      .toString()
      .replace(/[^0-9]/g, "")
  );

  const [timeLeft, setTimeLeft] = useState(60);
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState("");
  const [bidError, setBidError] = useState("");
  const [message, setMessage] = useState("");

  const [showCongrats, setShowCongrats] = useState(false);
  const [showSorry, setShowSorry] = useState(false);
  const [winner, setWinner] = useState(null);

  // Set base price once
  useEffect(() => {
    if (basePrice > 0) {
      setBids([{ name: "Starting Price", amount: basePrice }]);
    }
  }, [basePrice]);

  const timeRef = useRef(timeLeft);
  useEffect(() => {
    timeRef.current = timeLeft;
  }, [timeLeft]);

  // Auction End Logic
  useEffect(() => {
    if (timeLeft === 0 && bids.length > 0) {
      const highestBid = bids[0];
      const userName = localStorage.getItem("Firstname") || "You";

      setWinner(highestBid);

      if (highestBid.name === userName) setShowCongrats(true);
      else setShowSorry(true);
    }
  }, [timeLeft, bids]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto Bids System
  useEffect(() => {
    const randomBidders = [
      "Sophia Johnson",
      "Olivia Lee",
      "Mason Garcia",
      "Isabella Davis",
      "Ethan Wilson",
    ];

    const autoBidInterval = setInterval(() => {
      if (timeRef.current <= 3) return;

      setBids((prevBids) => {
        const highest =
          prevBids.length > 0
            ? Math.max(...prevBids.map((b) => b.amount))
            : basePrice;

        const randomIncrement = Math.floor(Math.random() * 100) + 50;

        const randomBidder =
          randomBidders[Math.floor(Math.random() * randomBidders.length)];

        const newAutoBid = {
          name: randomBidder,
          amount: highest + randomIncrement,
        };

        return [...prevBids, newAutoBid]
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 3);
      });
    }, 5000);

    return () => clearInterval(autoBidInterval);
  }, [basePrice]);

  // Manual Bid
  const handleBidSubmit = (e) => {
    e.preventDefault();

    const bidValue = Number(newBid);
    const highest =
      bids.length > 0
        ? Math.max(...bids.map((b) => b.amount))
        : basePrice;

    if (bidValue <= highest) {
      setBidError(
        `Your bid must be higher than the current highest bid of $${highest}.`
      );
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

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  // Confetti Component
  const Confetti = () => {
    useEffect(() => {
      const canvas = document.getElementById("confettiCanvas");
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const colors = ["#a67c52", "#d9c7a0", "#f5e6ca"];
      const particles = [];

      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          w: 10,
          h: 14,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 2,
          rotate: Math.random() * 360,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.y += p.speed;
          p.rotate += 5;

          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotate * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }, []);

    return (
      <canvas
        id="confettiCanvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      ></canvas>
    );
  };

  // EmailJS
  const sendMessageToArtist = () => {
    if (!message.trim()) {
      alert("Message cannot be empty!");
      return;
    }

    const userName = localStorage.getItem("Firstname") || "Anonymous";

    emailjs
      .send(
        "service_xnj2uqj",
        "template_8z9h9za",
        {
          to_email: artwork.artistEmail,
          user_name: userName,
          artwork_title: artwork.title,
          message: message,
        },
        "Utoi2SbtmtWx2iJjf"
      )
      .then(() => {
        alert("Message sent successfully!");
        setMessage("");
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        alert("Failed to send message. Try again.");
      });
  };

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

          <div className="left-back-btn-container">
            <button
              onClick={() => navigate("/Auction")}
              className="back-button"
            >
              ← Back to Auctions
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bid-info-section">
          <h2 className="bid-art-title">
            {artwork?.title || `Artwork #${id}`}
          </h2>
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

            <button
              className="send-msg-btn"
              onClick={sendMessageToArtist}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* WINNER MODALS */}
      {showCongrats && (
        <>
          <Confetti />
          <div className="modal-overlay">
            <div className="modal-box modal-congrats">
              <h2>🎉 Congratulations!</h2>
              <p>
                {winner?.name}, you won with{" "}
                <strong>${winner?.amount}</strong>!
              </p>
              <button onClick={() => navigate("/Auction")}>
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {showSorry && (
        <div className="modal-overlay">
          <div className="modal-box modal-sorry">
            <h2>😔 Auction Ended</h2>
            <p>
              <strong>Better luck next time!</strong>
            </p>
            <button onClick={() => navigate("/Auction")}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
