import React, { useState, useEffect  } from "react";
import "../../css/components/InterestModal.css"; // 스타일 추가
import interestOptions from "../../data/interestOptions";

const InterestModal = ({ modalOpen, toggleModal, handleHobbyClick, selectedHobby  }) => {
  const [selectedOption, setSelectedOption] = useState( selectedHobby ); // 하나만 선택 가능

  // Recoil의 hobbyOption 값을 초기 상태로 반영 (모달이 열릴 때)
  useEffect(() => {
    if (modalOpen) {
      setSelectedOption(selectedHobby); // 기존에 선택한 항목 유지
    }
  }, [modalOpen, selectedHobby]);

  const handleSelect = (label) => {
    setSelectedOption(label); // 하나만 선택 가능
  };

  const handleConfirmSelection = () => {
    if (selectedOption !== null) {
      handleHobbyClick(selectedOption); // 선택된 취미를 handleHobbyClick에 전달
    }
    toggleModal(); // 모달 닫기
  };

  if (!modalOpen) return null;

  return (
    <div className="match-modal-overlay" onClick={toggleModal}>
      <div className="match-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="match-modal-header">
          <p className="modal-title">관심사 선택</p>
          <button className="close-button" onClick={toggleModal}>
            닫기
          </button>
        </div>
        <div className="match-modal-body">
          <p>상대방이 가졌음 하는 관심사를 골라주세요.</p>
          <p>중분류만 선택할 수 있어요.</p>
        </div>

        {/* 관심사 선택 영역 */}
        <div className="interest-grid">
          {interestOptions.map((item, index) => (
            <div
              key={index}
              className={`interest-item ${selectedOption === item.label ? "selected" : ""}`}
              onClick={() => handleSelect(item.label)}
            >
              <img src={item.image} alt={item.label} className="interest-icon" />
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        

        <div className="modal-button" onClick={handleConfirmSelection}>
          선택 완료
        </div>
      </div>
    </div>
  );
};

export default InterestModal;
