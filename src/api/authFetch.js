// authFetch.js
import { BASE_URL } from "./baseUrl.js"; // 또는 직접 정의: const BASE_URL = "http://localhost:8000";

export const fetchWithAuth = async (endpoint, options = {}) => {
    // document.cookie에서 accessToken 추출
    const tokenCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;
  
    if (!token) {
      throw new Error("Access token이 없습니다.");
    }
  
    // 기본 헤더 설정 (JSON 데이터와 토큰 추가)
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    // 옵션에 기본 헤더와 사용자가 전달한 헤더 병합
    const mergedOptions = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };
  
    // endpoint를 BASE_URL과 결합하여 전체 URL 구성
    const url = `${BASE_URL}${endpoint}`;
  
    // fetch 요청 실행
    const response = await fetch(url, mergedOptions);
    return response;
};
