import React from "react";
import heroimg from "../../../../images/logos/Frame.png";
import "./HeroSection.css";
const HeroSection = () => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-5 pt-5 mt-5">
          <h1 className="hero-title">
            Let’s Grow Your Brand To The Next Level
          </h1>
          <p className="py-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            commodo ipsum duis laoreet maecenas. Feugiat{" "}
          </p>
          <a href="#contact">
            <button className="btn btn-dark">Hire Us</button>
          </a>
        </div>
        <div className="col-md-7 mt-5">
          <img src={heroimg} alt="" className="w-75 ps-4" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
