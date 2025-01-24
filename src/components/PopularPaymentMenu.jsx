import React from 'react';
import ChargeMenuComponent from './ChargeMenuComponent';
import P from '../css/components/PopularPaymentMenuStyle'
const PopularPaymentMenu = () => {
    return (
        <P.Container>
            <P.PopularText>인기</P.PopularText>
            <ChargeMenuComponent type={`5,000`}/>
            <ChargeMenuComponent type={`10,000`}/>
        </P.Container>
    );
};

export default PopularPaymentMenu;