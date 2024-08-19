import { useNavigate } from "react-router-dom";
import * as styles from "../css/components/HeaderMain.css";

function HeaderPoint() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div>
        <img
          className={styles.logoImg}
          src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/logoblacknav.svg`}
          alt="로고"
          onClick={() => navigate("/")}
        />
      </div>
        <div className={styles.right} onClick={() => navigate("/charge")}>
                <img src="./assets/point.svg" alt="point" className={styles.pointImage} />
                <span className={styles.spanText}>180p</span>
                <img src="./assets/headertoggle.svg" alt="toggle" className={styles.toggleImage} />
        </div>
    </div>
  );
}

export default HeaderPoint;
