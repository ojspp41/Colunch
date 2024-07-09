import { style } from '@vanilla-extract/css';

export const ageMaker = style({
  width: '30%',
  height: '54px',
  borderRadius: '40px',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  margin: '27px 0 43px 0',
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)',
  fontSize: '20px',
  fontFamily: '"Pretendard", sans-serif',
  fontWeight: 'bold',
  color: '#a5a5a5',
});

export const selected = style({
  width: '30%',
  height: '54px',
  borderRadius: '40px',
  backgroundColor: '#ff775e',
  border: 'none',
  margin: '27px 0 43px 0',
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: 'bold',
  fontSize: '20px',
  color: '#ffffff',
  boxShadow: `
    inset 2px 2px 10px rgba(255, 119, 94, 0.5),
    inset 0px 4px 10px rgba(0, 0, 0, 0.15),
    inset 4px 4px 15px rgba(0, 0, 0, 0.2)
  `,
});
