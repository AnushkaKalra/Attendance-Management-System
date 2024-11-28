// src/ContactUs.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ContactUs.css';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import contact from './contact.jpg';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <Header />
      <div className="hero-image">
        <img src={contact} alt="Contact Us" />
        <div className="overlayy">
        <div className="textt">
            <h1>CONTACT US</h1>
        </div>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-details">
          <div className="address">
            <h3>Inderprastha Engineering College</h3>
            <p>63 Site IV, Sahibabad Industrial Area, Surya Nagar Flyover Road Sahibabad, Ghaziabad-U.P</p>
            <p>Telephone: +91 (120) 4535000</p>
            <p>Fax: +91 (120) 4535059</p>
            <h3>For Further Query:</h3>
            <p>Phone : +91 (120) 4535000 Ext. 225</p>
            <p>Email: registrar@ipec.org.in</p>
          </div>
          <div className="admission-enquiry">
            <h3>Admission Related Enquiry:</h3>
            <p>Mobile No.- 9910449090, 6399001414, 6399001515, 7428785554</p>
            <p>Phone: +91 (120) 4535000 Ext. 221</p>
            <p>Email: <a href="mailto:admission@ipec.org.in">admission@ipec.org.in</a></p>
            <h3>Admission Related Enquiry for BBA & BCA Course:</h3>
            <p>Mobile no. – 9650799975</p>
          </div>
        </div>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14004.155452037396!2d77.34109!3d28.658554999999996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfa9b30000001%3A0xf8c8e01b5759ffb0!2sInderprastha%20Engineering%20College!5e0!3m2!1sen!2sin!4v1715977996358!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      <footer className="footer">
    <div className="social-links">
      <a href="https://www.facebook.com/ipec30" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
      <a href="https://www.instagram.com/ipec30/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
      <a href="https://twitter.com/ipecgzb" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
      <a href="https://in.linkedin.com/company/ipec30" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
      <a href="https://www.ipec.org.in/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGlobe} /></a>
    </div>
    <div className="contact"> 
      <p><a href="https://maps.app.goo.gl/85QpFBAmaNTRLS4X9" target="_blank" rel="noopener noreferrer" className="address-link">Address: 63 Site IV, Sahibabad Industrial Area, Surya Nagar Flyover Road Sahibabad, Ghaziabad-Up. PIN Code-201010</a></p>
      <p><FontAwesomeIcon icon="fa-phone" />Contact: Mobile no: 9910449090, 6399001414, 6399001515, 7428785554 Phone: +91 (120) 4535000</p>
    </div>
  </footer>
    </div>
  );
};

export default ContactUs;
