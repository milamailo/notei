import React from "react";
import "./index.css";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={`back-drop ${props.className}`} />;
};

export default Backdrop;
