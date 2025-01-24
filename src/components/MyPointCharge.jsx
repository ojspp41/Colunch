import React from 'react';
import M from '../css/components/MyPointChargeStyle';
import PopularPaymentMenu from './PopularPaymentMenu';
const MyPointCharge = () => {
    return (
        <M.Container>
            <img src='..\..\public\assets\MainPayment\coin.svg'/>
            <div style={{display:'flex',flexDirection:'column', gap:'4px',alignItems:'flex-start'}}>
                <M.HoldPoint>보유 포인트</M.HoldPoint>
                <M.MyHoldPoint>10000P</M.MyHoldPoint>
            </div>
            <M.MyChargeListText>충전 내역 &gt;</M.MyChargeListText>
        </M.Container>
    );
};

export default MyPointCharge;