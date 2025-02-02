import React, { useState } from 'react';
import '../css/pages/profileEdit.css';
import Background from '../components/Background';
import MBTISection from '../components/MBTISection';
import AgeButton from '../components/AgeButton';

const ProfileEdit = () => {

  // 프로필 정보 상태 관리
  const [profile, setProfile] = useState({
    nickname: '겨울이오길',
    age: '25',
    school: '가톨릭대학교',
    department: '정보통신전자공학부',
    contact: '@winterizcoming_',
    interests: '인디노래, 맛집탐방 외 3개',
    favoriteSong: '실리카겔 - Tik Tak Tok',
    selectedMBTIEdit: "ESFJ", // ✅ 문자열로 변경
    ageOption:"YOUNGER",
    introduction: '인디노래 좋아하세요? 😌',
  });

  const [editingField, setEditingField] = useState(null);

  const handleEditClick = (field) => {
    if (field !== 'school' && field !== 'department') {
      setEditingField(field);
    }
  };

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleBlur = () => {
    setEditingField(null);
  };
  const handleAgeSelection = (value) => {
    setProfile((prev) => ({
      ...prev,
      ageOption: prev.ageOption === value ? "" : value, // 선택 취소 로직
    }));
  };
  
  // MBTI 선택 함수 수정
  const handleMBTISelection = (type) => {
    setProfile((prevProfile) => {
      let newMBTI = prevProfile.selectedMBTIEdit.split(""); // ✅ 문자열을 배열로 변환

      const categoryIndex =
        type === "E" || type === "I" ? 0 :
        type === "S" || type === "N" ? 1 :
        type === "T" || type === "F" ? 2 :
        3;

      // 기존 값과 같은 경우 선택 해제, 아니면 새로운 값으로 변경
      newMBTI[categoryIndex] = newMBTI[categoryIndex] === type ? "X" : type;

      return { 
        ...prevProfile, 
        selectedMBTIEdit: newMBTI.join("").replace(/X/g, '') // ✅ 배열을 다시 문자열로 변환하고 'X' 제거
      };
    });
  };
  
  
  console.log(profile);
  const isFormComplete =
  Object.values(profile).every(value => value !== "") &&
  profile.selectedMBTIEdit.length === 4; // ✅ 문자열 길이로 MBTI 4개 선택 여부 확인


  return (
    <div className="profile-edit-container">
      <Background />
      <div className="profile-edit-header">
        <h2 className="profile-edit-title">프로필 수정</h2>
        <p className="profile-edit-description">
          자신의 프로필을 수정할 수 있어요.<br />
          연락처 등은 신중하게 기입해주세요.
        </p>
      </div>
      <div className="profile-edit-form">
        {Object.keys(profile).map((field) => (
          (field === 'ageOption' ||field === 'favoriteSong' || field === 'introduction' || field === 'selectedMBTIEdit') ? null : (
            <div key={field} className={`profile-edit-item ${field !== 'school' && field !== 'department' ? 'profile-edit-clickable' : 'profile-edit-noneditable'}`} onClick={() => handleEditClick(field)}>
              <span className="profile-edit-label">{field === 'nickname' ? '닉네임' : 
                field === 'age' ? '나이' : 
                field === 'school' ? '학교' : 
                field === 'department' ? '학과' :
                field === 'contact' ? '연락처' :
                field === 'interests' ? '관심사' :
                '한줄소개'}</span>
              {editingField === field ? (
                <input
                  type="text"
                  className="profile-edit-input"
                  value={profile[field]}
                  onChange={(e) => handleInputChange(e, field)}
                  onBlur={handleBlur}
                  autoFocus
                />
              ) : (
                <span className={`profile-edit-value ${field === 'school' ||
                  field === 'department' ? 'profile-edit-no-underline' : ''}`}>{profile[field]}</span>
              )}
            </div>
          )
        ))}
        
        <div className="profile-edit-mbti profile-edit-clickable">
          <span className="profile-edit-name">MBTI</span>
          <div className="margin"></div>
          <MBTISection 
            user={profile.selectedMBTIEdit} // 배열을 문자열로 변환
            onClick={handleMBTISelection}
            name="MBTIButton" 
          />

        </div>
        
        <div className="profile-edit-mbti profile-edit-clickable">
          <span className="profile-edit-name">연락빈도</span>
          <div className="margin"></div>
          <div className="profile-edit-button-group">
            <AgeButton
              formData={profile.ageOption}
              value="YOUNGER"
              text="연하"
              onClick={() => handleAgeSelection("YOUNGER", "ageOption")}
              isClickable={true}
            />
            <AgeButton
              formData={profile.ageOption}
              value="EQUAL"
              text="동갑"
              onClick={() => handleAgeSelection("EQUAL", "ageOption")}
              isClickable={true}
            />
            <AgeButton
              formData={profile.ageOption}
              text="연상"
              value="OLDER"
              onClick={() => handleAgeSelection("OLDER", "ageOption")}
              isClickable={true}
            />
          </div>
        </div>
        
        {['favoriteSong', 'introduction'].map((field) => (
          <div key={field} className="profile-edit-item profile-edit-clickable" onClick={() => handleEditClick(field)}>
            <span className="profile-edit-label">{field === 'favoriteSong' ? '좋아하는 노래' : '한줄소개'}</span>
            {editingField === field ? (
              <input
                type="text"
                className="profile-edit-input"
                value={profile[field]}
                onChange={(e) => handleInputChange(e, field)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <span className="profile-edit-value">{profile[field]}</span>
            )}
          </div>
        ))}
      </div>
      {/* 탈퇴하기 버튼 */}
      <div className="profile-edit-footer">
        <button className="profile-delete-button">탈퇴하기</button>
      </div>

      
      <button
        className={`profile-submit-button ${isFormComplete ? 'active' : 'inactive'}`}
        disabled={!isFormComplete}
      >
        수정하기
      </button>
    </div>
  );
};

export default ProfileEdit;
