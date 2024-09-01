import React from "react";

function ChargeButtonInfo({
  //handleNotService,
  handleChargeRequest,
  chargeclick,
  handleToggleClick,
}) {
  return (
    <div className="charge-request-clicked">
      <div className="charge-request-clicked-top">
        💁 부스에 포인트 충전 요청하기
        <button
          className="charge-request-clicked-img"
          type="button"
          onClick={handleToggleClick}
          //onClick={handleNotService}
        >
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}../../assets/arrowup.svg`}
            alt="충전요청 닫기"
          />
        </button>
      </div>
      <li className="charge-request-clicked-text">
        입금 후 포인트 충전을 원하거나
      </li>
      <li className="charge-request-clicked-text">
        포인트를 PickMe로 바꾸고 싶을때 버튼을 눌러 주세요
      </li>
      <li className="charge-request-clicked-text">
        요청 후에는 입금 화면과 아이디를 보여 주세요.
      </li>
      <li className="charge-request-clicked-text">
        버튼 남용 시 이용이 제한될 수 있으니 유의 바랍니다.
      </li>
      <button
        className="charge-request-clicked-button"
        onClick={handleChargeRequest} 
        disabled={chargeclick.chargeclick}
      >
        충전 요청하기
      </button>
    </div>
  );
}

export default ChargeButtonInfo;
