import React, { useState,useEffect } from "react";
import axios from "../axiosConfig";
import { validateForm } from "../myfunction/formValidation";
import { useRecoilState } from "recoil";
import { userState, selectedMBTIState } from "../Atoms";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/MyInput";
import HeaderMain from "../components/HeaderMain";
import MajorSelector from "../components/MajorSelector";

import "../css/pages/User_info.css";
import AgeInputInput from "../components/AgeInput";
import ContactMethod from "../components/ContactMethod";
import GenderSelect from "../components/GenderSelect";
import MBTISection from "../components/MBTISection";
import hobbyIcons from "../data/hobbyIcons";
import Agreement from "../components/Agreement";
import Background from "../components/Background";
import ProgressBar from "../components/Progressbar";
import Modal from "react-modal"; // Import react-modal
import TermsAgreementModal from "../components/TermsAgreementModal"; // Import the modal component
Modal.setAppElement("#root");

function Userinfo() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState); // 유저 상태 관리
    const [registerCheck, setRegisterCheck] = useState({
        terms1: false,
        terms2: false,
        terms3: false,
        terms4: false,
    });
    const [checkMethod, setCheckMethod] = useState({
        school: "",
        department: "",
        major: "",
        contactVerified: false,
    });

    const [isMajorSelectorVisible, setIsMajorSelectorVisible] = useState(false);
    const [isAgeInputVisible, setIsAgeInputVisible] = useState(false);
    const [isContactVerified, setIsContactVerified] = useState(false);
    const [isSongInputVisible, setIsSongInputVisible] = useState(false);
    const [isCommentVisible, setIsCommentVisible] = useState(false);
    const [isFiveChars, setIsFiveChars] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 입력값 유효성 검사
        if (!validateForm(user, registerCheck)) {
            return;
        }

        // 나이를 정수형으로 변환
        const ageAsInt = parseInt(user.age, 10);

        // POST 요청에 필요한 데이터 구성
        const postData = {
            major: user.major,
            age: ageAsInt,
            contact_id: user.contact_id,
            gender: user.gender,
            contact_frequency: user.contact_frequency,
            mbti: user.mbti,
            hobby: user.hobby,
            song: user.song,
            comment: user.comment,
        };
        try {
            const response = await axios.post("/account/register-detail", postData);
            if (response.data.status === 200) {
                const token = response.data.data.update_token;
                localStorage.setItem("token", token);

                document.cookie.split(";").forEach((cookie) => {
                    const [name] = cookie.split("=");
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                });

                document.cookie = `token=${token};path=/;`;
                alert("가입이 완료되었습니다.");
                navigate("/");
            } else {
                alert("가입 실패");
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        switch (name) {
            case "contact_id":
                setUser((prevUser) => ({ ...prevUser, contact_id_Verified: true })); // 타이핑시 연락처 검사 다시하도록
                setIsContactVerified(true);
                break;
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
                setUser((prevUser) => ({ ...prevUser, age: value }));
                setIsAgeInputVisible(true);
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

    const isMajorSelectorComplete = checkMethod.school && checkMethod.department && checkMethod.major;
    const isAgeInputComplete = user.age;

    const progress = isFiveChars ? 100 : isCommentVisible ? 90 : isSongInputVisible ? 80 : isMajorSelectorComplete ? (isAgeInputComplete ? 60 : 35) : 0;

    useEffect(() => {
        if (isMajorSelectorComplete) {
            setIsMajorSelectorVisible(true);
        }
        if (isAgeInputComplete) {
            setIsAgeInputVisible(true);
        }
    }, [isMajorSelectorComplete, isAgeInputComplete]);
    const openModal = () => {
        setModalIsOpen(true);
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
                    본인의 취미를 알려주세요. (1-5개)
                </div>
                <ProgressBar progress={progress} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-inner-content">
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
                
                    {isAgeInputVisible && (
                        <ContactMethod
                            checkMethod={checkMethod}
                            setCheckMethod={setCheckMethod}
                            user={user}
                            setUser={setUser}
                            handleChange={handleChange}
                            // onContactVerified={handleContactVerified}
                        />
                    )}
                    {isMajorSelectorVisible && (
                        <AgeInputInput value={user.age} onChange={handleChange} />
                    )}
                    <MajorSelector
                        user={user}
                        setUser={setUser}
                        checkMethod={checkMethod}
                        setCheckMethod={setCheckMethod}
                    />
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
