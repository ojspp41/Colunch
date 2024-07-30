import { style } from '@vanilla-extract/css';

export const formTitle = style({
  fontWeight: 'bold',
  marginBottom: '24px',
  letterSpacing: '0',
  textAlign: 'left',
  lineHeight: 'normal',
});

export const formTitleFirstText = style({
  color: '#000000',
  fontFamily: '"Pretendard-Bold", Helvetica',
  fontSize: '36px',
  fontWeight: 'bold',
  position: 'relative',
});

export const formTitleSecondText = style({
  color: '#858585',
  fontFamily: '"Pretendard-Medium", Helvetica',
  fontSize: '16px',
  fontWeight: 500,
  marginTop: '15px',
});
