import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainpageUnLogin from "./MainpageUnLogin.jsx";
import MainpageLogin from "./MainpageLogin.jsx";

function Mainpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 쿠키에서 특정 값 가져오기
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    // ✅ URL에서 isFirstLogin 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const isFirstLogin = urlParams.get("isFirstLogin");

    // ✅ 첫 로그인인 경우 /profile-builder로 이동
    if (isFirstLogin === "true") {
      navigate("/profile-builder");
      return; // ✅ 더 이상의 로직 실행 방지
    }

    // ✅ accessToken 쿠키 확인 (첫 로그인 아닌 경우)
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  // 로그인 상태에 따라 다른 컴포넌트 렌더링
  return isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />;
}

export default Mainpage;
