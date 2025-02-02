import styled from "styled-components";

const P = {};


P.ModalWrapper = styled.div`
  z-index: 999; /* 다른 콘텐츠 위에 표시 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정확히 중앙으로 이동 */
  background-color: white;
  border-radius: 16px;
  width: calc(100% - 46px);
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Pretendard", sans-serif;
`
export default P;