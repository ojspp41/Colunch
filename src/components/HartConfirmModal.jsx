import React, { useState } from "react";
import "../css/components/HartConfirmModal.css"; // 스타일링 파일 불러오기

function HartConfirmationModal({ amount, onConfirm, onCancel }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "heart-modal-overlay") {
      onCancel();
    }
  };

  return (
    <div className="heart-modal-overlay" onClick={handleOverlayClick}>
      <div className="heart-modal-content">
        <div className="heart-modal-message">다음 내용이 맞나요?</div>
        <div className="heart-modal-warning">충전 요청 전에 꼭 확인해 주세요!</div>
        <div className="heart-point_container">
          <img src="/assets/chargepoint.svg" alt="" className="heart-modal-charge-img" />
          <span className="heart-modal-amount-value">{amount}원</span>
        </div>
        
        <div className="heart-terms-container" onClick={handleCheckClick}>
          <img
            src={isChecked ? "/assets/chargechecked.svg" : "/assets/chargecheck.svg"}
            alt="check"
            className="heart-modal-check-img"
          />
          <span className="heart-modal-terms-text">적혀진 계좌로 입금했어요</span>
          <span className="heart-modal-required-text">필수</span>
          <img src="/assets/chargemore.svg" alt="check" className="heart-modal-more-img" />
        </div>
        <button
          className={`heart-modal-confirm-button ${isChecked ? "active" : "inactive"}`}
          onClick={isChecked ? onConfirm : undefined}
        >
          {isChecked ? "네 맞아요" : "잠시만요!"}
        </button>
      </div>
    </div>
  );
}

export default HartConfirmationModal;
