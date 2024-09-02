import React, { useState,useEffect } from "react";
import axios from "../axiosConfig";
// import { validateForm } from "../myfunction/formValidation";
import { useRecoilState } from "recoil";
import { userState, selectedMBTIState } from "../Atoms";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/MyInput";
import HeaderMain from "../components/HeaderMain";
import MajorSelector from "../components/MajorSelector";
import Cookies from 'js-cookie';
import "../css/pages/User_info.css";
import AgeInputInput from "../components/AgeInput";
import ContactMethod from "../components/ContactMethod";
import GenderSelect from "../components/GenderSelect";
import MBTISection from "../components/MBTISection";
// import hobbyIcons from "../data/hobbyIcons";
// import Agreement from "../components/Agreement";
import AdmissionYearInput from "../components/AdmissionYearInput";
import Background from "../components/Background";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal"; // Import react-modal
import TermsAgreementModal from "../components/TermsAgreementModal"; 
import { endFileScope } from "@vanilla-extract/css/fileScope";
Modal.setAppElement("#root");

function Userinfo() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState); // 유저 상태 관리
    const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
    const [checkMethod, setCheckMethod] = useState({
        school: "",
        department: "",
        major: "",
        contactVerified: true,
    });
    const [registerCheck, setRegisterCheck] = useState({
        terms1: false,
        terms2: false,
        terms3: false,
    });
    const handleMBTISelection = (value) => {
        const category =
            value === "E" || value === "I"
                ? "EI"
                : value === "S" || value === "N"
                ? "SN"
                : value === "T" || value === "F"
                ? "TF"
                : "PJ";
    
        setSelectedMBTI((prevMBTI) => ({
            ...prevMBTI,
            [category]: value,
        }));
    
        setUser((prevUser) => ({
            ...prevUser,
            mbti: `${category === "EI" ? value : selectedMBTI.EI}${
                category === "SN" ? value : selectedMBTI.SN
        }${category === "TF" ? value : selectedMBTI.TF}${
            category === "PJ" ? value : selectedMBTI.PJ
        }`,
        isLoggedIn: true,
        }));
    };

    const [isGenderSelectable, setIsGenderSelectable] = useState(false); 
    const [isContactVerified, setIsContactVerified] = useState(false);
    const [isSongInputVisible, setIsSongInputVisible] = useState(false);
    const [isCommentVisible, setIsCommentVisible] = useState(false);
    const [isFiveChars, setIsFiveChars] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isGenderSelected, setIsGenderSelected] = useState(false); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        switch (name) {
            
            case "song":
                if (!/^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,20}$/.test(value)) {
                    // 특수기호 타이핑 확인
                    errorMessage = "노래에는 특수 기호를 사용할 수 없고 20자리 이내로 작성해주세요";
                }else {
                    setIsCommentVisible(true);
                }
                break;
            case "comment":
                if (value.length <= 5) { // 'comment' 필드가 최대 5글자까지만 입력되도록 제한
                    setUser((prevUser) => ({ ...prevUser, comment: value }));
                    setIsCommentVisible(true); // 'comment' 필드가 표시되도록 설정
                    if (value.length === 5) { // 'comment' 필드가 정확히 5글자일 때
                        setIsFiveChars(true); // 다섯 글자가 입력되었음을 설정
                    } else {
                        setIsFiveChars(false); // 다섯 글자가 입력되지 않았음을 설정
                    }
                }
                
                break;
            case "age":
                setUser((prevUser) => ({ ...prevUser, age: parseInt(value, 10) || "" }));
                
                break;
            case "admissionYear":
                setUser((prevUser) => ({ 
                    ...prevUser, 
                    admissionYear: value !== "" ? parseInt(value, 10) : "" 
                }));
                break;
            case "gender":
                if (value === "MALE" || value === "FEMALE") {
                    setUser((prevUser) => ({ ...prevUser, gender: value }));
                    setIsGenderSelected(true);
                } else {
                    errorMessage = "성별은 MALE 또는 FEMALE로 선택해야 합니다.";
                }
                break;
            default:
                break;
        }

        if (errorMessage) {
            alert(errorMessage);
        } else {
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        }
    };
    // const handleContactVerified = () => {
    //     setIsContactVerified(true);
    // };
    const fieldLabels = {
        major: "전공",
        age: "나이",
        mbti: "MBTI",
        gender: "성별",
        contactFrequency: "연락 빈도",
        hobby: "취미",
        song: "좋아하는 노래",
        comment: "소개할 다섯글자",
        admissionYear: "학번"
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();  
        }
        // 입력값 유효성 검사
        const requiredFields = ['major', 'age', 'mbti', 'gender', 'contactFrequency', 'hobby', 'song', 'comment', 'admissionYear'];
        for (let field of requiredFields) {
            if (!user[field] || (Array.isArray(user[field]) && user[field].length === 0)) {
                alert(`${fieldLabels[field]} 빈칸을 채워주세요`);
                return;
            }
    }
        // 나이를 정수형으로 변환
        

        // POST 요청에 필요한 데이터 구성
        const postData = {
            university:user.university,
            contactId:user.contact_id,
            major: user.major,
            age: user.age,
            mbti: user.mbti,
            gender: user.gender,
            contactFrequency: user.contactFrequency,
            hobby: user.hobby,
            song: user.song,
            comment: user.comment,
            admissionYear: user.admissionYear,
        };
        try {
            
            
            // 쿠키에서 ACCESSTOKEN 가져오기
            const accessToken = Cookies.get('Authorization');
            
            const response = await axios.post("http://backend.comatching.site:8080/auth/social/api/user/info", postData, {
                
                headers: {
                    Authorization: `Bearer ${accessToken}`  // ACCESSTOKEN을 Authorization 헤더에 추가
                }
            });
            if (response.data.status === 200) {
                // 응답 헤더에서 토큰 추출
                const newAccessToken = response.headers['authorization'];
                const refreshToken = response.headers['refresh-token'];
                
                

                if (newAccessToken) {
                    // "Bearer " (7글자)를 제거
                    const tokenWithoutBearer = newAccessToken.slice(7);
                
                    // 쿠키에 저장
                    Cookies.set('Authorization', tokenWithoutBearer, { path: '/' });
                }
                
        
                if (refreshToken) {
                    Cookies.set('RefreshToken', refreshToken, { path: '/' });
                }
                alert("가입이 완료되었습니다.");
                navigate("/");
            } else {
                alert("가입 실패");
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };


    const isMajorSelectorComplete = checkMethod.school && checkMethod.department && checkMethod.major;
    const isAgeInputComplete = user.age;

    const progress = isFiveChars ? 100 : isCommentVisible ? 90 : isSongInputVisible ? 80 : isMajorSelectorComplete ? (isAgeInputComplete ? 60 : 45) : 30;

    useEffect(() => {
        checkAllFieldsSelected(); // Initial check on load
    }, [checkMethod, user.age, user.admissionYear, user.mbti, user.contactFrequency]);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const handleAgeClick = (value) => {
        setUser((prev) => ({
            ...prev,
            contactFrequency: value,
        }));
        checkAllFieldsSelected();
    };
    const checkAllFieldsSelected = () => {
        const isAllSelected =
            checkMethod.university &&
            checkMethod.department &&
            checkMethod.major &&
            user.age &&
            user.admissionYear &&
            user.mbti &&
            user.contactFrequency;

        if (isAllSelected) {
            setIsGenderSelectable(true);
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div className="container">
            <Background />
            <HeaderMain />
            <div className="info-card">
                <div className="select-hobby-topic">학교를 선택해 주세요.</div>
                <div className="select-hobby-text">
                    커플이 되기까지 단 한걸음!
                </div>
                <ProgressBar progress={progress} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-inner-content">
                    <MajorSelector
                        user={user}
                        setUser={setUser}
                        checkMethod={checkMethod}
                        setCheckMethod={setCheckMethod}
                    />
                    <AgeInputInput value={user.age} onChange={handleChange} />
                    <AdmissionYearInput value={user.admissionYear} onChange={handleChange} />
                    <h3>MBTI</h3>
                    <MBTISection
                        user={user.mbti}
                        onClick={handleMBTISelection}
                        name="form-MBTIButton"
                    />
                    <div>
                    <h3>연락빈도</h3>
                    <div className="match-select-button">
                        <button
                            type="button"
                            className={`form-AgeMaker ${
                                user.contactFrequency === "FREQUENT" ? "selected" : ""
                            }`}
                            value={"FREQUENT"}
                            onClick={() => handleAgeClick("FREQUENT")}
                        >
                            자주
                        </button>
                        <button
                            type="button"
                            className={`form-AgeMaker ${
                                user.contactFrequency === "NORMAL" ? "selected" : ""
                            }`}
                            value={"NORMAL"}
                            onClick={() => handleAgeClick("NORMAL")}
                        >
                            보통
                        </button>
                        <button
                            type="button"
                            className={`form-AgeMaker ${
                                user.contactFrequency === "NOT_FREQUENT" ? "selected" : ""
                            }`}
                            value={"NOT_FREQUENT"}
                            onClick={() => handleAgeClick("NOT_FREQUENT")}
                        >
                            가끔
                        </button>
                    </div>
                    </div>
                    
                    
                    {isGenderSelectable && (
                        <GenderSelect
                            user={user}
                            setUser={setUser}
                            onChange={handleChange}
                            setIsGenderSelected={setIsGenderSelected}
                        />
                    )}
                    {isGenderSelected && (
                        <ContactMethod
                            checkMethod={checkMethod}
                            setCheckMethod={setCheckMethod}
                            setIsContactVerified={setIsContactVerified}
                            user={user}
                            setUser={setUser}
                            handleChange={handleChange}
                        />
                    )}
                    {isContactVerified && (
                        <div>
                            <label>
                                <h3>좋아하는 노래</h3>
                                <div className="music">
                                    <MyInput
                                        name="song"
                                        value={user.song}
                                        onChange={handleChange}
                                        placeholder="Young Man"
                                        className="song-input"
                                    />
                                </div>
                            </label>
                        </div>
                    )}
                    {isCommentVisible && (
                        <div>
                            <label>
                                <h3>나를 소개할 다섯글자</h3>
                                <div className="music">
                                    <MyInput
                                        name="comment"
                                        value={user.comment}
                                        onChange={handleChange}
                                        placeholder="😊😊😊😊😊"
                                        className="comment-input"
                                        maxLength={5}
                                    />
                                </div>
                            </label>
                        </div>
                    )}
                    
                    {isFiveChars && (
                        <button
                            className="start-button"
                            type="button"
                            onClick={openModal} // Open modal on button click
                        >
                            코매칭 시작하기
                        </button>
                    )}
                    
                </div>
            </form>
            <TermsAgreementModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                handleSubmit={handleSubmit}
                registerCheck={registerCheck}
                setRegisterCheck={setRegisterCheck}
            />
        </div>
    );
}

export default Userinfo;
