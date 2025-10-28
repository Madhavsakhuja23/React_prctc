import "./Carousel.css";

function Carousel() {
  const slides = [
    { img: "1.jpg" },
    { img: "3.jpg" },
    { img: "4.jpg" },
  ];

  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img src={slide.img} className="d-block w-100" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
