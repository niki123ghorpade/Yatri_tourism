import React from 'react';
import { Link } from "react-router-dom";
import './about.css';

function AboutUs() {
  return (
    <div className="about-container">
      <header>
        <h1>Welcome to Yatri Tourism</h1>
        <nav>
        <span style={{ marginRight: '20px' }}><Link to={{pathname:'/mainPakage'}}style={{ color: 'white' }}>All Packages</Link></span>
        <span style={{ marginRight: '20px' }}><Link to={{pathname:'/'}}style={{ color: 'white' }}>Home</Link></span>
        <span  style={{ marginRight: '20px' }}><Link to={{pathname:'/register'}}style={{ color: 'white' }}>Signup/Login</Link></span>
        <span style={{ marginRight: '20px' }}><Link to={{pathname:'/packages'}}style={{ color: 'white' }}>Packages</Link></span>
         {/* <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/packages">Packages</a></li>
        
            <li><a href="/mainPakage">Main Package</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
  </ul>*/}
        </nav>
      </header>

      <section className="about-section">
        <h2>About Us</h2>
        <p>Yatri is a premier travel agency dedicated to providing extraordinary travel experiences. Our team consists of passionate travelers who are committed to crafting unforgettable adventures for our clients.</p>
        <p>With years of experience in the travel industry, we have curated a selection of the most exciting destinations and immersive activities to cater to every traveler's desires. Whether you seek thrilling outdoor adventures, cultural exploration, or tranquil retreats, we have the perfect itinerary for you.</p>
        <p>At Yatri, we prioritize customer satisfaction above all else. From the moment you contact us to the conclusion of your journey, our dedicated team will ensure that every detail is meticulously planned and executed to perfection.</p>
        <p>Join us on a journey of discovery and embark on the adventure of a lifetime with Adventure Seekers!</p>
      </section>

      <footer>
        <p>&copy; 2024 Adventure Seekers. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
