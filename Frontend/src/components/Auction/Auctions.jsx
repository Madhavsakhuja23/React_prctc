import React, { useEffect, useState } from "react";
import CarouselSection from "./CarouselSection";
import AuctionCard from "./AuctionCard";
import "./Auction.css";
import { useNavigate } from "react-router-dom";

export default function Auctions() {
  const [activeTab, setActiveTab] = useState("curators");
  const [auctionTab, setAuctionTab] = useState("current");

  const [uploadedArtworks, setUploadedArtworks] = useState([]); // ⭐ DYNAMIC DATA
  const navigate = useNavigate();

  // ⭐ Fetch artworks from backend
  useEffect(() => {
    async function loadArt() {
      try {
        const res = await fetch("http://localhost:5000/api/artworks/all");
        const data = await res.json();
        setUploadedArtworks(data);
      } catch (err) {
        console.log("Error loading uploaded artwork:", err);
      }
    }
    loadArt();
  }, []);

  // ⭐ Split dynamic data by status
  const currentArt = uploadedArtworks.filter((a) => a.status === "current");
  const upcomingArt = uploadedArtworks.filter((a) => a.status === "upcoming");

  // ⭐ Logged-in user UI update
  useEffect(() => {
    const fn = sessionStorage.getItem("Firstname");
    const signIn = document.getElementById("Signin");
    const username = document.getElementById("username");
    if (fn && username && signIn) {
      signIn.style.display = "none";
      username.style.display = "inline";
      username.innerText = fn;
    }
  }, []);

  return (
    <>
      <section className="auction-hero">
        <div className="hero-left">
          <h1>Auctions</h1>
          <p>Bid on exclusive art collections by local artists.</p>
        </div>
        <div className="hero-right">
          <h2>How Auctions Work</h2>
          <p>
            Bid on works you love with auctions on Aurtistiq. With bidding
            opening daily, you can discover new artists every day.
          </p>
          <a href="/learn">Learn more →</a>
        </div>
      </section>

      {/* Top Tabs */}
      <nav className="filter-tabs">
        <span
          className={`breadcrumb-tab ${activeTab === "curators" ? "active" : ""}`}
          onClick={() => setActiveTab("curators")}
        >
          Curator's Picks
        </span>
        <span
          className={`breadcrumb-tab ${activeTab === "trending" ? "active" : ""}`}
          onClick={() => setActiveTab("trending")}
        >
          Trending Lots
        </span>
      </nav>

      <section className="carousel-section">
        {activeTab === "curators" ? (
          <CarouselSection
            key="curators"
            title="Curator’s Picks"
            subtitle="Works that Aurtistiq curators love."
            itemsPrefix="c"
          />
        ) : (
          <CarouselSection
            key="trending"
            title="Trending Lots"
            subtitle="Works with the most bids today."
            itemsPrefix="T"
          />
        )}
      </section>

      {/* Auction Tabs */}
      <div className="auction-tabs">
        {["current", "upcoming", "past"].map((t) => (
          <span
            key={t}
            className={`auction-tab ${auctionTab === t ? "active" : ""}`}
            onClick={() => setAuctionTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </span>
        ))}
      </div>

      {/* ⭐ CURRENT AUCTIONS (STATIC + DYNAMIC) */}
      {auctionTab === "current" && (
        <section className="live-auctions" id="current-auctions">
          <h2 className="section-title">Live Auctions</h2>
          <div className="masonry-grid">

            {/* ⭐ BACKEND CURRENT */}
            {currentArt.map((item) => (
              <AuctionCard
                key={item._id}
                img={item.image} // base64 / url
                title={item.title}
                desc={item.desc}
                cta={() => navigate(`/auction/${item._id}`)}
                ctaLabel="View Catalog"
              />
            ))}

            {/* ⭐ STATIC CURRENT ART */}
            {[
              { img: "live1.jpg", title: "Starry Night", desc: "Classic artwork by Van Gogh." },
              { img: "live2.jpg", title: "Modern Splash", desc: "Contemporary style abstract art." },
              { img: "live3.jpg", title: "Desert Mirage", desc: "Desert-inspired palette." },
              { img: "live4.jpg", title: "Ocean Breeze", desc: "Cool ocean-like tones." },
              { img: "live8.jpg", title: "Urban Jungle", desc: "Abstract urban life." },
              { img: "live6.jpg", title: "Golden Hour", desc: "Warm sunset glow." },
              { img: "live7.jpg", title: "Bloom Burst", desc: "Floral explosion." },
              { img: "live5.jpg", title: "Winter Solitude", desc: "Cold winter scenery." },
            ].map((item, idx) => (
              <AuctionCard
                key={`static-${idx}`}
                img={`./${item.img}`}
                title={item.title}
                desc={item.desc}
                cta={() => navigate(`/auction/c${idx + 1}`)}
                ctaLabel="View Catalog"
              />
            ))}
          </div>
        </section>
      )}

      {/* ⭐ UPCOMING AUCTIONS (STATIC + DYNAMIC) */}
      {auctionTab === "upcoming" && (
        <section className="live-auctions" id="upcoming-auctions">
          <h2 className="section-title">Upcoming Auctions</h2>
          <div className="masonry-grid">

            {/* ⭐ BACKEND UPCOMING */}
            {upcomingArt.map((item) => (
              <AuctionCard
                key={item._id}
                img={item.image}
                title={item.title}
                desc={item.desc}
                cta={() => {}}
                ctaLabel="Coming Soon"
              />
            ))}

            {/* ⭐ STATIC UPCOMING */}
            {[
              "upcoming1.jpg",
              "upcoming2.jpg",
              "upcoming3.jpg",
              "upcoming4.jpg",
              "upcoming5.jpg",
              "upcoming6.jpg",
              "upcoming7.jpg",
              "upcoming8.jpg",
            ].map((img, i) => (
              <div className="auction-card" key={i}>
                <img src={`./${img}`} alt="" />
                <div className="card-content">
                  <h3>Upcoming Artwork {i + 1}</h3>
                  <button className="bid-btn reminder">Set Reminder</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ⭐ PAST AUCTIONS */}
      {auctionTab === "past" && (
        <section className="live-auctions">
          <h2 className="section-title">Past Auctions</h2>
          <div className="masonry-grid">
            {[
              "past1.jpg",
              "past2.jpg",
              "past3.jpg",
              "past4.jpg",
              "past5.jpg",
              "past6.jpg",
              "past7.jpg",
              "c1.jpg",
              "c2.jpg",
              "c6.jpg",
            ].map((img, i) => (
              <div className="auction-card past-card" key={i}>
                <img src={`./${img}`} alt="" />
                <div className="card-content">
                  <h3>Past Art {i + 1}</h3>
                  <button className="bid-btn">View Results</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
