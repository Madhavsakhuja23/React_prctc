import { NavLink } from "react-router-dom";
import "./Curated.css";

function Curated() {
  const data = [
    {
      title: "Contemporary Voices",
      img: "collect1.jpg",
      desc: "48 artworks | Starting at $1,200",
    },
    {
      title: "Modern Masters",
      img: "collect2.jpg",
      desc: "32 artworks | Starting at $3,500",
    },
    {
      title: "Emerging Talents",
      img: "collect3.jpg",
      desc: "64 artworks | Starting at $500",
    },
    {
      title: "Abstract Arts",
      img: "collect4.jpg",
      desc: "52 artworks | Starting at $500",
    },
  ];
  const cards = [];
  for (const item of data) {
    cards.push(
      <div className="col" key={item.title}>
        <div className="card h-100 text-center">
          <img src={item.img} alt={item.title} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.desc}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center">Curated Collections</h1>
      <p className="text-center">
        Carefully selected artworks from our global network of galleries and artists
      </p>

      <div className="text-center mb-4">
        <NavLink to="/Collection" className="view-collection">
          View All Collections{" "}
          <i
            className="fa-solid fa-arrow-right"
            style={{ color: "#8b6f47", fontSize: "0.9rem" }}
          ></i>
        </NavLink>
      </div>

      <div className="cards">
        <div className="row row-cols-1 row-cols-md-4 g-4">{cards}</div>
      </div>
    </>
  );
}

export default Curated;
