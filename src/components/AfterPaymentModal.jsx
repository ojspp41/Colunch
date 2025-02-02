import React from 'react';
import P from '../css/components/AfterPaymentModalStyle'
// 첫 번째 모달 컴포넌트
const WrongRequestModal = () => {
  return (
    <P.ModalWrapper style={{height:"228px"}}>
      <h2>First Modal</h2>
      <p>This is the first modal.</p>
    </P.ModalWrapper>
  );
};

// 두 번째 모달 컴포넌트
const PaymentSuccessModal = () => {
  return (
    <P.ModalWrapper style={{height:"223px"}}>
      <h2>Second Modal</h2>
      <p>This is the second modal.</p>
    </P.ModalWrapper>
  );
};

// 세 번째 모달 컴포넌트
const PaymentCancelModal = () => {
  return (
    <P.ModalWrapper style={{height:"201px"}}>
      <h2>Third Modal</h2>
      <p>This is the third modal.</p>
    </P.ModalWrapper>
  );
};

// 각각 모달 컴포넌트를 export
export { PaymentCancelModal,PaymentSuccessModal,WrongRequestModal };
