import { style } from '@vanilla-extract/css';

export const adminRequestListElement = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const adminRequestListContainer = style({
  width: '90%',
  border: '1px solid #000000',
  backgroundColor: '#ffffff',
  margin: '10px auto',
});

export const adminRequestListItem = style({
  display: 'flex',
  alignItems: 'center',
  margin: '16px 25px 0 43px',
});

export const adminRequestListElementMargin = style({
  margin: '8px 15px 0 15px',
});

export const adminRequestListItemImg = style({
  width: '48px',
  height: '48px',
});

export const adminRequestListItemInput = style({
  width: '100px',
  height: '48px',
  textAlign: 'center',
  justifyContent: 'center',
  padding: '0',
  marginLeft: '15px',
  marginRight: '73px',
});

export const adminRequestListElementUserID = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#828282',
});

export const adminRequestListElementUserIDID = style({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000000',
});

export const adminRequestListItemPickmeButton = style({
  width: '36px',
  height: '36px',
  borderRadius: '100px',
  fontSize: '30px',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
});

export const adminRequestListItemPickmeValue = style({
  width: '55px',
  height: '47px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

export const adminRequestListItemSubmitButton = style({
  marginLeft: '27px',
  backgroundColor: '#ff775e',
});

export const adminRequestListElementResultPoint = style({
  color: 'red',
  fontSize: '24px',
  fontWeight: '900',
});
