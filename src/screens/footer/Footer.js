import React from 'react';
import './Footer.css'; // You can create a separate CSS file or use inline styles.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>Copyright © 2024 <a href="https://vidyaranyam.com" className="footer-link">Vidyaranyam</a></span>
        <div className="footer-links">
          <a href="/terms-conditions.html" target='_blank' className="footer-link">Terms and Conditions</a> |
          <a href="/privacy.html" target='_blank' className="footer-link"> Privacy Policy</a> |
          <a href="/returns-refunds.html" target='_blank' className="footer-link"> Returns and Refunds</a>
        </div>
        <span>Powered by <a href="https://tessrac.com" className="footer-link">Tessrac</a></span>
      </div>
    </footer>
  );
};

export default Footer;