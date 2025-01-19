import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import P from '../css/components/MainPaymentModalStyle';
import PopularPaymentMenu from './PopularPaymentMenu';
import 'aos/dist/aos.css'; // AOS 스타일 시트 불러오기
import MyPointCharge from './MyPointCharge';
import ChargeMenuComponent from './ChargeMenuComponent';
import AllPaymentMenu from './AllPaymentMenu';
import PointInformationFooter from './PointInformationFooter';
import PaymentSecondModal from './PaymentSecondModal';

const MainPaymentModal = () => {
  const [isOpen, setIsOpen] = useState(false); // 첫 번째 모달 열기/닫기 상태
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false); // 두 번째 모달 열기/닫기 상태
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  // 두 번째 모달 열기
  const openSecondModal = () => setIsSecondModalOpen(true);
  const closeSecondModal = () => setIsSecondModalOpen(false);

  useEffect(() => {
    AOS.init({
      duration: 500, // 애니메이션 지속 시간 설정
      easing: 'ease-in-quad', // 애니메이션 이징 함수 설정
      once: true, // 한번만 애니메이션 실행
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      AOS.refresh(); // 모달이 열릴 때마다 AOS 애니메이션을 새로 고침
    }
  }, [isOpen]);

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      <P.ModalWrapper show={isOpen} data-aos="fade-up">
        <P.ModalContent onClick={(e) => e.stopPropagation()}>
          <P.Header>
            <P.ChargePointText>포인트 충전</P.ChargePointText>
            <P.CloseButton onClick={closeModal}>닫기</P.CloseButton>
          </P.Header>
          <MyPointCharge />
          <PopularPaymentMenu openSecondModal={openSecondModal} />
          <AllPaymentMenu openSecondModal={openSecondModal} />
          <PointInformationFooter />
        </P.ModalContent>
      </P.ModalWrapper>

      {/* 두 번째 모달 */}
      <PaymentSecondModal isOpen={isSecondModalOpen} closeModal={closeSecondModal} />
    </div>
  );
};

export default MainPaymentModal;
