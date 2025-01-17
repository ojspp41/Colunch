    import React from 'react';
    import C from '../css/components/ChargeMenuComponentStyle';
    const ChargeMenuComponent = ({type}) => {
        let money = type;
        let discount = 0;
        
        switch(type){
            case '10,000':
                money = '8,000';
                discount= 2000;
                break;
            case '20,000':
                money = '15,000';
                discount = 5000;
                break;
            case '30,000':
                money = '20,000';
                discount = 10000;
                break;
        }
        return (
            <div>
                <C.Container>
                    <C.StyledDiv>{type} 포인트&nbsp;
                    {discount>0? <C.BonusText>{discount}P 보너스!</C.BonusText>:<></>}</C.StyledDiv>
                    <C.StyledButton>{money}원</C.StyledButton>
                </C.Container>
                <hr style={{margin:'0'}}/>
            </div>
        );
    };

    export default ChargeMenuComponent;