// src/AboutUs.js
import React from 'react';
import Header from './header';
import './AboutUs.css';
import college from './college.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <div className="about-us">
      <Header />
      <div className="hero-image">
        <img src={college} alt="College" />
        <div className="overlay">
          <div className="text">
            <h1>ABOUT US</h1>
            <p>IPEC is one of the most preferred engineering college in Ghaziabad Delhi NCR for aspiring engineers and technologists. It was established in the year 2000, by leading academicians and business leaders in North India, under the aegis of Shail Garg Shiksha Sansthan, a non-profit making society.</p>
            <p>IPEC is the best engineering college in Ghaziabad Delhi NCR with 20+ years of excellence, a rich alumni base of 15000+ students, and best placement with 200+ recruiters. IPEC has now become a pioneer in the field of technical education. Be it education, extracurricular activities, placement offers, campus or faculty IPEC is counted as top engineering college of AKTU in Ghaziabad, Delhi NCR.</p>
          </div>
        </div>
      </div>
      <section className="vision-mission">
        <div className="box vision">
          <h2>Our Vision</h2>
          <p>"National leadership in Human Resource Development, Excellence in Education and impacting Society through Globally Competent Technologies"</p>
        </div>
        <div className="box mission">
          <h2>Our Mission</h2>
          <ul>
            <li>Be the most preferred choice of Student, Faculty and Industry.</li>
            <li>Be a National Level Technical Institution fostering Teaching, Research, Extension Education, Innovation, Leadership and Entrepreneurship Spirit</li>
          </ul>
        </div>
      </section>
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

export default AboutUs;
