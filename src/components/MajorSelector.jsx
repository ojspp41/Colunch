import React from "react";
import majorCategories from "../data/majorCategories";
import MajorSelectorElement from "./MajorSelectorElement";
import * as styles from "../css/components/MajorSelector.css"; // Vanilla Extract 스타일 임포트
import { style } from "@vanilla-extract/css";

const MajorSelector = ({ user, setUser, checkMethod, setCheckMethod }) => {
  const handleInputChange = (fieldName, value) => {
    setCheckMethod((prevState) => ({
      ...prevState,
      [fieldName]: value,
      major: fieldName === "department" ? "" : prevState.major,
    }));
  };

  const handleMajorChange = (e) => {
    const value = e.target.value;
    setCheckMethod((prevState) => ({
      ...prevState,
      major: value,
    }));
    setUser((prevUser) => ({
      ...prevUser,
      major: value,
    }));
  };

  return (
    <div className={styles.majorSelector}>
      <MajorSelectorElement
        placeholder="학과"
        fieldType={styles.depart}
        selectname={styles.depart}
        value={checkMethod.department}
        onChange={(e) => handleInputChange("department", e.target.value)}
        options={majorCategories.map((category) => category.label)}
      />
      <MajorSelectorElement
        placeholder="전공"
        
        fieldType={styles.major}
        selectname={styles.major}
        value={checkMethod.major}
        onChange={handleMajorChange}
        options={
          checkMethod.department
            ? majorCategories.find(
                (category) => category.label === checkMethod.department
              )?.options || []
            : []
        }
      />
    </div>
  );
};

export default MajorSelector;
