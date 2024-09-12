import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Background from "../components/Background.jsx";
import { useNavigate } from "react-router-dom";
import "../css/pages/ChargeRequestPage.css"; // 스타일링을 위한 CSS 파일 생성
import HeaderBack from "../components/HeaderBack.jsx";
import { charge } from "../Atoms";

import instance from "../axiosConfig.jsx"; // axios 인스턴스 불러오기

function ChargeRequestPage() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [amount, setAmount] = useState("");
  const [chargeState, setChargeState] = useRecoilState(charge); // Recoil 상태 불러오기
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const accountNumber = "토스뱅크 1001-4935-3543"; // 계좌번호를 여기에 입력
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // 2초 후에 "Copied!" 메시지 사라지게
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };
  const handleSubmit = async () => {
    if (amount == "" || parseInt(amount) <= 0) {
      alert("충전할 금액을 1원 이상 입력해 주세요.");
      return; // 유효하지 않으면 함수 종료
    }
    // Recoil 상태 업데이트
    setChargeState({ chargeclick: true });
    setIsButtonDisabled(true);
    try {
      // 백엔드로 POST 요청 보내기
      
      const response = await instance.post("/auth/user/api/charge", {
        amount: parseInt(amount), // amount를 integer로 변환하여 전송
      });

      if (response.status === 200) {
        navigator.clipboard.writeText(accountNumber);
        alert(
          "충전 요청이 성공적으로 전송되었습니다. 부스에 가서 계좌 입금 확인 해주세요!"
        );
        alert("토스뱅크 1001-4935-3543\n계좌번호가 복사되었습니다.");
        navigate("/", { replace: true });
        // 이후 리디렉션 또는 다른 로직 추가 가능
      } else {
        alert("충전 요청에 실패했습니다.");
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error submitting charge request:", error);
      alert("충전 요청 중 오류가 발생했습니다.");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="container">
      <HeaderBack />
      <Background />

      <div className="charge-request-clicked">
        <div className="charge-request-clicked-top-page">
          💁 부스에 충전 요청하기
        </div>

        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="충전할 금액을 입력하세요"
          className="charge-input"
        />

        <li className="charge-request-clicked-text">
          입금 후 포인트 충전을 원하거나
        </li>
        <li className="charge-request-clicked-text">
          포인트를 PickMe로 바꾸고 싶을때 버튼을 눌러 주세요
        </li>
        <li className="charge-request-clicked-text">
          요청 후에는 입금 화면과 아이디를 보여 주세요.
        </li>
        <li className="charge-request-clicked-text">
          버튼 남용 시 이용이 제한될 수 있으니 유의 바랍니다.
        </li>
        <button
          className="charge-request-clicked-button"
          onClick={handleSubmit} // 버튼 클릭 시 handleSubmit 함수 호출
          disabled={isButtonDisabled}
        >
          충전 요청하기
        </button>
      </div>
      
    </div>
  );
}

export default ChargeRequestPage;
