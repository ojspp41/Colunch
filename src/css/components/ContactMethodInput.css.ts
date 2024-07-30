import { style } from '@vanilla-extract/css';

export const contactInput = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  whiteSpace: 'nowrap',
  marginTop: '6px',
});

export const inputField = style({
  marginRight: '10px',
  marginLeft: '0px',
  color: '#858585',
  fontFamily: '"Pretendard", Helvetica',
  fontSize: '12px',
  fontWeight: '500',
  display: 'flex',
  border: '1px solid #ccc',
  borderRadius: '15px',
  padding: '8px',
  position: 'relative',
});

export const checkButton = style({
  width: '30%',
  height: '40px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '15px',
  marginLeft: 'auto',
});
