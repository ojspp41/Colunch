import React, { useState } from "react";
import '../css/components/InterestSelectModal.css';
import SearchBar from './SearchBar';
import hobbyData from "../data/hobbyData";
import decomposeHangul from "../utils/getChosung";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";

const InterestSelectModal = ({ isOpen, onClose, interests, setInterests }) => {
  
    if (!isOpen) return null;
  const [user, setUser] = useRecoilState(userState);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  
  const handleHobbyClick = (name) => {
    const isAlreadySelected = interests.includes(name);
    const updatedHobbies = isAlreadySelected
      ? interests.filter((hobby) => hobby !== name) // 이미 선택된 경우 제거
      : interests.length < 10
      ? [...interests, name] // 최대 10개까지만 추가
      : interests;

    setInterests(updatedHobbies);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query); // 검색어 업데이트
  };
  
  const filteredHobbyData = hobbyData.map((category) => ({
    ...category,
    hobbies: category.hobbies.filter((hobby) => {
      const decomposedHobby = decomposeHangul(hobby.name);
      const decomposedSearch = decomposeHangul(searchQuery);
  
      return decomposedSearch.every((searchChar, index) => {
        const hobbyChar = decomposedHobby[index];
        if (!hobbyChar) return false; // 검색어가 더 길면 제외
  
        if (decomposedSearch.length === 1) {
          return hobbyChar.chosung === searchChar.chosung;
        } else if (decomposedSearch.length === 2) {
          return (
            hobbyChar.chosung === searchChar.chosung &&
            hobbyChar.jungsung === searchChar.jungsung
          );
        } else {
          return (
            hobbyChar.chosung === searchChar.chosung &&
            hobbyChar.jungsung === searchChar.jungsung &&
            hobbyChar.jongsung === searchChar.jongsung
          );
        }
      });
    }),
  }));

  return (
    <div className="interest-modal-overlay">
      <div className="interest-modal-container">
        <h2 className="interest-modal-title">관심사 선택</h2>
        <p className="interest-modal-text">
          최근 좋아하는 관심사를 골라주세요. <br />
          최대 10개까지 선택할 수 있어요.
        </p>

        <button className="interest-modal-close-button" onClick={onClose}>
          닫기
        </button>
        <SearchBar onSearch={handleSearch} />
        <div className="hobby-container">
          {filteredHobbyData.map(
            (category, index) =>
              category.hobbies.length > 0 && (
                <div className="hobby-category" key={index}>
                  <div className="hobby-category-title">{category.category}</div>
                  <div className="hobby-list">
                    {category.hobbies.map((hobby, idx) => (
                      <div
                        key={idx}
                        className={`hobby-items ${
                          interests.includes(hobby.name) ? "selected" : ""
                        }`}
                        onClick={() => handleHobbyClick(hobby.name)}
                      >
                        <span className="hobby-emoji">
                          {hobby.emoji} {hobby.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestSelectModal;
