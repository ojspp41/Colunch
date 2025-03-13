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
    console.log(cookie);
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const isFirstLogin = urlParams.get("isFirstLogin");

    // ✅ accessToken이 URL에 있으면 쿠키에 저장
    if (accessToken) {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; Secure; SameSite=None`;

      // ✅ URL에서 accessToken 제거 (보안 강화)
      urlParams.delete("accessToken");
      window.history.replaceState({}, "", `${window.location.pathname}?${urlParams}`);
    }

    if (isFirstLogin === "true") {
      localStorage.setItem("isFirstLogin", "true"); // 첫 로그인 여부 저장
      navigate("/profile-builder");
      return;
    }
    
    // ✅ 쿠키에서 accessToken 확인
    const storedToken = getCookie("accessToken");
    setIsLoggedIn(!!storedToken);
    }, [navigate]);
    
   

    

  return isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />;
}

export default Mainpage;
