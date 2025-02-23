import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <h2>BOOKLOOP</h2>
          <p>Bridging the gap between books and readers.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/donate">Donate Books</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><Mail size={18} /> support@bookloop.com</p>
          <p><Phone size={18} /> +91 98765 43210</p>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com"><Facebook size={20} /></a>
            <a href="https://twitter.com"><Twitter size={20} /></a>
            <a href="https://instagram.com"><Instagram size={20} /></a>
            <a href="https://linkedin.com"><Linkedin size={20} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 BOOKLOOP. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;