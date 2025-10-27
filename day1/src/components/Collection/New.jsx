import "./New.css";
import { NavLink } from "react-router-dom";

const bigStory= {
    image: "new1.jpg",
    date: "4 JUL 2025 | ARTICLE",
    title:
        "From Cezanne in Provence to Dumas in Athens: the best exhibitions in southern Europe and around the Mediterranean",
};

const smallStories= [
    {
        image: "new2.jpg",
        date: "4 JUL 2025 | ARTICLE",
        title:
            "Collecting works on paper: featuring art coming to auction by Elaine de Kooning, Whitten, Condo, Haring, Calder and more",
    },
    {
        image: "new3.jpg",
        date: "4 JUL 2025 | ARTICLE",
        title:
            "Why leading British artists are backing New Contemporaries — ‘a platform for risk-taking’",
    },
];

function New() {
    return (
        <section className="whats-new-section container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-semibold fs-3">What’s New This Week</h2>
                <NavLink to="/collect" className="view-all-link text-decoration-none fw-medium">View All →</NavLink>
            </div>
            <div className="row g-4">

                <div className="col-lg-8">
                    <div className="story-large">
                        <img src={bigStory.image} alt={bigStory.title} className="img-fluid w-100 mb-2" />
                        <div className="story-content">
                            <p className="story-date">{bigStory.date}</p>
                            <p>{bigStory.title}</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 d-flex flex-column gap-3">
                    {smallStories.map((item, index) => (
                        <div key={index} className="story-small">
                            <img src={item.image} alt={item.title} className="img-fluid w-100 mb-2" />
                            <div className="story-content">
                                <p className="story-date">{item.date}</p>
                                <p>{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default New;