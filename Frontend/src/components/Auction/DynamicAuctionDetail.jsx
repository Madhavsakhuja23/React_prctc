import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DynamicAuctionDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtwork() {
      try {
        const res = await fetch(`http://localhost:5000/api/artworks/${id}`);
        const data = await res.json();
        setArtwork(data);
      } catch (err) {
        console.error("Error fetching artwork:", err);
      }
      setLoading(false);
    }
    loadArtwork();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!artwork) return <h2>Artwork not found</h2>;

  return (
    <div className="dynamic-detail">
      <h1>{artwork.title}</h1>

      <img 
        src={artwork.image} 
        alt={artwork.title} 
        style={{ width: "400px", borderRadius: "10px" }}
      />

      <p>{artwork.desc}</p>
      <p><strong>Status:</strong> {artwork.status}</p>
      <p><strong>Category:</strong> {artwork.category}</p>
      <p><strong>Seller:</strong> {artwork.sellerId}</p>

      <br />
      <Link to="/auction" className="back-btn">
        ← Back to Auctions
      </Link>
    </div>
  );
}
