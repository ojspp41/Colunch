import { style } from "@vanilla-extract/css";

export const mbtiSection = style({
  padding: "0px 10px 0px 10px",
});

export const mbtiContainer = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  marginBottom: "0px",
});

export const mbtiButton = style({
  height: "72px", // 버튼의 높이를 늘립니다
  borderRadius: "48px",
  width: "144px",
  fontSize: "32px", // 글자 크기를 키웁니다
  margin: "0px 6px 16px 6px", // 버튼 사이의 마진을 조정합니다
});

export const activeButton = style({
  fontSize: "32px", // 활성화된 버튼의 글자 크기를 키웁니다
});
