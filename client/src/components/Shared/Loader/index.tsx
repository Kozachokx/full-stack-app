import React, { Component } from "react";
import "./style.css";

export class Loader extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    )
  }
}
