import React from "react";
import Background from "../components/Background.jsx";
import HeaderPoint from "../components/Headerpoint.jsx";
import Footer from "../components/Footer";
import { useRecoilState } from "recoil";
import { MatchResultState, MatchPickState } from "../Atoms";
import "../css/pages/Matchresult.css";
import { useNavigate } from "react-router-dom";
import hobbyIcons from "../data/hobbyIcons";

function Matchresult() {
  const navigate = useNavigate();
  const [MatchState, setMatchState] = useRecoilState(MatchPickState);
  const [MatchResult, setMatchResult] = useRecoilState(MatchResultState);

  // 목업 데이터
  const mockData = {
    major: "컴퓨터정보공학부",
    age: 25,
    hobby: ["음악감상", "독서", "게임", "스포츠시청"],
    mbti: "INTJ",
    song: "Young Man - 혁오",
    contactFrequency: "적음",
    contactId: ["@", "mock_instagram"],
    generatedCode: 2001,
  };

  // 취미를 아이콘과 매핑하는 함수
  const mapHobbiesWithIcons = (hobbyList) => {
    return hobbyList.map((hobbyName) => {
      const matchedIcon = hobbyIcons.find((icon) => icon.label === hobbyName);
      return { name: hobbyName, image: matchedIcon.image };
    });
  };

  const resultData = {
    ...mockData,
    hobby: mapHobbiesWithIcons(mockData.hobby), // 아이콘과 매핑된 취미 리스트
  };

  // 다시뽑기 버튼 핸들러
  const handleRematch = () => {
    navigate("/match");
  };

  return (
    <div>
      <div className="container">
        <Background />
        <HeaderPoint />

        <div className="circle-icon">💟</div>

        {resultData.generatedCode === 2002 ? (
          <div className="matchresult-content">
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "24px" }}>이성이 데이터에 한명도 없습니다</span>
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
                  <div className="MatchResult-Text">{resultData.contactFrequency}</div>
                </div>
              </div>

              <div className="MatchResult-Container">
                <div className="MatchResult-Hobby">
                  <div className="MatchResult-Topic">취미</div>
                  <div className="MatchResult-Text-Hobby">
                    {resultData.hobby.map((hobby, index) => (
                      <div key={index} className="hobby-box">
                        <img src={hobby.image} alt={hobby.name} className="hobby-icon" />
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
                    {resultData.contactId[0] === "@" ? "instagram" : "kakao"}
                  </div>
                  <div className="MatchResult-Text MatchResult-Text-Contact">
                    {resultData.contactId}
                  </div>
                </div>
              </div>
            </div>
            <div className="MatchResult-button-container">
              <button className="Retry-same-button" onClick={handleRematch}>
                <div className="Retry-same-button-point">
                  <img src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/point.svg`} alt="cost" />
                  1000P
                </div>
                같은 조건으로 한번 더 뽑기
              </button>
            </div>
            <div className="MatchResult-button-container">
              <button className="Retry-button" onClick={handleRematch}>
                다시뽑기
              </button>
              <button className="Retry-button" onClick={handleRematch}>
                쪽지 보내기
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Matchresult;



// import React from "react";
// import Footer from "../components/Footer";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { MatchResultState, MatchPickState } from "../Atoms";
// import "../css/pages/Matchresult.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import hobbyIcons from "../data/hobbyIcons";
// import MatchHeader from "../components/MatchHeader";
// import MemoizedHobbyElement from "../components/HobbyElement";

// function Matchresult() {
//   const navigate = useNavigate();
//   const [MatchState, setMatchState] = useRecoilState(MatchPickState);
//   const [MatchResult, setMatchResult] = useRecoilState(MatchResultState);

//   // 다시뽑기 버튼 핸들러
//   const handleRematch = () => {
//     navigate("/match");
//   };

//   // 같은 조건으로 다시 매칭하기 핸들러
//   const handleSubmit = async () => {
//     // 포인트 확인
//     if (MatchState.balance < MatchState.point) {
//       alert("돈이 부족합니다");
//       return false;
//     }
//     console.log(MatchState.formData);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://catholic-mibal.site/comatching/match",
//         MatchState.formData,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       if (
//         response.data.code[0] === "SEC-001" ||
//         response.data.code[0] === "SEC-002"
//       ) {
//         localStorage.removeItem("token");
//         navigate("/");
//       } else if (response.data.status === 200) {
//         // 다시 결과 값 받아오기
//         setMatchResult({
//           major: response.data.data.major,
//           age: response.data.data.age,
//           hobby: response.data.data.hobby,
//           mbti: response.data.data.mbti,
//           song: response.data.data.song,
//           contactFrequency: response.data.data.contactFrequency,
//           contactId: response.data.data.contactId,
//           word: response.data.data.word,
//         });
//         setMatchState((prev) => ({
//           ...prev,
//           balance: response.data.data.currentPoint,
//         }));
//         navigate("/loading");
//       } else {
//         throw new Error("Unexpected response code or status");
//       }
//     } catch (error) {
//       console.error("Error during match request", error);
//     }
//   };

//   return (
//     <div>
//       <div className="container">
//         <MatchHeader
//           MatchState={MatchState}
//           setMatchState={setMatchState}
//           setMatchPageResult={setMatchResult}
//         />

//         {MatchResult.generatedCode === 2002 ? (
//           <div className="matchresult-content">
//             <div style={{ textAlign: "center" }}>
//               <span style={{ fontSize: "24px" }}>
//                 이성이 데이터에 한명도 없습니다
//               </span>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div className="matchresult-content">
//               <div className="MatchResult-Container">
//                 <div className="MatchResult-Major">
//                   <div className="MatchResult-Topic">| 전공</div>
//                   <div className="MatchResult-Text">{MatchResult.major}</div>
//                 </div>
//                 <div className="MatchResult-Age">
//                   <div className="MatchResult-Topic">| 나이</div>
//                   <div className="MatchResult-Text">{MatchResult.age}</div>
//                 </div>
//               </div>
//               <div className="MatchResult-Container">
//                 <div className="MatchResult-Hobby">
//                   <div className="MatchResult-Topic">| 취미</div>
//                   <div className="MatchResult-Text-Hobby">
//                     {MatchResult.hobby.map((hobbyLabel, index) => {
//                       const hobby = hobbyIcons.find(
//                         (item) => item.label === hobbyLabel
//                       );
//                       return (
//                         <MemoizedHobbyElement
//                           index={index}
//                           hobby={hobby}
//                           className="MatchResult-hobby-element"
//                         />
//                       );
//                     })}
//                   </div>
//                 </div>
//                 <div className="MatchResult-MBTI">
//                   <div className="MatchResult-Topic">| MBTI</div>
//                   <div className="MatchResult-Text">{MatchResult.mbti}</div>
//                 </div>
//               </div>
//               <div className="MatchResult-Song">
//                 <div className="MatchResult-Topic">| 좋아하는 노래</div>
//                 <div className="MatchResult-Text">{MatchResult.song}</div>
//               </div>
//               <div className="MatchResult-Frequency">
//                 <div className="MatchResult-Topic">| 연락빈도</div>
//                 <div className="MatchResult-Text">
//                   {MatchResult.contactFrequency}
//                 </div>
//               </div>

//               <div className="MatchResult-Contact">
//                 <div className="MatchResult-Topic">
//                   {MatchResult.contactId[0] === "@" ? "instagram" : "kakao"}
//                 </div>
//                 <div className="MatchResult-Text MatchResult-Text-Contact">
//                   {MatchResult.contactId}
//                 </div>
//               </div>
//             </div>
//             <div className="MatchResult-button-container">
//               <button className="Retry-button" onClick={handleRematch}>
//                 다시뽑기
//               </button>
//               <button className="Retry-same-button" onClick={handleSubmit}>
//                 <div className="Retry-same-button-point">
//                   <img
//                     src={`${
//                       import.meta.env.VITE_PUBLIC_URL
//                     }../../assets/point.svg`}
//                     alt="cost"
//                   />
//                   {MatchState.point}P
//                 </div>
//                 같은 조건으로 한번 더 뽑기
//               </button>
//             </div>
//           </div>
//         )}
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Matchresult;
