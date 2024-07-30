import { style } from '@vanilla-extract/css';

export const majorSelector = style({
  display: 'flex',
  paddingRight: '0px',
});

export const depart = style({
  width: 'calc(33%)',
  marginRight: '22px',
});

export const major = style({
  width: 'calc(67%)',
});

export const majorSelectorElementSelect = style({
  display: 'block',
  width: '100%',
  height: '35px',
  background: 'white',
  border: '1px #eaeaea solid',
  borderRadius: '15px',
  padding: '0 12px',
});
