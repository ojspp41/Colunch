import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainpageUnLogin from "./MainpageUnLogin.jsx";
import MainpageLogin from "./MainpageLogin.jsx";
import { fetchWithAuth } from "../api/authFetch.js";
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
    const urlParams = new URLSearchParams(window.location.search);
    const isFirstLogin = urlParams.get("isFirstLogin");

    if (isFirstLogin === "true") {
      localStorage.setItem("isFirstLogin", "true"); // 첫 로그인 여부 저장
      navigate("/profile-builder");
      return;
    }

  

    // ✅ accessToken 쿠키 확인 (첫 로그인이 아닌 경우)
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  return isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />;
}

export default Mainpage;
