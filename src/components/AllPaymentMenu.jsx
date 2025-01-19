import React from 'react';
import P from '../css/components/AllPaymentMenuStyle'
import ChargeMenuComponent from './ChargeMenuComponent';
const AllPaymentMenu = ({openSecondModal}) => {
    return (
        <P.Container>
            <P.PopularText>전체</P.PopularText>
            <ChargeMenuComponent type={`1,000`} openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`2,000`}openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`3,000`}openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`4,000`}openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`5,000`}openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`10,000`}openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`20,000`}openSecondModal={openSecondModal}/>
            <ChargeMenuComponent type={`30,000`}openSecondModal={openSecondModal}/>
        </P.Container>
    );
};

export default AllPaymentMenu;