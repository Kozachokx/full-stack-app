import React from "react";
import './style.css';

function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-block">
      {/* <span style={{ display: "flex" }}> */}
        <ion-icon name="rose"></ion-icon>
        <ion-icon name="flame"></ion-icon>
        <a href="/" className="nav-item">Home</a>
      {/* </span> */}
      </div>
      <div className="nav-block">
        <a href="" className="nav-item">Tools</a>
        <a href=""className="nav-item">Login</a>
      </div>
    </nav>
  );
}

export default Navigation;
