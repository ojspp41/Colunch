import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import P from '../css/components/MainPaymentModalStyle';
import PopularPaymentMenu from './PopularPaymentMenu';
import 'aos/dist/aos.css'; // AOS 스타일 시트 불러오기
import MyPointCharge from './MyPointCharge';
import ChargeMenuComponent from './ChargeMenuComponent';
import AllPaymentMenu from './AllPaymentMenu';
import PointInformationFooter from './PointInformationFooter';
const MainPaymentModal = () => {
  const [isOpen, setIsOpen] = useState(false); // 모달 열기/닫기 상태
  const openModal = () => {
    setIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
  };
    
        
  useEffect(() => {
    AOS.init({
      duration: 500, // 애니메이션 지속 시간 설정
      easing: 'ease-in-quad', // 애니메이션 이징 함수 설정
      once: true, // 한번만 애니메이션 실행
    });
  }, []); // 빈 배열로 의존성 설정, 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    // 모달이 열릴 때마다 AOS 애니메이션을 새로 고침
    if (isOpen) {
      AOS.refresh(); // 모달이 열릴 때마다 AOS를 새로 고침
    }
  }, [isOpen]); // `isOpen` 상태가 변경될 때마다 실행
      return (
        <div>
          <button onClick={openModal}>모달 열기</button>
          {/* 모달 오버레이와 내용 */}
          <P.ModalWrapper show={isOpen}  data-aos="fade-up">
            <P.ModalContent onClick={(e) => e.stopPropagation() } >
              <P.Header>
                <P.ChargePointText>포인트 충전</P.ChargePointText>
                <P.CloseButton onClick={closeModal}>닫기</P.CloseButton>
              </P.Header>
              <MyPointCharge/>
              <PopularPaymentMenu/>
              <AllPaymentMenu/>
              <PointInformationFooter/>
            </P.ModalContent>
          </P.ModalWrapper>
        </div>
      );
};

export default MainPaymentModal;    