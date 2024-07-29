import { style } from '@vanilla-extract/css';

export const progressBar = style({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    height: '8px',
    position: 'relative',
    width: '100%',
    marginBottom: '0px',
    selectors: {
        '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: '8px',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        },
    },
});

export const progressBarFill = style({
    background: 'linear-gradient(90deg, #FF775E 0%, #FF4D61 47%, #E83ABC 100%)',
    borderRadius: '8px',
    height: '100%',
    transition: 'width 0.2s ease-in-out',
});
