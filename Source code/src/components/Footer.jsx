import React from 'react'

import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import '../css/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* ===== Brand & Mission ===== */}
        <div className="footer-brand">
          <h2>Career Passport</h2>
          <p>Empowering students with career guidance and opportunities for a brighter future.</p>
        </div>

        {/* ===== Quick Links ===== */}
        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/career-bank">Career Bank</a></li>
            </ul>
          </div>
          <div>
            <h4>Career Sections</h4>
            <ul>
              <li><a href="/counseling">Guidance & Counseling</a></li>
              <li><a href="/scholarships">Scholarships</a></li>
              <li><a href="/internships">Internships</a></li>
            </ul>
          </div>
          <div>
            <h4>Policies & Legal</h4>
            <ul>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-conditions">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* ===== Support & Newsletter ===== */}
        <div className="footer-newsletter">
          <h4>Support & Updates</h4>
          <p>Get career guidance updates and support for your educational journey.</p>
          <div className="footer-column">
            <h3>Contact Support</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Email: <a href="mailto:support@careerpassport.com" style={{ color: 'var(--gold)' }}>support@careerpassport.com</a>
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Phone: <a href="tel:+923001234567" style={{ color: 'var(--gold)' }}>+92-300-1234567</a>
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              <a href="/faq" style={{ color: 'var(--gold)' }}>FAQs</a>
            </p>
          </div>
          <br />
          <form>
            <input type="email" placeholder="Subscribe for career updates" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* ===== Footer Bottom ===== */}
      <div className="footer-bottom">
        
        <div className="footer-social  ms-auto">
          <a href="https://www.facebook.com" target="_blank" className="social-icon facebook" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.linkedin.com" target="_blank" className="social-icon linkedin" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://www.youtube.com" target="_blank" className="social-icon youtube" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="footer-disclaimer">
        <p>
          The Career Passport is designed as a guidance tool to support students in making informed career decisions. Final admissions, scholarships, or opportunities are subject to the policies of respective institutions and organizations.
        </p>
      </div>

      {/* Sitemap a */}
      <div className="footer-sitemap" style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>© 2025 Career Passport | All rights reserved.</p>

      </div>
    </footer>
  )
}

export default Footer;