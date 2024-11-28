import React from 'react';
import { Link } from 'react-router-dom'; 
import './header.css';
import logo from './ipec_logo.png'
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import StudentResources from './studentresources';

const Header = () => (
  <section id="header">
    <Link to="/">
      <img src={logo} className="logo" alt="" width="50" height="50" />
    </Link>
    <div>
      <ul id="navbar">
        <li><Link className="active" to="/">Home</Link></li> 
        <li><Link to="/AboutUs">About Us</Link></li>
        <li><Link to="/ContactUs">Contact Us</Link></li>
        <li><Link to="/StudentResources">Student Resources</Link></li>
      </ul>
    </div>
  </section>
);

export default Header;
