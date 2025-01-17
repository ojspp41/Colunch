import React from 'react';
import '../css/components/PointBalance.css'; // 스타일을 분리하여 유지보수 가능하게 설정
import { useNavigate } from 'react-router-dom'; // React Router 사용

const PointBalance = ({ amount }) => {
    const navigate = useNavigate(); // 네비게이션 함수

  const handleChargeClick = () => {
    navigate('/charge'); // "/charge" 경로로 이동
  };
  return (
    <div className="point-balance">
      <div className="left-section">
        <img src="/assets/point.svg" alt="Point Icon" className="point-icon" />
        <span className="point-text">보유 포인트</span>
        <span className="amount">{amount} P</span>
      </div>
      <button className="charges-button" onClick={handleChargeClick}>충전하기</button>
    </div>
  );
};

export default PointBalance;
