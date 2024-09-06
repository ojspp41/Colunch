import React, { useState } from "react";
import axios from "axios";
import Background from "../components/Background.jsx";
import HeaderBack from "../components/HeaderBack.jsx";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { MatchResultState, MatchPickState } from "../Atoms";
import "../css/pages/Matchresult.css";
import { useNavigate } from "react-router-dom";
import hobbyIcons from "../data/hobbyIcons";
import Cookies from "js-cookie";
import Loading from "./Loading.jsx";
import instance from "../axiosConfig"; // axios 인스턴스 불러오기
function Matchresult() {
  const navigate = useNavigate();
  const [MatchState, setMatchState] = useRecoilState(MatchPickState);
  const [MatchResult, setMatchResult] = useRecoilState(MatchResultState);
  const [loading, setLoading] = useState(false);
  // 같은 조건으로 다시 매칭하기 핸들러
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await instance.post("/api/match/match-request", MatchState.formData);
      
      if (response.data.status === 200) {
        await setMatchResult(response.data.data);
        setLoading(false);
      } else {
        throw new Error("Unexpected response code or status");
      }
    } catch (error) {
      console.error("Error during match request:", error);
    }
  };

  // 취미를 아이콘과 매핑하는 함수
  const mapHobbiesWithIcons = (hobbyList) => {
    return hobbyList.map((hobbyName) => {
      const matchedIcon = hobbyIcons.find((icon) => icon.label === hobbyName);
      return { name: hobbyName, image: matchedIcon?.image || "" };
    });
  };

  const resultData = {
    ...MatchResult,
    hobby: mapHobbiesWithIcons(MatchResult.hobby),
  };

  // 다시뽑기 버튼 핸들러
  const handleRematch = () => {
    navigate("/matching");
  };

  const handleSendText = () => {
    alert("아직 준비중인 기능이에요!");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <Background />
            <HeaderBack />

            <div className="circle-icon">💟</div>

            {resultData.generatedCode === 2002 ? (
              <div className="matchresult-content">
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "24px" }}>
                    이성이 데이터에 한명도 없습니다
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="matchresult-content">
                  <div className="MatchResult-Container">
                    <div className="MatchResult-Major">
                      <div className="MatchResult-Topic-Top">전공</div>
                      <div className="MatchResult-Text">{resultData.major}</div>
                    </div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Age">
                      <div className="MatchResult-Topic">나이</div>
                      <div className="MatchResult-Text">{resultData.age}</div>
                    </div>
                    <div className="MatchResult-MBTI">
                      <div className="MatchResult-Topic">MBTI</div>
                      <div className="MatchResult-Text">{resultData.mbti}</div>
                    </div>
                    <div className="MatchResult-Frequency">
                      <div className="MatchResult-Topic">연락빈도</div>
                      <div className="MatchResult-Text">
                        {resultData.contactFrequency}
                      </div>
                    </div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Hobby">
                      <div className="MatchResult-Topic">취미</div>
                      <div className="MatchResult-Text-Hobby">
                        {resultData.hobby.map((hobby, index) => (
                          <div key={index} className="hobby-box">
                            <img
                              src={hobby.image}
                              alt={hobby.name}
                              className="hobby-icon"
                            />
                            <span className="hobby-text">{hobby.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="MatchResult-Song">
                    <div className="MatchResult-Topic">좋아하는 노래</div>
                    <div className="MatchResult-Text">{resultData.song}</div>
                  </div>

                  <div className="MatchResult-Container">
                    <div className="MatchResult-Contact">
                      <div className="MatchResult-Topic">
                        {resultData.socialId[0] === "@" ? "instagram" : "kakao"}
                      </div>
                      <div className="MatchResult-Text MatchResult-Text-Contact">
                        {resultData.socialId}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="MatchResult-button-container">
                  <button className="Retry-same-button" onClick={handleSubmit}>
                    <div className="Retry-same-button-point">
                      <img
                        src={`${
                          import.meta.env.VITE_PUBLIC_URL
                        }../../assets/point.svg`}
                        alt="cost"
                      />
                      1000P
                    </div>
                    같은 조건으로 한번 더 뽑기
                  </button>
                </div>
                <div className="MatchResult-button-container">
                  <button className="Retry-button" onClick={handleRematch}>
                    다시뽑기
                  </button>
                  <button className="SendText-button" onClick={handleSendText}>
                    쪽지 보내기
                  </button>
                </div>
              </div>
            )}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default Matchresult;
