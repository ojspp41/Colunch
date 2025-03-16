import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MatchResultState, MatchPickState, userState, matchedUserState } from "../Atoms"; // ✅ matchedUsersState → matchedUserState 변경
import { useNavigate } from "react-router-dom";
import Background from "../components/Background.jsx";
import Loading from "./Loading.jsx";
import PointBalance from "../components/PointBalance.jsx";
import HeaderBack from "../components/Match-result/Header.jsx";
import hobbyData from "../data/hobbyData.js";
import "../css/pages/Matchresult.css";
import { motion } from "framer-motion";
function Matchresult() {
  const navigate = useNavigate();
  const [MatchState] = useRecoilState(MatchPickState);
  const [MatchResult, setMatchResult] = useRecoilState(MatchResultState);
  const [matchedUser] = useRecoilState(matchedUserState); // ✅ matchedUsersState → matchedUserState 변경
  const [resultPoint, setResultPoint] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  console.log(matchedUser);

  // 매칭된 사용자가 없을 경우 홈으로 이동
  useEffect(() => {
    if (!matchedUser._id) {
      navigate("/", { replace: true });
    }
  }, [matchedUser, navigate]);

  // 취미를 아이콘과 매핑하는 함수
  const mapHobbiesWithIcons = (hobbyList) => {
    return hobbyList.map((hobbyName) => {
      const matchedCategory = hobbyData.find((category) =>
        category.hobbies.some((hobby) => hobby.name === hobbyName)
      );
      const matchedHobby = matchedCategory?.hobbies.find(
        (hobby) => hobby.name === hobbyName
      );
      return { name: hobbyName, image: matchedHobby?.emoji || "" };
    });
  };

  const resultData = matchedUser._id
    ? { ...matchedUser, hobby: mapHobbiesWithIcons(matchedUser.hobby) }
    : null;

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Background />
          <HeaderBack />

          {resultData ? (
            <motion.div
              className="matchresult-content"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              <motion.div
                className="MatchResult-Container"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="MatchResult-Major">
                  <div className="MatchResult-Topic-Top">전공</div>
                  <div className="MatchResult-Text">{resultData.major}</div>
                </div>
              </motion.div>

              <motion.div
                className="MatchResult-Container"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="MatchResult-Age">
                  <div className="MatchResult-Topic">나이</div>
                  <div className="MatchResult-Text">{resultData.age}</div>
                </div>
                <div className="MatchResult-MBTI">
                  <div className="MatchResult-Topic">MBTI</div>
                  <div className="MatchResult-Text">{resultData.mbti}</div>
                </div>
                <div className="MatchResult-Frequency">
                  <div className="MatchResult-Topic">연락빈도</div>
                  <div className="MatchResult-Text">
                    {resultData.contactFrequency}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="MatchResult-Container"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="MatchResult-Hobby">
                  <div className="MatchResult-Topic">취미</div>
                  <div className="MatchResult-Text-Hobby">
                    {resultData.hobby.map((hobby, index) => (
                      <div key={index} className="hobby-box">
                        <span className="hobby-icon">{hobby.image}</span>
                        <span className="hobby-text">{hobby.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="MatchResult-Song"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="MatchResult-Topic">좋아하는 노래</div>
                <div className="MatchResult-Text">{resultData.song}</div>
              </motion.div>

              <motion.div
                className="MatchResult-Song"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="MatchResult-Topic">내 장점은 ..</div>
                <div className="MatchResult-Text">{resultData.comment}</div>
              </motion.div>

              <motion.div
                className="MatchResult-Container"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="MatchResult-Contact">
                  <div className="MatchResult-Topic">
                    {resultData.contact_id[0] === "@" ? "Instagram" : "Kakao"}
                  </div>
                  <div className="MatchResult-Text MatchResult-Text-Contact">
                    {resultData.contact_id}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="MatchResult-button-container"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.button
                  className="SendText-button"
                  onClick={handleHome}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  홈으로 가기
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="matchresult-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "24px" }}>
                  이성이 데이터에 한 명도 없습니다
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
}

export default Matchresult;