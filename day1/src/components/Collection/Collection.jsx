import "./collection.css";

function Collection() {
   const artworks = [
    {
      name: "Claude Monet",
      img: "grid1.jpg",
      title: "When We Met",
      gallery: "VILTIN Gallery",
      price: "€6,200–€6,900",
    },
    {
      name: "Isabel Bonilla",
      img: "grid2.jpg",
      title: "Better to Speak or Die?",
      gallery: "PxP Contemporary",
      price: "US$100",
    },
    {
      name: "Robert Minervini",
      img: "grid3.jpg",
      title: "Longing",
      gallery: "Rena Bransten Gallery",
      price: "US$1,500",
    },
    {
      name: "Bea Kusovszky",
      img: "grid4.jpg",
      title: "Dead's Thoughts",
      gallery: "VILTIN Gallery",
      price: "€6,200–€6,900",
    },
    {
      name: "Pablo Picasso",
      img: "grid5.jpg",
      title: "Midnight Hues",
      gallery: "PxP Contemporary",
      price: "US$100",
    },
    {
      name: "Vincent van Gogh",
      img: "grid6.jpg",
      title: "Fleabag",
      gallery: "Rena Bransten Gallery",
      price: "US$1,500",
    },
    {
      name: "Michelangelo",
      img: "grid7.jpg",
      title: "Is It Love?",
      gallery: "VILTIN Gallery",
      price: "€6,200–€6,900",
    },
    {
      name: "René Magritte",
      img: "grid11.jpg",
      title: "Generational Code V",
      gallery: "VILTIN Gallery",
      price: "€6,200–€6,900",
    },
    {
      name: "Matisse",
      img: "grid12.jpg",
      title: "Denim Ocean 15, 2025",
      gallery: "PxP Contemporary",
      price: "US$100",
    },
    {
      name: "Frida Kahlo",
      img: "grid13.jpg",
      title: "Moon Rising, 2024",
      gallery: "Rena Bransten Gallery",
      price: "US$1,500",
    },
  ];

  return (
    <div className="collection-page">
      <h1 className="collection-title">Collections</h1>
      <div className="collection-grid">
        {artworks.map((item) => (
          <div className="art-card" key={item.title}>
            <img src={item.img} alt={item.title} className="art-image" />
            <div className="art-info">
              <div className="art-text">
                <h4 className="artist-name">{item.artist}</h4>
                <p className="art-title">{item.title}</p>
                <p className="art-gallery">{item.gallery}</p>
                <p className="art-price">{item.price}</p>
              </div>
              <i className="fa-regular fa-heart fav-icon"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
