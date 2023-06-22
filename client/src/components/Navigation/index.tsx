import React from "react";
import { Link } from 'react-router-dom'
import './style.css';

export function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-block">
      {/* <span style={{ display: "flex" }}> */}
        <ion-icon name="rose"></ion-icon>
        <ion-icon name="flame"></ion-icon>
        <Link to="/" className="nav-item">Home</Link>
      {/* </span> */}
      </div>
      <div className="nav-block">
        <Link to="/reviews" className="nav-item">Reviews</Link>
        <Link to="/tools" className="nav-item">Tools</Link>
        <Link to="/login" className="nav-item">Login</Link>
      </div>
    </nav>
  );
}

// export default Navigation;
