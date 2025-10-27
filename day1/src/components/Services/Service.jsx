import "./Service.css";

function Service() {
    const service = [
        {
            title: "Live & Online Bidding",
            desc: "Join our live or online auctions and bid from anywhere in the world.",
            image: "s1.jpg",
        },
        {
            title: "Art Appraisal",
            desc: "Get professional, certified valuations for your art collection to ensure accurate value.",
            image: "s2.jpg",
        },
        {
            title: "Private Sales",
            desc: "Secure and discreet transactions for high-value art pieces with our exclusive private sales service.",
            image: "s3.jpg",
        },
        {
            title: "Exhibitions & Previews",
            desc: "Attend curated exhibitions and private previews before our major auctions.",
            image: "s4.jpg",
        },
    ];

    return (
        <section className="service-section container py-5">
            <h1 className="service-heading text-center mb-5">Our Auction Services</h1>
            <div className="row g-4">
                {service.map((item, index) => (
                    <div className="col-lg-3 col-md-6" key={index}>
                        <div className="card h-100 d-flex flex-column shadow-sm border-0 service-card">
                            <img src={item.image} alt={item.title} className="img-fluid w-100" />
                            <div className="service-content p-4">
                                <h5 className="service-title">{item.title}</h5>
                                <p className="service-desc">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Service;
