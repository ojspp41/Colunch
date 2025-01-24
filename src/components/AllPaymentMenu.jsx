import React from 'react';
import P from '../css/components/AllPaymentMenuStyle'
import ChargeMenuComponent from './ChargeMenuComponent';
const AllPaymentMenu = () => {
    return (
        <P.Container>
            <P.PopularText>전체</P.PopularText>
            <ChargeMenuComponent type={`1,000`}/>
            <ChargeMenuComponent type={`2,000`}/>
            <ChargeMenuComponent type={`3,000`}/>
            <ChargeMenuComponent type={`4,000`}/>
            <ChargeMenuComponent type={`5,000`}/>
            <ChargeMenuComponent type={`10,000`}/>
            <ChargeMenuComponent type={`20,000`}/>
            <ChargeMenuComponent type={`30,000`}/>
        </P.Container>
    );
};

export default AllPaymentMenu;