import React from "react";
import "../css/components/ChargeConfirmationModal.css"; // 스타일링 파일 불러오기

function ChargeConfirmationModal({ amount, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src="/assets/chargepoint.svg" alt="Charge Point" className="modal-charge-img" />
        <div className="modal-message">다음 내용이 맞나요?</div>
        <div className="modal-amount">
          충전 금액: <span className="modal-amount-value">{amount}원</span>
        </div>
        <div className="modal-warning">충전 요청 전에 꼭 확인해 주세요!</div>
        <div className="modal-actions">
          <button className="modal-confirm-button" onClick={onConfirm}>
            확인
          </button>
          <button className="modal-cancel-button" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChargeConfirmationModal;
