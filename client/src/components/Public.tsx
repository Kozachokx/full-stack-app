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
        <div className="readme">
          <p>
            The project has been initialized with Vite (a frontend build
            tool for building web applications).
          </p>
          <p>
            Welcome to ReviewHub web application, built using the powerful MERN stack.
            The project started with Vite, a modern build tool.
          </p>
          <p>
            We are committed to providing a platform for users to share and explore 
            a wide range of reviews on diverse subjects. The application was 
            meticulously developed to offer a seamless experience and 
            intuitive user interface.
          </p>
          {/* <br/><br/> */}
        </div>
          <div className="tech-stack">
          <h2>Technology Stack</h2>
          <ul>
            <li>M - MongoDB</li>
            <li>E - Express</li>
            <li>R - ReactJS</li>
            <li>N - NodeJS</li>
          </ul>
          </div>
        <div className="container-g">
          <a className="con-group rainbow rainbow_text_animated" title="Click to visit official MongoDB web page." href="https://www.mongodb.com/" target="_blank">
            <div className="letter-item color-mongo rainbow_text_animated">M</div>
            <img src={MongoDBSVG} />
          </a>
          <a className="con-group" title="Click to visit official ExpressJS web page." href="https://expressjs.com/" target="_blank">
            <div className="letter-item color-express">E</div>
            <img src={ExpressSVG} style={{ filter: "invert(1)" }} />
          </a>
          <a className="con-group" title="Click to visit official ReactJS web page." href="https://react.dev/" target="_blank">
            <div className="letter-item color-react">R</div>
            <img src={ReactSVG} />
          </a>
          <a className="con-group" title="Click to visit official MongoDB web page." href="https://www.mongodb.com/" target="_blank">
            <div className="letter-item color-node">N</div>
            <img src={NodejsSVG} />
          </a>
        </div>
      </section>
    </div>
    // </section>
  );
}

export default Public;
