import React from "react";
import * as styles from "../css/components/MyInfoButton.css";

function MyInfoButton({ imgSrc, infoText, buttonText }) {
  return (
    <div className={styles.myInfoButton}>
      <div className={styles.textWrapper}>
        <div className={styles.buttonText}>{buttonText}</div>
        <div className={styles.valueText}>{infoText}</div>
      </div>
      <img
        className={styles.my_button_img}
        src={import.meta.env.VITE_PUBLIC_URL + imgSrc}
        alt="이미지"
      />
    </div>
  );
}

export default MyInfoButton;
