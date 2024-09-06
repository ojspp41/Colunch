import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderBack from "../components/HeaderBack";
import "../css/pages/Checkresult.css";
import { useRecoilState } from "recoil";
import { checkresultState } from "../Atoms";
import UserInfoRrev from "../components/UserInfoRrev";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig"; // 전역 axios 인스턴스 불러오기
// 뽑은 결과를 볼 수 있는 페이지입니다.
function Checkresult() {
  const navigate = useNavigate();
  const [isReview, setIsReview] = useRecoilState(checkresultState); // 결과 리뷰 상태 관리

  useEffect(() => {
    // 결과 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await instance.get(
          "/auth/user/api/history/matching"
        );

        if (response.status === 200 && response.data.code === "GEN-000") {
          setIsReview(response.data.data.history_list); // 응답 데이터 설정
        } else if (response.data.code === "HIS-001") {
          alert("결과가 남아있지 않습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // 비동기 함수 호출
  }, [navigate, setIsReview]);

  return (
    <div>
      <div className="container">
        <HeaderBack />
        {isReview && isReview.length > 0 ? (
          isReview.map((user, index) => (
            <div key={index} style={{ marginBottom: "50px" }}> {/* 여기에서 margin-bottom 적용 */}
              <UserInfoRrev
                user={user} // 응답 데이터를 UserInfoRrev 컴포넌트로 전달
                ifMainpage={true} // 필요한 props 전달
              />
            </div>
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
