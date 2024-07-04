// import React from "react";
import "../css/components/BottomNavButton.css";

function BottomNavButton({ onClick, imgSrc, imgText, buttonText }) {
  return (
    <button className="BottomNavButton" onClick={onClick}>
      <img src={import.meta.env.VITE_PUBLIC_URL + imgSrc} alt={imgText} />
      {buttonText}
    </button>
  );
}
export default BottomNavButton;
