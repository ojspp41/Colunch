import { style } from '@vanilla-extract/css';

export const genderButton = style({
  width: '80%',
  height: '40px',
  margin: '0px 5px',
  marginBottom: ' 10px',
  borderRadius: '40px',
  background: 'linear-gradient(45deg, #F8D1E0 0%, #FFFFFF 75%)', // 기존 색상보다 더 연한 핑크
  color: "#F57DB2",
  border: "1px solid #F57DB2",
  opacity: '0.5',
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: 700,
  fontSize: '18px',
  boxShadow: `
    inset 2px 2px 10px rgba(255, 119, 94, 0.5)
  `,
});

export const inactive = style({
  background: '#ffffff',
  border: '1px solid #e0e0e0',
  fontFamily: '"Pretendard", sans-serif',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#a5a5a5',
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)',
});
