import React, { useEffect, useState } from "react";
import CarouselSection from "./CarouselSection";
import AuctionCard from "./AuctionCard";
import "./Auction.css";
import { useNavigate } from "react-router-dom";

export default function Auctions() {
    const [activeTab, setActiveTab] = useState("curators");
    const [auctionTab, setAuctionTab] = useState("current");
    const navigate = useNavigate();
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
                    <p>
                        Bid on exclusive art collections by local artists. Own unique pieces
                        directly from emerging talent.
                    </p>
                </div>
                <div className="hero-right">
                    <h2>How Auctions Work</h2>
                    <br />
                    <p>
                        Bid on works you love with auctions on Aurtistiq. With bidding
                        opening daily, Aurtistiq connects collectors like you to art from
                        leading auction houses, nonprofit organizations, and sellers across
                        the globe. We feature premium artworks including modern,
                        contemporary, and street art, so you can find works by your favorite
                        artists and discover new ones all in one place.
                    </p>
                    <br />
                    <a href="/learn">Learn more about bidding on Aurtistiq →</a>
                </div>
            </section>
            <nav className="filter-tabs">
                <span
                    className={`breadcrumb-tab ${activeTab === "curators" ? "active" : ""
                        }`}
                    onClick={() => setActiveTab("curators")}
                >
                    Curator's Picks
                </span>
                <span
                    className={`breadcrumb-tab ${activeTab === "trending" ? "active" : ""
                        }`}
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

            {auctionTab === "current" && (
                <section className="live-auctions" id="current-auctions">
                    <h2 className="section-title">Live Auctions</h2>
                    <div className="masonry-grid">
                        {[
                            {
                                img: "live1.jpg",
                                title: "Starry Night",
                                desc: "Classic artwork by Van Gogh.",
                            },
                            {
                                img: "live2.jpg",
                                title: "Modern Splash",
                                desc: "Contemporary style abstract art.",
                            },
                            {
                                img: "live3.jpg",
                                title: "Desert Mirage",
                                desc: "A warm desert-inspired color palette.",
                            },
                            {
                                img: "live4.jpg",
                                title: "Ocean Breeze",
                                desc: "Calm and cool tones resembling the sea.",
                            },
                            {
                                img: "live8.jpg",
                                title: "Urban Jungle",
                                desc: "Dynamic abstract of urban life.",
                            },
                            {
                                img: "live6.jpg",
                                title: "Golden Hour",
                                desc: "Warm glow of sunset-inspired colors.",
                            },
                            {
                                img: "live7.jpg",
                                title: "Bloom Burst",
                                desc: "Vivid floral expression in motion.",
                            },
                            {
                                img: "live5.jpg",
                                title: "Winter Solitude",
                                desc: "Muted tones capturing a cold winter day.",
                            },
                        ].map((item, idx) => (
                            <AuctionCard
                                key={idx}
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

            {auctionTab === "upcoming" && (
                <section className="live-auctions" id="upcoming-auctions">
                    <h2 className="section-title">Upcoming Auctions</h2>
                    <div className="masonry-grid">
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
                                <img src={`./${img}`} alt={`Upcoming ${i + 1}`} />
                                <div className="card-content">
                                    <h3>
                                        {
                                            [
                                                "Celestial Dreams",
                                                "Next Wave",
                                                "Radiant Meadows",
                                                "Urban Renaissance",
                                                "Watercolor Visions",
                                                "Chroma Pulse",
                                                "Mystic Coastlines",
                                                "Nocturne Lights",
                                            ][i]
                                        }
                                    </h3>
                                    <p>Short description as in original markup.</p>
                                    <button
                                        className="bid-btn reminder"
                                        onClick={(e) => {
                                            e.currentTarget.textContent = "Reminder Set";
                                            e.currentTarget.disabled = true;
                                            const msg = e.currentTarget
                                                .closest(".card-content")
                                                .querySelector(".reminder-msg");
                                            if (msg) msg.textContent = "You will be updated soon!";
                                        }}
                                    >
                                        Set Reminder
                                    </button>
                                    <p className="reminder-msg"></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {auctionTab === "past" && (
                <section className="live-auctions" id="past-auctions">
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
                                <img src={`./${img}`} alt={`Past ${i + 1}`} />
                                <div className="card-content">
                                    <h3>
                                        {
                                            [
                                                "Legacy Classics",
                                                "Modern Herita.",
                                                "Abstract Realities",
                                                "Sculpted Time",
                                                "Portrait Magic",
                                                "Floral Impressions",
                                                "Beyond the Horizon",
                                                "Is It better to Speak?",
                                                "See The Magic",
                                                "Freedom",
                                            ][i]
                                        }
                                    </h3>
                                    <div className="auction-desc">
                                        <p>Dreamlike landscapes.</p>
                                        <p className="sold-p">Sale closed.</p>
                                    </div>
                                    <button
                                        className="bid-btn"
                                        onClick={() => navigate(`/auction/p${i + 1}`)}
                                    >
                                        View Results
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
