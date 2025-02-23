import React from "react";
import "../styles/About.css";
import { FaBook, FaUsers, FaBrain, FaGift, FaCode, FaCloud, FaArrowRight } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Transforming Book Donations into Lifelong Learning!</h1>
        <p>A sustainable cycle where books inspire knowledge-sharing, discussions, and community learning.</p>
        <button className="cta-btn">Join the Movement</button>
      </section>
      {/* Visual Storytelling */}
      <section className="visual-story">
        <h2>The Journey of a Donated Book</h2>
        <div className="story-steps">
          <div className="story-step">
            <FaGift className="icon" />
            <p>Donor lists a book for donation</p>
          </div>
          <FaArrowRight className="story-arrow" />
          <div className="story-step">
            <FaUsers className="icon" />
            <p>AI finds the right recipient</p>
          </div>
          <FaArrowRight className="story-arrow" />
          <div className="story-step">
            <FaBook className="icon" />
            <p>Book reaches a new reader</p>
          </div>
          <FaArrowRight className="story-arrow" />
          <div className="story-step">
            <FaBrain className="icon" />
            <p>Recipient shares knowledge</p>
          </div>
        </div>
      </section>

      {/* What is BOOKLOOP? */}
      <section className="about-section">
        <h2>What is BOOKLOOP?</h2>
        <p>
          Millions of books gather dust while many lack access to education. BOOKLOOP bridges this gap by turning book 
          donations into an engaging, sustainable, and rewarding experience.
        </p>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <FaGift className="icon" />
            <h3>Donate Books</h3>
            <p>List books you wish to donate on the platform.</p>
          </div>
          <div className="step">
            <FaUsers className="icon" />
            <h3>AI-Based Matching</h3>
            <p>Our system connects books with individuals, NGOs, or community groups in need.</p>
          </div>
          <div className="step">
            <FaBrain className="icon" />
            <h3>Share Knowledge</h3>
            <p>Recipients engage in workshops, discussions, and sessions based on the books they receive.</p>
          </div>
        </div>
      </section>

      

      {/* Unique Features */}
      <section className="features">
        <h2>Why Choose BOOKLOOP?</h2>
        <div className="features-grid">
          <div className="feature">
            <FaBook className="icon" />
            <h3>Beyond Donation</h3>
            <p>Books aren’t just given away; they become tools for education.</p>
          </div>
          <div className="feature">
            <FaGift className="icon" />
            <h3>Earn & Learn</h3>
            <p>Recipients contribute back to the community through knowledge-sharing.</p>
          </div>
          <div className="feature">
            <FaUsers className="icon" />
            <h3>Community Engagement</h3>
            <p>Encourages discussions, workshops, and knowledge sharing.</p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-stack">
        <h2>Technology Behind BOOKLOOP</h2>
        <div className="tech-icons">
          <div><FaCode className="icon" /> <p>React.js (Frontend)</p></div>
          <div><FaCode className="icon" /> <p>Node.js + Express (Backend)</p></div>
          <div><FaCloud className="icon" /> <p>MongoDB / PostgreSQL</p></div>
        </div>
      </section>

      {/* Join the Community */}
      <section className="join">
        <h2>Join the Community</h2>
        <p>Be a part of the movement. Donate, learn, and share!</p>
        <div className="btn">
          <button className="cta-btn">Donate a Book</button>
          <button className="cta-btn">Explore Books</button>
        </div>
      </section>
    </div>
  );
};

export default About;