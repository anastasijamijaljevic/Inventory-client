import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons">
        <span>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="instagram">
        <FontAwesomeIcon icon={faInstagram} />
        </a>
        </span>
      </div>
      <p>©  All rights reserved.</p>
    </footer>
  );
};


export default Footer