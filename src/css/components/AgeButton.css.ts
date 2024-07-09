import { style } from '@vanilla-extract/css';

export const ageButton = style({
  width: '25%',
  height: '54px',
  fontSize: '22px',
  margin: '0px 5px',
  borderRadius: '40px',
  backgroundColor: '#ffffff',
  color: '#a5a5a5',
  border: '2px solid #e0e0e0',
  boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)', // Drop Shadow
});

export const active = style({
  fontFamily: '"Pretendard-SemiBold", Helvetica',
  fontWeight: '700',
  backgroundColor: '#ff775e',
  color: '#ffffff',
  boxShadow: `inset 2px 2px 10px rgba(255, 119, 94, 0.5), 
              inset 0px 4px 10px rgba(0, 0, 0, 0.15), 
              inset 4px 4px 15px rgba(0, 0, 0, 0.2)` // Inner shadows
});
