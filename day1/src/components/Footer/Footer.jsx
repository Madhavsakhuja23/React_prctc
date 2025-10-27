import './Footer.css'

function Footer() {
    return <>
        <footer className="site-footer pt-5 pb-1 border-0">
            <div className="container">

                <div className="row text-center text-md-start g-4 footer-columns">

                    <div className="col-12 col-sm-6 col-md-3 d-flex flex-column footer-column">
                        <h5>About</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="footer-link">About Us</a></li>
                            <li><a href="#" className="footer-link">Careers</a></li>
                            <li><a href="#" className="footer-link">Press</a></li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 d-flex flex-column footer-column">
                        <h5>Discover</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="footer-link">Auctions</a></li>
                            <li><a href="#" className="footer-link">Artists</a></li>
                            <li><a href="#" className="footer-link">Galleries</a></li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 d-flex flex-column footer-column">
                        <h5>Resources</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="footer-link">Help Center</a></li>
                            <li><a href="#" className="footer-link">Buying on Aurtistiq</a></li>
                            <li><a href="#" className="footer-link">Selling on Aurtistiq</a></li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3 d-flex flex-column footer-column">
                        <h5>Stay in Touch</h5>
                        <form className="footer-newsletter d-flex">
                            <input type="email" className="form-control" placeholder="Your's Email" required />
                            <button className="subscribe-btn" type="submit">Subscribe </button>
                        </form>
                    </div>
                </div>

                <hr className="mt-3 mb-2" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center footer-bottom">
                    <p className="mb-2 mb-md-0">© 2025 Aurtistiq. All rights reserved.</p>

                    <div className="footer-social">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>

            </div>
        </footer>
    </>
}
export default Footer;