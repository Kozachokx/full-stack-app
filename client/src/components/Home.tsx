import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Import your custom CSS file

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to ReviewHub</h1>
        <p>Your destination for reviews and more!</p>
        <p>Note, that your review will appear in the listing only after it has been verified by our moderators.</p>
      </header>

      <section className="features">
        <div className="feature">
          <div>
            <h2>Explore Our Reviews</h2>
            <p>Discover user reviews on various topics.</p>
          </div>
          <Link to="/reviews">Explore Reviews</Link>
        </div>

        <div className="feature">
          <div>
            <h2>Join the Conversation</h2>
            <p>Share your thoughts and experiences through reviews.</p>
          </div>
          <Link to="/login">Login to Post</Link>
        </div>

        <div className="feature">
          <div>
            <h2>Anonymous Posting</h2>
            <p>Not ready to create an account? Post reviews anonymously.</p>
          </div>
          <Link to="/reviews">Post Anonymously</Link>
        </div>
      </section>

      <section className="about">
        <h2>Share your own experience!</h2>
        <p>
          Explore the features, read reviews, and be a part of our community!
        </p>
        <Link to="/about">Learn More</Link>
      </section>
    </div>
  );
}

export default Home;
