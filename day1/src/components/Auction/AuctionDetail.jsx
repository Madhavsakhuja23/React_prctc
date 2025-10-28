import React, { useState, useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import "./AuctionDetail.css";

function AuctionDetail() {
    const { id } = useParams();
    const [reminderSet, setReminderSet] = useState(false);

    // Mock data - in a real app, you'd fetch this from an API
    const auctionData = {
        u1: { title: 'Celestial Dreams', description: 'Futuristic artworks for visionaries.', imageUrl: '/upcoming1.jpg', type: 'upcoming' },
        u2: { title: 'Next Wave', description: 'Emerging trends and new talents.', imageUrl: '/upcoming2.jpg', type: 'upcoming' },
        u3: { title: 'Radiant Meadows', description: 'Nature-themed works by young modernists.', imageUrl: '/upcoming3.jpg', type: 'upcoming' },
        u4: { title: 'Urban Renaissance', description: 'Contemporary views of city life.', imageUrl: '/upcoming4.jpg', type: 'upcoming' },
        u5: { title: 'Digital Horizons', description: 'Futuristic digital art explorations.', imageUrl: '/upcoming5.jpg', type: 'upcoming' },
        u6: { title: 'Abstract Emotions', description: 'Emotional expressions through abstraction.', imageUrl: '/upcoming6.jpg', type: 'upcoming' },
        u7: { title: 'Nature\'s Whisper', description: 'Subtle interpretations of natural beauty.', imageUrl: '/upcoming7.jpg', type: 'upcoming' },
        u8: { title: 'Cultural Mosaic', description: 'Blending traditions in modern art.', imageUrl: '/upcoming8.jpg', type: 'upcoming' },
        c1: {
            title: 'Whispers of the Wind',
            description: 'A serene portrayal of nature\'s unseen motion. The wind\'s passage through tall grass made visible through brushstrokes. Invites viewers to pause and breathe with the landscape.',
            imageUrl: '/live1.jpg',
            type: 'current',
            artistName: 'Ava Rodriguez',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=AR',
            exhibitions: 'Latin American Art Fair 2022, Serenity in Canvas 2023',
            topBids: [
                { name: 'Rook Van Doren', amount: 2450, time: '1 min ago' },
                { name: 'Erika Fane', amount: 2300, time: '10 min ago' },
                { name: 'Michael', amount: 2200, time: '20 min ago' }
            ],
            minBid: 2451
        },
        c2: {
            title: 'Ethereal Echoes',
            description: 'Abstract pieces inspired by nature.',
            imageUrl: '/live2.jpg',
            type: 'current',
            artistName: 'John Doe',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=JD',
            exhibitions: 'Modern Art Expo 2021, Nature\'s Call 2022',
            topBids: [
                { name: 'Alice Smith', amount: 2100, time: '5 min ago' },
                { name: 'Bob Johnson', amount: 2000, time: '15 min ago' },
                { name: 'Charlie Brown', amount: 1900, time: '30 min ago' }
            ],
            minBid: 2101
        },
        c3: {
            title: 'Cosmic Canvas',
            description: 'Space-themed digital art.',
            imageUrl: '/live3.jpg',
            type: 'current',
            artistName: 'Jane Smith',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=JS',
            exhibitions: 'Digital Dreams 2020, Space Odyssey 2023',
            topBids: [
                { name: 'David Lee', amount: 1800, time: '2 min ago' },
                { name: 'Eva Green', amount: 1700, time: '12 min ago' },
                { name: 'Frank White', amount: 1600, time: '25 min ago' }
            ],
            minBid: 1801
        },
        c4: {
            title: 'Urban Mosaic',
            description: 'Cityscapes in vibrant colors.',
            imageUrl: '/live4.jpg',
            type: 'current',
            artistName: 'Carlos Mendez',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=CM',
            exhibitions: 'Urban Art Festival 2021, City Lights 2022',
            topBids: [
                { name: 'Grace Liu', amount: 1950, time: '3 min ago' },
                { name: 'Henry Park', amount: 1850, time: '18 min ago' },
                { name: 'Ivy Chen', amount: 1750, time: '35 min ago' }
            ],
            minBid: 1951
        },
        c5: {
            title: 'Surreal Visions',
            description: 'Dreamlike scenes that challenge reality.',
            imageUrl: '/live5.jpg',
            type: 'current',
            artistName: 'Luna Garcia',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=LG',
            exhibitions: 'Surrealism Revival 2020, Dreamscapes 2023',
            topBids: [
                { name: 'Jack Wilson', amount: 2200, time: '7 min ago' },
                { name: 'Kara Patel', amount: 2100, time: '22 min ago' },
                { name: 'Liam Torres', amount: 2000, time: '40 min ago' }
            ],
            minBid: 2201
        },
        c6: {
            title: 'Geometric Harmony',
            description: 'Balanced compositions with geometric shapes.',
            imageUrl: '/live6.jpg',
            type: 'current',
            artistName: 'Maya Singh',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=MS',
            exhibitions: 'Geometric Art Expo 2019, Balance in Form 2022',
            topBids: [
                { name: 'Noah Kim', amount: 1650, time: '4 min ago' },
                { name: 'Olivia Ruiz', amount: 1550, time: '19 min ago' },
                { name: 'Parker Lee', amount: 1450, time: '33 min ago' }
            ],
            minBid: 1651
        },
        c7: {
            title: 'Ocean Depths',
            description: 'Mysterious underwater worlds.',
            imageUrl: '/live7.jpg',
            type: 'current',
            artistName: 'Quinn Brooks',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=QB',
            exhibitions: 'Oceanic Visions 2021, Deep Blue 2023',
            topBids: [
                { name: 'Riley Adams', amount: 2350, time: '6 min ago' },
                { name: 'Sophia Nguyen', amount: 2250, time: '21 min ago' },
                { name: 'Tyler Wong', amount: 2150, time: '38 min ago' }
            ],
            minBid: 2351
        },
        c8: {
            title: 'Industrial Elegance',
            description: 'Beauty in urban decay and machinery.',
            imageUrl: '/live8.jpg',
            type: 'current',
            artistName: 'Violet Zhao',
            artistImage: 'https://placehold.co/80x80/3b2d22/f9f5ee?text=VZ',
            exhibitions: 'Industrial Revolution 2020, Urban Decay 2022',
            topBids: [
                { name: 'William Chen', amount: 2050, time: '8 min ago' },
                { name: 'Xena Patel', amount: 1950, time: '23 min ago' },
                { name: 'Yusuf Ali', amount: 1850, time: '41 min ago' }
            ],
            minBid: 2051
        },
        p1: {
            title: 'Legacy Classics',
            description: 'This historic masterpiece captures the tranquil essence of early 20th-century French landscapes, blending rich color fields with a subtle impressionist touch.',
            imageUrl: '/past1.jpg',
            type: 'past',
            artist: 'Henri Dubois',
            medium: 'Oil on canvas',
            dimensions: '110 x 85 cm (43.3 × 33.5 in)',
            year: '1923',
            auctionDate: 'July 1, 2025',
            estimatePrice: '$15,000 – $25,000',
            hammerPrice: '$22,500',
            buyer: 'Collector A (Paris)',
            provenance: [
                'Private Collection, Lyon (1925–1950)',
                'Galerie des Beaux-Arts, Paris (1950–1978)',
                'Estate of Henri Dubois (1978–2020)'
            ],
            exhibitionHistory: [
                'French Impressionists, Musée d\'Orsay, Paris, 1930',
                'Masters of Modern Art, Tate Gallery, London, 1954',
                'European Landscapes, The Met, New York, 1987'
            ],
            literature: [
                'J. Moreau, Impressionism in France, 1948, p. 142',
                'L. Bernard, Art of the Early 20th Century, 1965, p. 220',
                'P. Girard, Legacy of Dubois, 1999, p. 87'
            ],
            relatedLots: [
                { lotNumber: '14', title: 'Legacy Classics', medium: 'Oil on canvas', hammerPrice: '$22,500', buyer: 'Collector A (Paris)' },
                { lotNumber: '15', title: 'Sunlit Fields', medium: 'Oil on canvas', hammerPrice: '$18,200', buyer: 'Anonymous' },
                { lotNumber: '16', title: 'The Evening Calm', medium: 'Oil on panel', hammerPrice: '$10,900', buyer: 'Gallery Lumière' }
            ]
        },
        p2: {
            title: 'Modern Heritage',
            description: 'A vibrant exploration of contemporary themes through abstract forms.',
            imageUrl: '/past2.jpg',
            type: 'past',
            artist: 'Elena Vasquez',
            medium: 'Acrylic on canvas',
            dimensions: '120 x 90 cm',
            year: '2018',
            auctionDate: 'March 15, 2024',
            estimatePrice: '$10,000 – $18,000',
            hammerPrice: '$16,500',
            buyer: 'Private Collector',
            provenance: ['Artist\'s Studio (2018–2020)', 'Gallery Modern, Berlin (2020–2023)'],
            exhibitionHistory: ['Abstract Visions, Berlin Biennale, 2019', 'Contemporary Art Fair, Paris, 2021'],
            literature: ['E. Vasquez Retrospective, 2020'],
            relatedLots: [
                { lotNumber: '22', title: 'Modern Heritage', medium: 'Acrylic on canvas', hammerPrice: '$16,500', buyer: 'Private Collector' }
            ]
        },
        p3: {
            title: 'Abstract Realities',
            description: 'Dreamlike landscapes blending reality and abstraction.',
            imageUrl: '/past3.jpg',
            type: 'past',
            artist: 'Marcus Lee',
            medium: 'Mixed media',
            dimensions: '100 x 80 cm',
            year: '2015',
            auctionDate: 'November 10, 2023',
            estimatePrice: '$8,000 – $15,000',
            hammerPrice: '$12,200',
            buyer: 'Museum of Modern Art',
            provenance: ['Artist Collection (2015–2018)', 'Contemporary Gallery, NY (2018–2022)'],
            exhibitionHistory: ['Surrealism Today, MoMA, 2017', 'Mixed Media Masters, London, 2020'],
            literature: ['M. Lee: Abstract Dreams, 2019'],
            relatedLots: [
                { lotNumber: '18', title: 'Abstract Realities', medium: 'Mixed media', hammerPrice: '$12,200', buyer: 'Museum of Modern Art' }
            ]
        },
        p4: {
            title: 'Sculpted Time',
            description: 'A timeless sculpture representing the passage of time.',
            imageUrl: '/past4.jpg',
            type: 'past',
            artist: 'Sophia Chen',
            medium: 'Bronze',
            dimensions: '150 x 60 x 60 cm',
            year: '2010',
            auctionDate: 'September 5, 2023',
            estimatePrice: '$20,000 – $35,000',
            hammerPrice: '$28,000',
            buyer: 'Private Foundation',
            provenance: ['Artist\'s Foundry (2010–2015)', 'Sculpture Park, Tokyo (2015–2022)'],
            exhibitionHistory: ['Time and Form, Venice Biennale, 2012', 'Bronze Masters, Paris, 2018'],
            literature: ['S. Chen: Sculptural Narratives, 2016'],
            relatedLots: [
                { lotNumber: '25', title: 'Sculpted Time', medium: 'Bronze', hammerPrice: '$28,000', buyer: 'Private Foundation' }
            ]
        },
        p5: {
            title: 'Vintage Visions',
            description: 'Classic artworks from bygone eras.',
            imageUrl: '/past5.jpg',
            type: 'past',
            artist: 'Pierre Moreau',
            medium: 'Oil on canvas',
            dimensions: '95 x 75 cm',
            year: '1955',
            auctionDate: 'June 20, 2024',
            estimatePrice: '$12,000 – $20,000',
            hammerPrice: '$17,500',
            buyer: 'European Collector',
            provenance: ['Private Estate (1955–1980)', 'Old Masters Gallery, London (1980–2020)'],
            exhibitionHistory: ['Post-War Art, National Gallery, 1960', 'Vintage Masters, Rome, 1995'],
            literature: ['P. Moreau: A Retrospective, 1975'],
            relatedLots: [
                { lotNumber: '12', title: 'Vintage Visions', medium: 'Oil on canvas', hammerPrice: '$17,500', buyer: 'European Collector' }
            ]
        },
        p6: {
            title: 'Historical Moments',
            description: 'Art capturing significant historical events.',
            imageUrl: '/past6.jpg',
            type: 'past',
            artist: 'Anna Petrov',
            medium: 'Watercolor on paper',
            dimensions: '70 x 50 cm',
            year: '1940',
            auctionDate: 'April 12, 2024',
            estimatePrice: '$5,000 – $10,000',
            hammerPrice: '$7,800',
            buyer: 'History Museum',
            provenance: ['Artist\'s Archive (1940–1960)', 'Historical Society, Moscow (1960–2020)'],
            exhibitionHistory: ['War and Peace, Hermitage, 1945', 'Historical Artifacts, Berlin, 1980'],
            literature: ['A. Petrov: Witness to History, 1950'],
            relatedLots: [
                { lotNumber: '8', title: 'Historical Moments', medium: 'Watercolor on paper', hammerPrice: '$7,800', buyer: 'History Museum' }
            ]
        },
        p7: {
            title: 'Timeless Beauty',
            description: 'Enduring pieces that transcend time.',
            imageUrl: '/past7.jpg',
            type: 'past',
            artist: 'Isabella Rossi',
            medium: 'Marble sculpture',
            dimensions: '180 x 70 x 70 cm',
            year: '1995',
            auctionDate: 'January 8, 2024',
            estimatePrice: '$25,000 – $40,000',
            hammerPrice: '$32,000',
            buyer: 'International Gallery',
            provenance: ['Artist\'s Studio (1995–2005)', 'Modern Sculpture Museum, Milan (2005–2022)'],
            exhibitionHistory: ['Timeless Forms, Florence Biennale, 2000', 'Sculpture Renaissance, NY, 2015'],
            literature: ['I. Rossi: Eternal Beauty, 2010'],
            relatedLots: [
                { lotNumber: '30', title: 'Timeless Beauty', medium: 'Marble sculpture', hammerPrice: '$32,000', buyer: 'International Gallery' }
            ]
        },
        p8: {
            title: 'Legacy Collections',
            description: 'Curated sets from renowned artists.',
            imageUrl: '/past8.jpg',
            type: 'past',
            artist: 'Various Artists',
            medium: 'Mixed collection',
            dimensions: 'Various',
            year: 'Various',
            auctionDate: 'October 15, 2023',
            estimatePrice: '$50,000 – $80,000',
            hammerPrice: '$65,000',
            buyer: 'Private Museum',
            provenance: ['Estate Collections (Various)', 'Legacy Auctions, Paris (2020–2023)'],
            exhibitionHistory: ['Masterpieces Collection, Louvre, 2021', 'Art Legacy, Tokyo, 2022'],
            literature: ['Legacy of Masters, 2022'],
            relatedLots: [
                { lotNumber: '35', title: 'Legacy Collections', medium: 'Mixed collection', hammerPrice: '$65,000', buyer: 'Private Museum' }
            ]
        },
    };

    const auction = auctionData[id];

    if (!auction) {
        return <div>Auction not found</div>;
    }

    if (auction.type === 'current') {
        return <CurrentAuctionDetail auction={auction} />;
    }

    if (auction.type === 'past') {
        return <PastAuctionDetail auction={auction} />;
    }

    return (
        <div className="auction-detail">
            <h1>{auction.title}</h1>
            <img src={auction.imageUrl} alt={auction.title} />
            <p>{auction.description}</p>
            {auction.type === 'upcoming' && (
                <div>
                    <button className="bid-btn" onClick={() => setReminderSet(true)}>Set Reminder</button>
                    {reminderSet && <p>You will be updated soon.</p>}
                </div>
            )}
        </div>
    );
}

function CurrentAuctionDetail({ auction }) {
    const [countdown, setCountdown] = useState('02:15:30');
    const [zoomScale, setZoomScale] = useState(1);
    const [zoomOrigin, setZoomOrigin] = useState('center center');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        const auctionEnd = new Date().getTime() + (2 * 60 * 60 * 1000 + 15 * 60 * 1000 + 30 * 1000); // 2h 15m 30s

        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const diff = auctionEnd - now;

            if (diff <= 0) {
                clearInterval(updateCountdown);
                setCountdown('Auction Closed');
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(updateCountdown);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        setZoomOrigin(`${xPercent}% ${yPercent}%`);
    };

    const handleMouseEnter = () => {
        setZoomScale(2);
    };

    const handleMouseLeave = () => {
        setZoomScale(1);
        setZoomOrigin('center center');
    };

    const animateButton = () => {
        setButtonClicked(true);
        setTimeout(() => setButtonClicked(false), 600);
    };

    const handleSendMessage = () => {
        // Handle send message
        animateButton();
    };

    const handleSubmitBid = () => {
        // Handle bid submission
        animateButton();
    };

    return (
        <div>
            <h1>{auction.title}</h1>

            <div className="first-section">
                <div className="left-column">
                    <div
                        className="art-preview"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={auction.imageUrl}
                            alt={auction.title}
                            style={{
                                transform: `scale(${zoomScale})`,
                                transformOrigin: zoomOrigin,
                                transition: 'transform 0.2s ease',
                            }}
                        />
                    </div>
                </div>

                <div className="right-column">
                    <div className="info-card">
                        <div className="info-section timer">
                            Auction ends in: <span id="countdown">{countdown}</span>
                        </div>

                        <div className="info-section">
                            <h3>Bidding Guidelines</h3>
                            <ul>
                                <li>Minimum bid increment: $50</li>
                                <li>Bidding closes at the time shown on the timer</li>
                                <li>Winners will be notified via registered email</li>
                            </ul>
                        </div>

                        <div className="info-section artist">
                            <h3>Artist Info</h3>
                            <div className="artist-flex">
                                <img src={auction.artistImage} alt="Artist Profile" />
                                <div>
                                    <p><strong>Name:</strong> {auction.artistName}</p>
                                    <p><strong>Exhibitions:</strong> {auction.exhibitions}</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-section bids">
                            <h3>Top 3 Bids</h3>
                            <ul>
                                {auction.topBids.map((bid, index) => (
                                    <li key={index}>
                                        <strong>{bid.name}</strong> — ${bid.amount} <em>({bid.time})</em>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="second-section">
                <div className="section description">
                    <h3>About the Art</h3>
                    <p>{auction.description}</p>
                </div>

                <div className="section message-artist">
                    <h3>Message the Artist</h3>
                    <input
                        type="text"
                        placeholder="Subject"
                        maxLength="50"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <textarea
                        placeholder="Ask the artist about their work (max 300 characters)"
                        maxLength="300"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className={buttonClicked ? 'clicked' : ''}
                        onClick={handleSendMessage}
                    >
                        Send Message
                    </button>
                </div>

                <div className="section place-bid">
                    <h3>Place Your Bid</h3>
                    <input
                        type="number"
                        placeholder="Enter bid amount"
                        min={auction.minBid}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                    />
                    <button
                        className={buttonClicked ? 'clicked' : ''}
                        onClick={handleSubmitBid}
                    >
                        Submit Bid
                    </button>
                </div>

                <div className="back-link">
                    <Link to="/">← Back to Auctions</Link>
                </div>
            </div>
        </div>
    );
}

function PastAuctionDetail({ auction }) {
    return (
        <div style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            backgroundColor: "#f5efe6",
            color: "#4b3f33",
            margin: 0,
            padding: "24px",
            lineHeight: 1.6
        }}>
            <div style={{
                maxWidth: "940px",
                margin: "0 auto",
                background: "white",
                padding: "2rem 2.2rem",
                borderRadius: "14px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2.2rem",
                    marginBottom: "2rem",
                    alignItems: "flex-start"
                }}>
                    <div style={{
                        flex: "1 1 300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginBottom: "20px"
                    }}>
                        <img
                            src={auction.imageUrl}
                            alt={`Oil painting '${auction.title}' by ${auction.artist} (${auction.year})`}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: 0,
                                boxShadow: "0 6px 20px rgba(0,0,0,0.22)",
                                background: "#d8cfc3"
                            }}
                        />
                    </div>
                    <div style={{ flex: "1 1 500px" }}>
                        <h1 style={{
                            fontFamily: "'Georgia', serif",
                            color: "#5a4632",
                            marginTop: 0,
                            marginBottom: "1.1rem",
                            fontSize: "2rem"
                        }}>{auction.title}</h1>
                        <div style={{
                            background: "#f9f5ee",
                            borderRadius: "8px",
                            padding: "1rem 1.2rem",
                            marginBottom: "1.2rem",
                            fontStyle: "italic",
                            color: "#7a6c5d",
                            fontSize: "1.05em"
                        }}>
                            <strong>{auction.title}</strong> is a landmark artwork, celebrated for its masterful technique and evocative portrayal of a pivotal era in art history.
                        </div>
                        <div style={{ marginBottom: "1.2rem" }}>
                            <p style={{ margin: "0.5rem 0", fontSize: "1.07rem" }}><strong>Artist:</strong> {auction.artist}</p>
                            <p style={{ margin: "0.5rem 0", fontSize: "1.07rem" }}><strong>Medium:</strong> {auction.medium}</p>
                            <p style={{ margin: "0.5rem 0", fontSize: "1.07rem" }}><strong>Dimensions:</strong> {auction.dimensions}</p>
                            <p style={{ margin: "0.5rem 0", fontSize: "1.07rem" }}><strong>Year:</strong> {auction.year}</p>
                            <p style={{ margin: "0.5rem 0", fontSize: "1.07rem" }}><strong>Description:</strong> {auction.description}</p>
                            <p style={{ margin: "0.5rem 0", fontSize: "1.07rem" }}><strong>Auction Date:</strong> {auction.auctionDate}</p>
                            <p style={{ margin: "0.5rem 0", fontSize: "1.07rem" }}><strong>Estimate Price:</strong> {auction.estimatePrice}</p>
                        </div>
                    </div>
                </div>

                <h2 style={{
                    fontFamily: "'Georgia', serif",
                    color: "#5a4632",
                    marginTop: "2.2rem",
                    marginBottom: "0.9rem"
                }}>Auction Results</h2>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    margin: "1.1rem 0 1.8rem 0",
                    display: "block",
                    overflowX: "auto",
                    whiteSpace: "nowrap"
                }}>
                    <caption style={{
                        textAlign: "left",
                        fontStyle: "italic",
                        color: "#7a6c5d",
                        padding: "0.5rem 0"
                    }}>
                        Auction results for {auction.title} and related works.
                    </caption>
                    <thead>
                        <tr>
                            <th style={{
                                border: "1px solid #ddd",
                                padding: "0.78rem 1rem",
                                textAlign: "left",
                                backgroundColor: "#8b6f47",
                                color: "white",
                                fontSize: "1rem"
                            }}>Lot Number</th>
                            <th style={{
                                border: "1px solid #ddd",
                                padding: "0.78rem 1rem",
                                textAlign: "left",
                                backgroundColor: "#8b6f47",
                                color: "white",
                                fontSize: "1rem"
                            }}>Title</th>
                            <th style={{
                                border: "1px solid #ddd",
                                padding: "0.78rem 1rem",
                                textAlign: "left",
                                backgroundColor: "#8b6f47",
                                color: "white",
                                fontSize: "1rem"
                            }}>Medium</th>
                            <th style={{
                                border: "1px solid #ddd",
                                padding: "0.78rem 1rem",
                                textAlign: "left",
                                backgroundColor: "#8b6f47",
                                color: "white",
                                fontSize: "1rem"
                            }}>Hammer Price</th>
                            <th style={{
                                border: "1px solid #ddd",
                                padding: "0.78rem 1rem",
                                textAlign: "left",
                                backgroundColor: "#8b6f47",
                                color: "white",
                                fontSize: "1rem"
                            }}>Buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auction.relatedLots.map((lot, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "transparent" : "#f1ebe3" }}>
                                <td style={{
                                    border: "1px solid #ddd",
                                    padding: "0.78rem 1rem",
                                    textAlign: "left",
                                    whiteSpace: "nowrap"
                                }} data-label="Lot Number">{lot.lotNumber}</td>
                                <td style={{
                                    border: "1px solid #ddd",
                                    padding: "0.78rem 1rem",
                                    textAlign: "left",
                                    whiteSpace: "nowrap"
                                }} data-label="Title">{lot.title}</td>
                                <td style={{
                                    border: "1px solid #ddd",
                                    padding: "0.78rem 1rem",
                                    textAlign: "left",
                                    whiteSpace: "nowrap"
                                }} data-label="Medium">{lot.medium}</td>
                                <td style={{
                                    border: "1px solid #ddd",
                                    padding: "0.78rem 1rem",
                                    textAlign: "left",
                                    whiteSpace: "nowrap"
                                }} data-label="Hammer Price">{lot.hammerPrice}</td>
                                <td style={{
                                    border: "1px solid #ddd",
                                    padding: "0.78rem 1rem",
                                    textAlign: "left",
                                    whiteSpace: "nowrap"
                                }} data-label="Buyer">{lot.buyer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{
                    background: "#f9f5ee",
                    color: "#7a6c5d",
                    padding: "0.8rem 1.2rem",
                    borderRadius: "8px",
                    fontSize: "0.99em",
                    marginBottom: "2rem"
                }}>
                    <strong>Note:</strong> Final hammer price excludes buyer's premium and taxes. Contact auction house for detailed invoice.
                </div>

                <h2 style={{
                    fontFamily: "'Georgia', serif",
                    color: "#5a4632",
                    marginTop: "2.2rem",
                    marginBottom: "0.9rem"
                }}>Provenance</h2>
                <ul>
                    {auction.provenance.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <h2 style={{
                    fontFamily: "'Georgia', serif",
                    color: "#5a4632",
                    marginTop: "2.2rem",
                    marginBottom: "0.9rem"
                }}>Exhibition History</h2>
                <ul>
                    {auction.exhibitionHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <h2 style={{
                    fontFamily: "'Georgia', serif",
                    color: "#5a4632",
                    marginTop: "2.2rem",
                    marginBottom: "0.9rem"
                }}>Literature</h2>
                <ul>
                    {auction.literature.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <NavLink
                    to="/Auction"
                    style={{
                        display: "inline-block",
                        background: "#8b6f47",
                        color: "white",
                        textDecoration: "none",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transition: "background 0.3s ease, transform 0.2s ease"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#755a39"}
                    onMouseOut={(e) => e.target.style.background = "#8b6f47"}
                    onMouseDown={(e) => e.target.style.transform = "translateY(2px)"}
                    onMouseUp={(e) => e.target.style.transform = "translateY(0)"}
                >
                    ← Back to Auctions
                </NavLink>
            </div>
        </div>
    );
}

export default AuctionDetail;