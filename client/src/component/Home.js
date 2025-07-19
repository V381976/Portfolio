
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => (
  <div className="home-container">
    <h1 className="gradient-title">Hi! I'm a Passionate MERN Developer</h1>
    <p className="intro-text">
      I specialize in building dynamic, responsive, and scalable web applications using
      <strong> MongoDB, Express, React, and Node.js</strong>.
    </p>

    <div className="skills-section">
      <div className="skill-card">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
        <p>React</p>
      </div>
      <div className="skill-card">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
        <p>Node.js</p>
      </div>
      <div className="skill-card">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" />
        <p>Express</p>
      </div>
      <div className="skill-card">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
        <p>MongoDB</p>
      </div>
    </div>

    <div className="button-section">
      <Link to="/projects">
        <button className="btn-primary">  View Projects</button>
      </Link>
      <Link to="/buy">
        <button className="btn-secondary">Buy Resume</button>
      </Link>
    </div>
  </div>
);

export default Home;

