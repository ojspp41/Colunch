import { style, keyframes } from '@vanilla-extract/css';

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
    transition: 'transform 0.3s ease',
});

export const tutorialImage = style({
    width: '250px',
    height: '250px',
    backgroundColor: '#f7f7f7',
    borderRadius: '50%',
    margin: '20px 0',
});

const slideEnterKeyframes = keyframes({
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0)' },
});

const slideExitKeyframes = keyframes({
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' },
});

export const slideEnter = style({
    animation: `${slideEnterKeyframes} 0.7s forwards`,
});

export const slideExit = style({
    animation: `${slideExitKeyframes} 0.7s forwards`,
});
