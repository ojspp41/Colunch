import { Fragment } from "react";
import GenderButton from "./GenderButton";
import * as styles from "../css/components/GenderSelect.css.ts";

function GenderSelect({ user, setUser }) {
  const handleGenderSelection = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: value,
    }));
  };
  const isActive = user.gender.includes("남자");
  return (
    <Fragment>
      <h3>성별</h3>
      <div className={styles.genderContainer}>
        <GenderButton
          isActive={isActive}
          value="남자"
          onClick={() => handleGenderSelection("남자")}
          label="남자"
        />
        <GenderButton
          isActive={!isActive}
          value="여자"
          onClick={() => handleGenderSelection("여자")}
          label="여자"
        />
      </div>
    </Fragment>
  );
}

export default GenderSelect;
