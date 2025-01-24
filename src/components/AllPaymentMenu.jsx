
import P from '../css/components/AllPaymentMenuStyle'
import ChargeMenuComponent from './ChargeMenuComponent';
const AllPaymentMenu = ({openSecondModal,setPointPrice, setProductName, setDiscount}) => {
    return (
        <P.Container>
            <P.PopularText>전체</P.PopularText>
            <ChargeMenuComponent type={`1,000`} openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`2,000`}openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`3,000`}openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`4,000`}openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`5,000`}openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`10,000`}openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`20,000`}openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
            <ChargeMenuComponent type={`30,000`}openSecondModal={openSecondModal} setPointPrice={setPointPrice} setProductName={setProductName} setDiscount={setDiscount}/>
        </P.Container>
    );
};

export default AllPaymentMenu;