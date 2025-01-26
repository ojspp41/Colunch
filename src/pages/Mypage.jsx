import React from 'react';
import Background from '../components/Background';
import '../css/pages/mypage.css';
import SupportSection from '../components/Mypage/SupportSection.jsx'
const Mypage = () => {
  return (
    <div className='mypage-container'>
      <Background />
      
      <div className='mypage-greeting'>
        <p>겨울이오길님, <br />반갑습니다.</p>
      </div>
      
      <button className='mypage-profile-btn'>프로필 수정</button>
      
      <div className='mypage-point-container'>
        <div className="mypage-flex">
            <img className='mypage-point-icon' src='/assets/MainPayment/coin.svg' alt='포인트 아이콘' />
            <div className='mypage-point-info'>
                <p className='mypage-point-label'>보유 포인트</p>
                <p className='mypage-point-value'>10,000 P</p>
            </div>
            <button className='mypage-recharge-btn'>충전하기</button>
            
        </div>
        <div className='mypage-history-btns'>
            <button className='mypage-history-btn'>충전내역</button>
            <button className='mypage-history-btn'>사용내역</button>
        </div>
      </div>
      
      <SupportSection />
    </div>
  );
};

export default Mypage;
