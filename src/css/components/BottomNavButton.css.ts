import { style } from '@vanilla-extract/css';

export const bottomNavButton = style({
  textAlign: 'center',
  width: 'calc(50% - 8px)',
  height: '70px',
  borderRadius: '24px',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(12px)',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
  fontFamily: '"Pretendard", sans-serif',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#000000',
});

export const img = style({
  transform: 'scale(0.8)',
});
