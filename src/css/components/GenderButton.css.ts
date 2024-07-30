import { style } from '@vanilla-extract/css';

export const genderButton = style({
  width: '100%',
  height: '54px',
  margin: '0px 5px',
  borderRadius: '40px',
  backgroundColor: '#ff775e',
  border: 'none',
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: 700,
  fontSize: '20px',
  color: '#ffffff',
  boxShadow: `
    inset 2px 2px 10px rgba(255, 119, 94, 0.5),
    inset 0px 4px 10px rgba(0, 0, 0, 0.15),
    inset 4px 4px 15px rgba(0, 0, 0, 0.2)
  `,
});

export const inactive = style({
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  fontFamily: '"Pretendard", sans-serif',
  fontWeight: 'bold',
  fontSize: '20px',
  color: '#a5a5a5',
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)',
});
