import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { priorityState } from "../../Atoms.jsx";
import "../../css/pages/Matching.css";

const MatchPriorityModal = ({ modalOpen, toggleModal }) => {
  const [priorities, setPriorities] = useRecoilState(priorityState);
  const [draggingItem, setDraggingItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!modalOpen) return null;

  // 드래그 시작
  const onDragStart = (event, index) => {
    setDraggingItem(index);
    setDragOffset({
      x: event.clientX - event.target.getBoundingClientRect().left,
      y: event.clientY - event.target.getBoundingClientRect().top,
    });
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  // 드래그 중 (마우스 따라 이동)
  const onDragMove = (event) => {
    if (draggingItem === null) return;
    setMousePos({ x: event.clientX, y: event.clientY });

    const newList = [...priorities];
    const draggedBox = newList[draggingItem];

    // 드래그 위치를 기준으로 새 위치 찾기
    const newIndex = newList.findIndex((_, i) => {
      const rect = document.getElementById(`priority-item-${i}`).getBoundingClientRect();
      return event.clientY < rect.top + rect.height / 2;
    });

    // 위치 변경
    if (newIndex !== -1 && newIndex !== draggingItem) {
      newList.splice(draggingItem, 1);
      newList.splice(newIndex, 0, draggedBox);
      setDraggingItem(newIndex);
      setPriorities(newList);
    }
  };

  // 드래그 끝 (위치 확정)
  const onDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <div className="match-modal-overlay" onMouseMove={onDragMove} onMouseUp={onDragEnd}>
      <div className="match-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="match-modal-header">
          <p className="modal-title">우선순위 선택</p>
          <button className="close-button" onClick={toggleModal}>닫기</button>
        </div>

        <div className="match-modal-body">
          <p>AI가 우선순위를 설정해서 골라줘요.</p>
          <p>내가 원하는 상대를 더 잘 고를 수 있어요!</p>
        </div>

        {/* 우선순위 리스트 */}
        <div className="priority-list">
          {priorities.map((item, index) => (
            <div
              key={item.id}
              id={`priority-item-${index}`}
              className={`priority-item ${draggingItem === index ? "dragging" : ""}`}
              onMouseDown={(event) => onDragStart(event, index)}
              style={
                draggingItem === index
                  ? { position: "absolute", left: `${mousePos.x - dragOffset.x}px`, top: `${mousePos.y - dragOffset.y}px`, zIndex: 1000 }
                  : {}
              }
            >
              <div className="circle">{index + 1}</div>
              <div className="priority-box">
                <span className="priority-text">{item.label}</span>
                <img src="/assets/Match/hambuger.svg" alt="icon" className="priority-icon" />
              </div>
            </div>
          ))}
        </div>

        <div className="modal-button" onClick={toggleModal}>선택 완료</div>
      </div>
    </div>
  );
};

export default MatchPriorityModal;
