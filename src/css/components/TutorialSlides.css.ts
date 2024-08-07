import { style } from '@vanilla-extract/css';

export const tutorialBackdrop = style({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
});

export const tutorialSlide = style({
    width: '80%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: '25px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    });

export const tutorialImage = style({
    width: '250px',
    height: '250px',
    backgroundColor: '#f7f7f7',
    borderRadius: '50%',
    margin: '20px 0',
});