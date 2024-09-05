import Cookies from "js-cookie";
import axios from "axios";

// Axios 기본 설정
const instance = axios.create({
  baseURL: "https://backend.comatching.site", // 실제 서버 URL 사용
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    //리프레시 토큰도 보내야함
    const accessToken = Cookies.get("Authorization");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
/*instance.interceptors.response.use(
  (response) => {
    //헤더에 값이 들어있다면 쿠키에 리프레쉬 토큰이랑 엑세스 토큰 저장
    return response;
  },
  (error) => {
    //리프레시 토큰이 만료된거면 여기서 쿠키값 삭제시키기
    //추가적으로 전체적으로 적용해야하는 에러 핸들링
    if (
      error.response &&
      (error.response.data.code === "SEC-001" ||
        error.response.data.code === "SEC-002")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/"; // 메인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);*/

export default instance;
