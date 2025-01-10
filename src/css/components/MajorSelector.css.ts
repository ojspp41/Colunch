import { style } from '@vanilla-extract/css';


export const schoolRow = style({
  display: 'flex',
  marginBottom: '20px',
});
export const departmentRow = style({
  display: 'flex',
  gap: '22px',
  marginBottom: '15px',
});

export const school = style({
  width: '100%',
});

export const depart = style({
  width: 'calc(33%)',
  marginRight: '12px',
});

export const major = style({
  width: 'calc(67%)',
});

export const majorSelectorElementSelect = style({
  display: 'block',
  width: '100%',
  height: '35px',
  background: 'none',
  border: 'none', // 기존 테두리 제거
  borderBottom: '3px rgb(223, 223, 223) solid', // 아래에만 테두리 적용
  borderRadius: '0', // 둥근 모서리 제거
  padding: '0 12px',
  fontSize: '18px', // 글자 크기
  fontWeight: '600', // 세미볼드
  outline: 'none', // 클릭 시 기본 아웃라인 제거
});

