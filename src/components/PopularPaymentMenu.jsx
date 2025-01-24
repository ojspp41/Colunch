
import ChargeMenuComponent from './ChargeMenuComponent';
import P from '../css/components/PopularPaymentMenuStyle'
const PopularPaymentMenu = ({openSecondModal,setPointPrice, setProductName, setDiscount}) => {
    return (
        <P.Container>
            <P.PopularText>인기</P.PopularText>
            <ChargeMenuComponent type={`5,000`} openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName}setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`10,000`} openSecondModal={openSecondModal}  setPointPrice={setPointPrice} setProductName={setProductName}setDiscount={setDiscount}/>
        </P.Container>
    );
};

export default PopularPaymentMenu;