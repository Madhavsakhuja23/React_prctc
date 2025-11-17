import { useState, useEffect } from 'react';
import './Footer.css'
import emailjs from '@emailjs/browser';

function Footer() {
    const [email,setEmail]=useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    useEffect(() => {
        const savedEmail = sessionStorage.getItem("email");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const savedEmail = sessionStorage.getItem("email");
        const name = sessionStorage.getItem("Firstname")
        if(savedEmail && name){
            const emailSent = await sendEmail(email,name);
            if(emailSent){
                setIsSubscribed(true);
            }
        }
    }
    async function sendEmail(userEmail,name) {
    const params = {
      email: userEmail,
      Name:name
    };
    const serviceID = "service_gc6z3ld";
    const templateID = "template_6p9239p";
    const publicKey = "oC1THPuL3vFnDxaE2";
    try {
      const res = await emailjs.send(serviceID, templateID, params, publicKey);
      console.log("Email sent:", res.status);
      return true;
    } catch (error) {
      console.error("EmailJS Error:", error);
      return false;
    }
  }
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
                        <form id="footer-newsletter" className="footerForm" onSubmit={handleSubmit}>
                            <input id="email" type="email" placeholder="Your email address" value={email} required />
                            <button type="submit">{isSubscribed ? "Subscribed ✅" : "Subscribe"}</button>
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