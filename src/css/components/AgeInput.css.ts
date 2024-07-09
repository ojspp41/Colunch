import { style } from '@vanilla-extract/css';

export const age = style({
  color: '#858585',
  fontFamily: '"Pretendard", Helvetica',
  fontSize: '16px',
  fontWeight: 500,
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '15px',
  padding: '8px 0px',
  marginTop: '6px',
  position: 'relative',
});

export const input = style({
  flex: 1,
  border: 'none',
});