import React from "react";
import { MongoDBSVG, ExpressSVG, ReactSVG, NodejsSVG } from "../assets";
import "./styles.css";

function Public() {
  return (
    // <section className="public">
    <div className="public-w">
      {/* <header>-header-</header> */}
      <h1>About web</h1>

      <section className="public">
        <div className="t-left readme">
          <p>
            The project has been initialized with Vite. Vite is a frontend build
            tool for building web applications.
          </p>
          <p>This application was built with the MERN stack.</p>
          <ul>
            <li>M - MongoDB</li>
            <li>E - Express</li>
            <li>R - ReactJS</li>
            <li>N - NodeJS</li>
          </ul>
        </div>
        <div className="container-g">
          <div className="con-group">
            <div className="letter-item color-mongo">M</div>
            <img src={MongoDBSVG} />
          </div>
          <div className="con-group">
            <div className="letter-item">E</div>
            <img src={ExpressSVG} style={{ filter: "invert(1)" }} />
          </div>
          <div className="con-group">
            <div className="letter-item color-react">R</div>
            <img src={ReactSVG} />
          </div>
          <div className="con-group">
            <div className="letter-item color-node">N</div>
            <img src={NodejsSVG} />
          </div>
        </div>
      </section>
    </div>
    // </section>
  );
}

export default Public;
