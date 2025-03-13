import { useEffect, useState, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";

import HeaderMain from "../components/HeaderMain";
import { charge, userState, matchedUserState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import Footer from "../components/Footer";
import TutorialSlides from "../components/TutorialSlides";
import Background from "../components/Background";
import instance from "../axiosConfig";
import Cookies from "js-cookie";
import PointBalance from "../components/PointBalance";
import MatchProfiles from "../components/Mainpage/MatchProfiles";
import axios from "axios";
import { fetchWithAuth } from "../api/authFetch";

function MainpageLogin() {
  const navigate = useNavigate();
  const [matchedUser, setMatchedUser] = useRecoilState(matchedUserState);
  const [showTutorial, setShowTutorial] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [numParticipants, setNumParticipants] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]); // 매칭된 사용자 정보를 저장할 상태 변수


  useEffect(() => {
      const preventGoBack = () => {
        navigate(0); // 🔥 강제 새로고침 (뒤로 가기 차단)
      };
  
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", preventGoBack);
  
      return () => {
        window.removeEventListener("popstate", preventGoBack);
      };
    }, [navigate]);

   // ✅ isFirstLogin 여부 확인 후 이동 처리
   useEffect(() => {
    const checkFirstLogin = async () => {
      try {
        const response = await fetchWithAuth("/api/users/is-first-login", { method: "GET" });
  
        if (!response.ok) {
          throw new Error("Failed to check isFirstLogin");
        }
  
        const data = await response.json();
        console.log(data)
        if (data.isFirstLogin) {
          navigate("/profile-builder", { replace: true });
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
        const response = await axios.get("http://localhost:8000/api/participations");
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
        const response = await fetchWithAuth("/api/matching/matched-users", { method: "GET" });

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
    window.location.reload();
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
          eventokay: true,
        }));
        setShowEventModal(false);
      }
    } catch (error) {
      console.error("Error participating in event:", error);
    }
  };

  // ✅ AI 매칭 버튼 클릭 핸들러
  const handleClickMatch = async () => {
    // 매칭된 사용자가 한 명 이상 있을 경우 알림 표시
    console.log(profiles);
    if (profiles.length > 0) {
      alert("늘품제 매칭 기회는 1번입니다 !!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth("/api/matching", { method: "GET" });
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
    }
  };

  return (
    <div className="container">
      <HeaderMain />
      <Background />
      <MatchProfiles profiles={profiles} />
      <div className="Mainpage__Login">
        <div>
        <button
          className="matching-button"
          onClick={handleClickMatch}
          disabled={profiles.length > 0} // ✅ 매칭된 사용자가 있으면 비활성화
        >
          {profiles.length > 0 ? "축제를 기대하세요!" : "AI 매칭하기 ▶"} 
           
          <TotalUsersCounter font_size="15px" numParticipants={numParticipants} />
        </button>

        </div>
      </div>
      <div className="logout-container">
        <a href="#" onClick={handleLogout} className="logout-link">
          로그아웃
        </a>
      </div>
      <Footer />
      {showTutorial && <TutorialSlides onComplete={() => setShowTutorial(false)} />}
    </div>
  );
}

export default MainpageLogin;
