import React from 'react';
import Header from './header';
import './homepage.css';
import faculty from './facul.png';
import student from './student.png';
import { Link } from 'react-router-dom';
//import signup from './signup';
import New from './new';
//import Stuauth from './stuauth';
import AuthPage from './AuthPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => (
  <>
    <Header />
    <div className="container"> {/* Added container for flex layout */}
      <section id="left">
        <div id="l">
          <h1>Welcome</h1>
          <h2>Login into your Attendance System account</h2>
        </div>
      </section>
      <section id="r">
        <div>
          <img src={student} alt="Student" height="200" width="200" />
          <br/>
          <button>
            <Link className="one" to="/AuthPage">Student Login</Link> 
          </button>
        </div>
        <div>
          <img src={faculty} alt="Faculty" height="200" width="200" />
          <br />
          <button>
            <Link className="one" to="/New">Faculty Login</Link> 
          </button>
        </div>
      </section>
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
          <p><FontAwesomeIcon icon="fa-phone"/> Contact: Mobile no: 9910449090, 6399001414, 6399001515, 7428785554 Phone: +91 (120) 4535000</p>
        </div>
      </footer>
  </>
);

export default HomePage;
