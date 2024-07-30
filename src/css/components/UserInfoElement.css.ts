import { style } from '@vanilla-extract/css';

export const userInfoElementTopic = style({
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#777777',
  textAlign: 'left',
  marginTop: '17px',
});

export const userInfoElementText = style({
  minWidth: '20px',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#000000',
  textAlign: 'left',
  marginTop: '7px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const userInfoElementItems = style({
  display: 'flex',
  flexWrap: 'wrap',
});

export const userInfoElementItem = style({
  whiteSpace: 'nowrap',
  marginRight: '4px', // Adjust as needed for spacing between items
});
