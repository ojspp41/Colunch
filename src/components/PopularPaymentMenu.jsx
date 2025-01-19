import React from 'react';
import ChargeMenuComponent from './ChargeMenuComponent';
import P from '../css/components/PopularPaymentMenuStyle'
const PopularPaymentMenu = ({openSecondModal}) => {
    return (
        <P.Container>
            <P.PopularText>인기</P.PopularText>
            <ChargeMenuComponent type={`5,000`} openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`10,000`} openSecondModal={openSecondModal}/>
        </P.Container>
    );
};

export default PopularPaymentMenu;