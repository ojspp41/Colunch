import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/Checkresult.css";
import { useRecoilState } from "recoil";
import { checkresultState } from "../Atoms";
import UserInfoRrev from "../components/UserInfoRrev";
import { useNavigate } from "react-router-dom";

// 뽑은 결과를 볼 수 있는 페이지입니다.
function Checkresult() {
  const navigate = useNavigate();
  const [isReview, setIsReview] = useRecoilState(checkresultState); // 결과 리뷰 상태 관리

  // Authorization 토큰을 쿠키에서 가져오는 함수
  function getTokenFromCookie() {
    const name = "Authorization=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    // 결과 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const token = getTokenFromCookie(); // 토큰 가져오기
        const response = await axios.get(
          "https://backend.comatching.site/auth/user/api/history/matching",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization 토큰 추가
            },
          }
        );
        if (response.status === 200 && response.data.code === "GEN-000") {
          setIsReview(response.data.data.history_list); // 응답 데이터 설정
        } else if (response.data.code === "HIS-001") {
          alert("결과가 남아있지 않습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if needed
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [navigate, setIsReview]);

  return (
    <div>
      <div className="container">
        <HeaderNav />
        {isReview && isReview.length > 0 ? (
          isReview.map((user, index) => (
            <UserInfoRrev
              key={index}
              user={user} // 응답 데이터를 UserInfoRrev 컴포넌트로 전달
              ifMainpage={true} // 필요한 props 전달
            />
          ))
        ) : (
          <p>결과가 없습니다.</p>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Checkresult;
