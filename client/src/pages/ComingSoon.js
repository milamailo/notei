import React from "react";
import "./css/CommingSoon.css";
import bgVideo from "../assets/videos/world-map-in-a-digital-world.mp4";

const ComingSoon = () => {
  return (
    <main className="comming-soon-main">
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
        <h6>Coming Soon!</h6>
      </div>
    </main>
  );
};

export default ComingSoon;
