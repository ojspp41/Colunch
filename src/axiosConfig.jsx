import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Axios 기본 설정
const instance = axios.create({
  baseURL: "http://localhost:8000", // ✅ 콤마 추가
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("Authorization");

    if (!accessToken) {
      window.location.href = "/"; // ✅ 또는 navigate("/") 사용 가능
      return Promise.reject(new Error("No access token found"));
    }
    console.log(accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["authorization"];

    if (newAccessToken && newAccessToken.startsWith("Bearer ")) {
      const newAccessTokenWithoutBearer = newAccessToken.slice(7);
      Cookies.remove("Authorization", { path: "/" });
      Cookies.set("Authorization", newAccessTokenWithoutBearer, { path: "/" });
    }

    return response;
  },
  async (error) => {
    if (!error.response) {
      console.error("Network error or server is down");
      alert("서버에 연결할 수 없습니다. 다시 시도해 주세요.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status === 401 && (data.code === "SEC-001" || data.code === "SEC-002")) {
      Cookies.remove("Authorization");
      localStorage.removeItem("token");
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      window.location.href = "/";
    }

    if (status === 500) {
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } else if (status === 403) {
      alert("해당 작업에 대한 권한이 없습니다.");
    } else if (status === 404) {
      alert("요청한 자원이 존재하지 않습니다.");
    }

    return Promise.reject(error);
  }
);

export default instance;
