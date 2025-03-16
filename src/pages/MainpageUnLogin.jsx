import { useEffect, useState } from "react";
import "../css/pages/MainpageUnLogin.css";
import Footer from "../components/Footer.jsx";
import TotalUsersCounter from "../components/TotalUsersCounter.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background.jsx";
import HeaderMain from "../components/HeaderMain.jsx";
// 로그인 되지 않은 메인페이지입니다.
function MainpageUnLogin() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [numParticipants, setNumParticipants] = useState(null); // 참가자 수를 저장할 상태 변수

  // 카카오 로그인 핸들러
  // 일반적인 형식과 다를텐데 아래 링크로 이동시켜서 백엔드에서 카카오 로그인을 처리한뒤
  // Redirection페이지로 옮겨서 role을 확인하는 과정을 거쳤습니다.
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/kakao"
      // "https://cuk.comatching.site/oauth2/authorization/kakao";
    // alert("서비스 종료 ㅠㅠㅠㅠ");
  };
  
  // 서비스 이용법 안내 페이지로 이동하는 핸들러
  const handleVisitGuide = () => {
    window.location.href = "https://open.kakao.com/o/gvo8oylh";
};


  // 참가자 수를 가져오는 비동기 함수
  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const fetchData = async () => {
      try {
        // const response = await axios.get("https://cuk.comatching.site/api/participations");
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

  return (
    <div className="container">
      <Background />
      <div className="bubble-counter">
          <TotalUsersCounter
            font_size="16px"
            numParticipants={numParticipants}
          />
      </div>
      <HeaderMain />
      <div className="greeting-message">
        반갑습니다<br></br>
        코매칭이라면 당신은<br></br>
        이미 커플입니다
      </div>
      
      <div  style={{ marginTop: '69px' }}>
        <div className="bubble" >
          ⚡️10초만에 빠른 가입⚡️
        </div>
        <button className="kakao-login" onClick={handleLogin}>
            <div className="kakao-login-element">
              <img
                src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/kakao.svg`}
                alt="카카오"
              />
              <p>카카오로 시작하기</p>
            </div>
        </button>
      </div>
      <div className="help-text">이용에 도움이 필요하신가요?</div>
        <div>
          <a className="privacy-button" onClick={handleVisitGuide}>
            카카오 문의하기
          </a>
        </div>  
        <Footer /> 
        
    </div>
  );
}

export default MainpageUnLogin;
