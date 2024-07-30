import { style } from "@vanilla-extract/css";

export const mbtiElement = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "25%",
});

export const mbtiButton = style({
  width: "90%",
  height: "54px",
  margin: "0px 6px 10px 6px",
  borderRadius: "30px",
  backgroundColor: "#ffffff",
  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.25)",
  border: "1px solid #e0e0e0",
  fontSize: "20px",
  fontFamily: '"Pretendard", sans-serif',
  fontWeight: "bold",
  color: "#a5a5a5",
});

export const activeButton = style({
  backgroundColor: "#ff775e",
  color: "#ffffff",
  border: "none",
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: "bold",
  fontSize: "20px",
  boxShadow: `inset 2px 2px 10px rgba(255, 119, 94, 0.5),
              inset 0px 4px 10px rgba(0, 0, 0, 0.15),
              inset 4px 4px 15px rgba(0, 0, 0, 0.2)`,
});

export const formMbtiButton = style({
  width: "90%",
  height: "54px",
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: 700,
  fontSize: "20px",
  margin: "0px 6px 10px 6px",
  borderRadius: "30px",
  backgroundColor: "#ffffff",
  color: "#a5a5a5",
  border: "2px solid #e0e0e0",
});

export const formActiveButton = style({
  backgroundColor: "#ff775e",
  color: "#ffffff",
  border: "none",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
});
