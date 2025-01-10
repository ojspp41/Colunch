import { style } from '@vanilla-extract/css';

export const age = style({
  color: '#858585',
  fontFamily: '"Pretendard", Helvetica',
  fontSize: '16px',
  fontWeight: 500,
  height: '24px',
  display: 'flex',
  
  alignItems: 'center',// 아래에만 테두리 적용
  padding: '8px 0px',
  marginTop: '6px',
  position: 'relative',
  marginBottom : '24px'
});

export const agetitle = style({
  marginTop:"25px"
});
export const myinput = style({
  flex: 1,
  
  border: 'none', // 기존 테두리 제거
  borderBottom: '3px rgb(223, 223, 223) solid', 
  background: 'none',
  fontSize: '18px', // 글자 크기
  fontWeight: '600', // 세미볼드
});
export const input = style({
  
  background: 'none',
  border: 'none',
});