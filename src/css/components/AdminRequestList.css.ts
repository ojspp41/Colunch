// AdminRequestList.css.ts
import { style } from '@vanilla-extract/css';

export const adminRequestList = style({
  width: '100%',
});

export const adminRequestListTitle = style({
  fontSize: '36px',
  fontWeight: 'bold',
  textAlign: 'left',
  margin: '28px 0 0 26px',
});

export const adminRequestListText = style({
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'left',
  margin: '8px 0 0 26px',
  paddingBottom: '20px',
});

export const adminRequestListBox = style({
  maxHeight: '500px', // 요청 목록의 최대 높이를 설정합니다.
  overflowY: 'auto', // 세로 스크롤바가 필요할 때만 스크롤바를 표시합니다.
});