import React from "react";
import "./css/CommingSoon.css";
import bgVideo from "../assets/videos/world-map-in-a-digital-world.mp4";
import Intro from "../components/Intro";
import "./css/Home.css";
import News from "../components/News";

const Home = () => {
  return (
    <main>
      <div className="main-content">
        <div
          className="col-12 col-md-12 mb-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <div className="coming-soon-overlay"></div>
          <video
            className="coming-soon-bg-video"
            src={bgVideo}
            autoPlay
            loop
            muted
          />
          <div className="coming-soon-content">
            <h1>NoteI</h1>
            <h1>NoteI</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
