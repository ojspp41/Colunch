import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  width: '95%',
  paddingTop: '27px',
  justifyContent: 'space-between',
  alignItems: 'left',
  margin: 'auto',
});

export const logoImg = style({
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
});
