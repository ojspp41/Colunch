import React from "react";
import * as styles from "../css/components/ContactMethodButton.css.ts";

function ContactMethodButton({ isActive, onClick, type, image, alt }) {
  return (
    <button
      type="button"
      className={`
        ${styles.phonebutton} 
        ${isActive ? styles.active : styles.inactive} 
        ${isActive && type === "kakao" ? styles.kakaoWrapper : ""}
        ${isActive && type === "instagram" ? styles.instagramWrapper : ""}
      `}
      onClick={onClick}
    >
      <img
        src={image}
        alt={alt}
        className={`${styles.contactMethodButtonImg} ${isActive ? styles.activeImg : ""}`}
      />
    </button>
  );
}

export default ContactMethodButton;
