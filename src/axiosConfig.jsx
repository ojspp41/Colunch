import axios from "axios";

// Axios 기본 설정
const instance = axios.create({
    baseURL: "http://backend.comatching.site:8080", // 실제 서버 URL 사용
});

// // 요청 인터셉터 설정
// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// 응답 인터셉터 설정
// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && (error.response.data.code === "SEC-001" || error.response.data.code === "SEC-002")) {
//             localStorage.removeItem("token");
//             window.location.href = "/"; // 메인 페이지로 리다이렉트
//         }
//         return Promise.reject(error);
//     }
// );

export default instance;
