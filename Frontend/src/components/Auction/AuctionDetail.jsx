import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AuctionDetail.css";

export default function AuctionDetail() {
  const { id } = useParams();
  const [dynamicArt, setDynamicArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  // --------------------------
  //        STATIC DATA
  // --------------------------
  const staticData = {
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
  const staticArt = staticData[id];

  // --------------------------
  //   ALWAYS FETCH DYNAMIC
  // --------------------------
  useEffect(() => {
    let cancelled = false;
    async function loadDynamicArt() {
      setLoading(true);
      try {
        const res = await fetch(`https://aurtistiq.onrender.com/api/artworks/${id}`);
        if (!cancelled) {
          if (res.ok) {
            const data = await res.json();
            // Normalize keys: backend might use image, title, desc
            setDynamicArt({
              title: data.title || data.name || "",
              desc: data.desc || data.description || data.details || "",
              image: data.image || data.imageUrl || data.img || "",
              basePrice: data.basePrice || data.price || data.base_price || null,
              status: data.status || data.type || null,
              _id: data._id || data.id || null
            });
          } else {
            setDynamicArt(null);
          }
        }
      } catch (err) {
        if (!cancelled) setDynamicArt(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    // Only try to fetch if id doesn't look like a static key (optional; but safe)
    // We always attempt fetch so dynamic entries will show if available.
    loadDynamicArt();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // --------------------------
  //        LOADING SCREEN
  // --------------------------
  if (loading) {
    return (
      <div className="ad-loading">
        <div className="ad-loader" />
        <p>Loading artwork...</p>
      </div>
    );
  }

  // --------------------------
  //   PRIORITY: STATIC > DYNAMIC
  // --------------------------
  if (staticArt) {
    return (
      <AuctionDetailUI
        art={{
          title: staticArt.title,
          description: staticArt.description,
          imageUrl: staticArt.imageUrl,
          type: staticArt.type,
          artistName: staticArt.artistName,
          artistImage: staticArt.artistImage,
          exhibitions: staticArt.exhibitions,
          topBids: staticArt.topBids || [],
          minBid: staticArt.minBid || null
        }}
      />
    );
  }

  // --------------------------
  //       DYNAMIC ART
  // --------------------------
  if (dynamicArt && dynamicArt._id) {
    return (
      <AuctionDetailUI
        art={{
          title: dynamicArt.title,
          description: dynamicArt.desc,
          imageUrl: dynamicArt.image,
          type: dynamicArt.status || "current",
          artistName: dynamicArt.artistName || "Seller",
          artistImage: dynamicArt.artistImage || null,
          exhibitions: dynamicArt.exhibitions || "",
          topBids: dynamicArt.topBids || [],
          minBid: dynamicArt.basePrice || null,
          raw: dynamicArt
        }}
      />
    );
  }

  // --------------------------
  //        NOT FOUND
  // --------------------------
  return (
    <div className="ad-notfound">
      <h2>Artwork not found</h2>
      <p>We couldn't find that artwork in the catalogue.</p>
      <Link to="/Auction" className="ad-back">
        ← Back to Auctions
      </Link>
    </div>
  );
}

// ---------- UI PRESENTATION (shared for static + dynamic) ----------
function AuctionDetailUI({ art }) {
  const [zoom, setZoom] = useState(false);
  const [countdown, setCountdown] = useState("02:15:30");
  const [bidAmount, setBidAmount] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);

  // small countdown demo (2h 15m 30s)
  useEffect(() => {
    const auctionEnd = Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000 + 30 * 1000;
    const t = setInterval(() => {
      const diff = auctionEnd - Date.now();
      if (diff <= 0) {
        setCountdown("Auction Closed");
        clearInterval(t);
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const animateButton = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 420);
  };

  const submitMessage = () => {
    animateButton();
    // placeholder - integrate API if needed
    alert("Message sent to artist (demo)");
    setSubject("");
    setMessage("");
  };

  const submitBid = () => {
    animateButton();
    // placeholder - integrate API if needed
    alert(`Bid of ${bidAmount || "—"} submitted (demo)`);
    setBidAmount("");
  };

  return (
    <div className="ad-wrap">
      <h1 className="ad-title">{art.title}</h1>

      <div className="ad-first">
        <div
          className={`ad-image-wrap ${zoom ? "zoomed" : ""}`}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onClick={() => setZoom((z) => !z)}
          aria-hidden
        >
          <img src={art.imageUrl} alt={art.title} className="ad-image" />
          <div className="ad-zoom-hint">{zoom ? "Click to close" : "Hover to zoom • Click to enlarge"}</div>
        </div>

        <aside className="ad-side">
          <div className="ad-timer">
            <strong>Auction ends in:</strong>
            <div className="ad-countdown">{countdown}</div>
          </div>

          <section className="ad-panel">
            <h3>Bidding Guidelines</h3>
            <ul>
              <li>Minimum bid increment: $50</li>
              <li>Bidding closes when the timer runs out</li>
              <li>Winners notified via registered email</li>
            </ul>
          </section>

          <section className="ad-panel artist">
            <h3>Artist Info</h3>
            <div className="artist-row">
              <div className="artist-avatar">
                {art.artistImage ? (
                  <img src={art.artistImage} alt={art.artistName} />
                ) : (
                  <div className="avatar-fallback">{(art.artistName || "A").split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                )}
              </div>
              <div>
                <div className="artist-name"><strong>Name:</strong> {art.artistName}</div>
                <div className="artist-exh"><strong>Exhibitions:</strong> {art.exhibitions || "—"}</div>
              </div>
            </div>
          </section>

          <section className="ad-panel bids">
            <h3>Top 3 Bids</h3>
            <ul>
              {art.topBids && art.topBids.length ? (
                art.topBids.map((b, i) => (
                  <li key={i}>
                    <strong>{b.name}</strong> — ${b.amount} <em>({b.time})</em>
                  </li>
                ))
              ) : (
                <li>No bids yet</li>
              )}
            </ul>
            {art.minBid && <div className="minbid">Minimum next bid: <strong>₹{art.minBid}</strong></div>}
          </section>
        </aside>
      </div>

      <div className="ad-second">
        <section className="ad-card about">
          <h3>About the Art</h3>
          <p>{art.description}</p>
        </section>

        <section className="ad-card message-artist">
          <h3>Message the Artist</h3>
          <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <textarea placeholder="Ask the artist about their work (max 300 characters)" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={300} />
          <button className={`ad-btn ${clicked ? "clicked" : ""}`} onClick={submitMessage}>Send Message</button>
        </section>

        <section className="ad-card place-bid">
          <h3>Place Your Bid</h3>
          <input type="number" placeholder="Enter bid amount" min={art.minBid || 1} value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
          <button className={`ad-btn ${clicked ? "clicked" : ""}`} onClick={submitBid}>Submit Bid</button>
        </section>

        <div className="back-link">
          <Link to="/Auction">← Back to Auctions</Link>
        </div>
      </div>
    </div>
  );
}
