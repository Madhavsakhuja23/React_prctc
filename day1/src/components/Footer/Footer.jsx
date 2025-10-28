import './Footer.css'

function Footer() {
    return <>
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h4>About</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Discover</h4>
                        <ul>
                            <li><a href="#">Auctions</a></li>
                            <li><a href="#">Artists</a></li>
                            <li><a href="#">Galleries</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Buying on Aurtistiq</a></li>
                            <li><a href="#">Selling on Aurtistiq</a></li>
                        </ul>
                    </div>
                    <div className="footer-column footer-newsletter">
                        <h4>Stay in Touch</h4>
                        <form id="footer-newsletter" className="footerForm">
                            <input id="email" type="email" placeholder="Your email address" required />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 Aurtistiq. All rights reserved.</p>
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