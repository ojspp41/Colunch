import {useEffect, useState, useLayoutEffect} from "react";
import {useRecoilState} from "recoil";

import HeaderMain from "../components/HeaderMain";
import {charge, userState, matchedUserState} from "../Atoms";
import "../css/pages/MainpageLogin.css";
import {useNavigate} from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import Footer from "../components/Footer";
import TutorialSlides from "../components/TutorialSlides";
import Background from "../components/Background";
import instance from "../axiosConfig";
import Cookies from "js-cookie";
import PointBalance from "../components/PointBalance";
import MatchProfiles from "../components/Mainpage/MatchProfiles";
import axios from "axios";
import {fetchWithAuth} from "../api/authFetch";
import { motion,AnimatePresence } from "framer-motion";

function MainpageLogin() {
    const navigate = useNavigate();
    const [matchedUser, setMatchedUser] = useRecoilState(matchedUserState);
    const [showTutorial, setShowTutorial] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [numParticipants, setNumParticipants] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profiles, setProfiles] = useState([]); // 매칭된 사용자 정보를 저장할 상태 변수
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [showCodeModal, setShowCodeModal] = useState(false);
    const [matchCode, setMatchCode] = useState("");
    const MATCH_CODE = "COMA7942"; // 예시로 사용할 코드

    useEffect(() => {
        const preventGoBack = () => {
            navigate(0); // 🔥 강제 새로고침 (뒤로 가기 차단)
        };

        window
            .history
            .pushState(null, "", window.location.href);
        window.addEventListener("popstate", preventGoBack);

        return() => {
            window.removeEventListener("popstate", preventGoBack);
        };
    }, [navigate]);

    // ✅ isFirstLogin 여부 확인 후 이동 처리
    useEffect(() => {
        const checkFirstLogin = async () => {
            try {
                const response = await fetchWithAuth(
                    "/api/users/is-first-login",
                    {method: "GET"}
                );

                if (!response.ok) {
                    throw new Error("Failed to check isFirstLogin");
                }

                const data = await response.json();
                console.log(data)
                if (data.isFirstLogin) {
                    navigate("/profile-builder", {replace: true});
                }
            } catch (err) {
                console.error("Error checking first login:", err);
            }
        };

        checkFirstLogin();
    }, [navigate]);

    // 참가자 수를 가져오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://colunch-be.onrender.com/api/participations");
                if (response.status === 200) {
                    setNumParticipants(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [setNumParticipants]);

    // ✅ 매칭된 사용자 정보를 가져오는 useEffect 추가
    useEffect(() => {
        const fetchMatchedUsers = async () => {
            try {
                setLoading(true);
                const response = await fetchWithAuth(
                    "/api/matching/matched-users",
                    {method: "GET"}
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch matched users");
                }

                const data = await response.json();

                setProfiles(data.matchedUsers); // 응답 받은 매칭된 사용자 정보를 profiles 상태에 저장
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchedUsers();
    }, []);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("connect.sid");
        window
            .location
            .reload();
    };

    useEffect(() => {
        if (userInfo.eventokay === false) {
            setShowEventModal(true);
        }
    }, [userInfo.eventokay]);

    const handleCancel = async () => {
        try {
            const response = await instance.get("/auth/user/api/event/no-pickMe");
            if (response.status === 200) {
                setUserInfo((prev) => ({
                    ...prev,
                    eventokay: true
                }));
                setShowEventModal(false);
            }
        } catch (error) {
            console.error("Error participating in event:", error);
        }
    };

    // ✅ AI 매칭 버튼 클릭 핸들러
    const handleClickMatch = async () => {

        if (profiles.length > 0) {
            alert("늘품제 매칭 기회는 1번입니다 !!");
            return;
        }
        setShowCodeModal(true);
    };
    // 코드 입력 확인 및 매칭 시작 핸들러
    const handleConfirmCode = async () => {


        // 이미 진행 중이면 클릭 방지
        if (isSubmitting) return;

        if (matchCode === MATCH_CODE) {
            setIsSubmitting(true); // 버튼 비활성화
            setShowCodeModal(false);
            setLoading(true);

            try {
                const response = await fetchWithAuth("/api/matching", {method: "GET"});
                if (!response.ok) {
                    throw new Error("Failed to fetch matched user");
                }
                const data = await response.json();
                setMatchedUser(data.matchedUser);
                navigate("/loading");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                setMatchCode("");
            }
        } else {
            alert("코드가 틀렸습니다. 다시 입력해주세요.");
            setShowCodeModal(false);

        }
    };
    return (
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeaderMain />
        <Background />
  
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <MatchProfiles profiles={profiles} />
        </motion.div>
  
        <div className="Mainpage__Login">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="matching-button"
              onClick={handleClickMatch}
              disabled={profiles.length > 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {profiles.length > 0 ? "축제를 기대해주세요!" : "AI 매칭하기 ▶"}
              <TotalUsersCounter font_size="15px" numParticipants={numParticipants} />
            </motion.button>
          </motion.div>
        </div>
  
        <motion.div
          className="logout-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a href="#" onClick={handleLogout} className="logout-link">
            로그아웃
          </a>
        </motion.div>
  
        <Footer />
        {showTutorial && <TutorialSlides onComplete={() => setShowTutorial(false)} />}
  
        {/* 모달 부분 */}
        <AnimatePresence>
          {showCodeModal && (
            <div className="modal-overlay">
              <motion.div
                className="modal-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.4 }}
              >
                <button className="close-button" onClick={() => setShowCodeModal(false)}>×</button>
                <h2 className="modal-title">🔒 비밀 코드 입력</h2>
                <p className="modal-subtitle">매칭을 시작하려면 코드를 입력하세요
                  <br /> 코드는 coma 부스에서 확인가능합니다
                </p>
                <input
                  type="text"
                  value={matchCode}
                  onChange={(e) => setMatchCode(e.target.value)}
                  placeholder="CODE"
                  className="code-input"
                />
                <button className="confirm-button" onClick={handleConfirmCode}>매칭 시작 🚀</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
  
  export default MainpageLogin;