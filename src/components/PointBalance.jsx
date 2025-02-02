import React, { useState } from 'react';
import '../css/components/PointBalance.css'; // 스타일을 분리하여 유지보수 가능하게 설정
import { useNavigate } from 'react-router-dom'; // React Router 사용
import MainPaymentModal from './MainPaymentModal';
const PointBalance = ({ amount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  
  return (
    <div className="point-balance">
      <div className="left-section">
        <img src="/assets/point.svg" alt="Point Icon" className="point-icon" />
        <span className="point-text">보유 포인트</span>
        <span className="amount">{amount} P</span>
      </div>
      <button className="charges-button" onClick={() => setIsModalOpen(true)}>충전하기</button>
      {isModalOpen && <MainPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PointBalance;
