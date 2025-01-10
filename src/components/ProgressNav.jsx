import React from "react";
import "../css/components/ProgressNav.css";

const ProgressNav = ({ step }) => {
  return (
    <div className="progress-container">
      <div className={`circles ${step >= 1 ? "active" : ""}`}></div>
      <div className={`bar ${step >= 2 ? "active" : ""}`}></div>
      <div className={`circles ${step >= 2 ? "active" : ""}`}></div>
      <div className={`bar ${step >= 3 ? "active" : ""}`}></div>
      <div className={`circles ${step >= 3 ? "active" : ""}`}></div>
    </div>
  );
};

export default ProgressNav;
