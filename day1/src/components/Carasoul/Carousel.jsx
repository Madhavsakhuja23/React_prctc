import "./Carousel.css";

function Carousel() {
  const slides = [
    { img: "S1.jpg" },
    { img: "S2.jpg" },
    { img: "S3.jpg" },
  ];

  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
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
