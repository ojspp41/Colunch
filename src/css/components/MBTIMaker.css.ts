// mbtiMaker.css.ts
import { style } from "@vanilla-extract/css";

export const mbtiMaker = style({
  textAlign: "center",
  background: "rgba(255, 255, 255, 0.8)", // 기존 배경
  width: "85%",
  display: "inline-block",
  borderRadius: "16px",
  padding: "24px 20px 15px 20px",
  backdropFilter: "blur(100px)", // 배경 블러
  boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)", // 그림자
  border: "1px solid rgba(255, 255, 255, 0.8)", // 테두리
  backgroundImage:
    "linear-gradient(rgba(255, 255, 255, 0.8) 30%, transparent 70%)", // 그라디언트
});

export const mbtiMakerText = style({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
  textAlign: "left",
  marginLeft: "5px",
});

export const mbtiMakerChooseButton = style({
  display: "flex",
  alignItems: "center",
  background: "#ffffff",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "32px",
  marginBottom: "12px",
  width: "100%",
  fontFamily: '"Pretendard", sans-serif',
  color: "#000000",
  fontSize: "18px",
  fontWeight: "bold",
});

export const selected = style({
  backgroundColor: "#ff775e", // 기존 배경색
  border: "1px solid rgba(255, 119, 94, 0.8)", // 업데이트된 테두리 색상
  color: "#ffffff",
  boxShadow: `inset 2px 2px 10px rgba(255, 119, 94, 0.5),
              inset 0px 4px 10px rgba(0, 0, 0, 0.15),
              inset 4px 4px 15px rgba(0, 0, 0, 0.2)`, // 내부 그림자
});

export const mbtiMakerButtonTitle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#000000",
  color: "#ffffff",
  width: "36px",
  height: "36px",
  borderRadius: "100px",
  marginRight: "15px",
});

export const mbtiMakerSubmitButton = style({
  backgroundColor: "#ff775e",
  borderRadius: "36px",
  height: "40px",
  width: "40%",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  marginLeft: "60%",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
});
