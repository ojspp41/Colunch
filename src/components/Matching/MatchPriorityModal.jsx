import React from "react";
import "../../css/pages/Matching.css"; // 스타일 유지

const MatchPriorityModal = ({ modalOpen, toggleModal }) => {
  if (!modalOpen) return null; // 모달이 열려있을 때만 렌더링

  return (
    <div className="match-modal-overlay" onClick={toggleModal}>
      <div className="match-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="match-modal-header">
          <p className="modal-title">우선순위 선택</p>
          <button className="close-button" onClick={toggleModal}>
            닫기
          </button>
        </div>

        <div className="match-modal-body">
          <p>AI가 우선순위를 설정해서 골라줘요.</p>
          <p>내가 원하는 상대를 더 잘 고를 수 있어요!</p>
        </div>

        <div className="priority-item">
          <div className="circle">1</div>
          <div className="priority-box">
            <span className="priority-text">MBTI</span>
            <img src="/assets/Match/hambuger.svg" alt="icon" className="priority-icon" />
          </div>
        </div>
        <div className="priority-item">
          <div className="circle">2</div>
          <div className="priority-box">
            <span className="priority-text">관심사</span>
            <img src="/assets/Match/hambuger.svg" alt="icon" className="priority-icon" />
          </div>
        </div>
        <div className="priority-item">
          <div className="circle">3</div>
          <div className="priority-box">
            <span className="priority-text">나이</span>
            <img src="/assets/Match/hambuger.svg" alt="icon" className="priority-icon" />
          </div>
        </div>
        <div className="priority-item">
          <div className="circle">4</div>
          <div className="priority-box">
            <span className="priority-text">연락빈도</span>
            <img src="/assets/Match/hambuger.svg" alt="icon" className="priority-icon" />
          </div>
        </div>
        <div className="modal-button" onClick={toggleModal}>선택 완료</div>
      </div>
    </div>
  );
};

export default MatchPriorityModal;
