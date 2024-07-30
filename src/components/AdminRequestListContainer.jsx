import React, { useState } from "react";
import {
  adminRequestListContainer,
  adminRequestListElement,
  adminRequestListItem,
  adminRequestListElementMargin,
  adminRequestListItemImg,
  adminRequestListItemInput,
  adminRequestListElementUserID,
  adminRequestListElementUserIDID,
  adminRequestListItemPickmeButton,
  adminRequestListItemPickmeValue,
  adminRequestListItemSubmitButton,
  adminRequestListElementResultPoint
} from "../css/components/AdminRequestListContainer.css.ts"; // 스타일 파일 import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pointIcon from '../../public/assets/point.svg';
import heartIcon from '../../public/assets/heart.svg';

function AdminRequestListContainer({ request, setRequests }) {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    add_point: 0,
    chargeCheck: false,
    add_pick_me: 0,
    result_point: request.point,
  });

  // 충전 확인 함수
  const handleAdminSubmit = async () => {
    const FormData = {
      add_point: value.add_point,
      add_pick_me: value.add_pick_me,
      result_point: value.result_point,
      contact_id: request.contact_id,
    };
    const response = await axios.post("/admin/manage/charge", FormData);
    console.log(request);
    if (response.data.status === 200) {
      setRequests((prev) =>
        prev.map((item) =>
          item.contact_id === request.contact_id
            ? { ...item, isChecked: true }
            : item
        )
      );
    }
  };

  // 충전 삭제 함수
  const handleChargeDelete = async () => {
    const response = await axios.get(
      `/admin/manage/delete?contactId=${request.contact_id}`
    );
    if (response.data.status === 200) {
      setRequests((prev) =>
        prev.map((item) =>
          item.contact_id === request.contact_id
            ? { ...item, isChecked: true }
            : item
        )
      );
    }
  };

  // 잔액 증가 함수
  const handleChargeIncrease = () => {
    setValue((prevState) => ({
      ...prevState,
      result_point: prevState.result_point + prevState.add_point,
      chargeCheck: true,
    }));
  };

  // 잔액 감소 함수
  const handleChargeDecrease = () => {
    if (value.result_point >= value.add_point) {
      setValue((prevState) => ({
        ...prevState,
        result_point: prevState.result_point - prevState.add_point,
        chargeCheck: false,
      }));
    } else {
      alert("pickme를 취소해주세요");
    }
  };

  // Pickme 증가 함수
  const handleIncrease = () => {
    setValue((prevState) => ({
      ...prevState,
      add_pick_me: prevState.add_pick_me + 1,
      result_point: prevState.result_point - 500,
    }));
  };

  // Pickme 감소 함수
  const handleDecrease = () => {
    if (value.add_pick_me > 0) {
      setValue((prevState) => ({
        ...prevState,
        add_pick_me: prevState.add_pick_me - 1,
        result_point: prevState.result_point + 500,
      }));
    }
  };

  // 입력값 변경 핸들러
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // 숫자 이외의 문자 및 마이너스 기호 제거
    const sanitizedValue = inputValue.replace(/[^0-9]/g, "");

    setValue((prevState) => ({
      ...prevState,
      add_point: sanitizedValue === "" ? 0 : parseInt(sanitizedValue),
    }));
  };

  return (
    <div className={adminRequestListContainer}>
      <div className={`${adminRequestListElement} ${adminRequestListElementMargin}`}>
        <div className={adminRequestListElementUserID}>
          userID: &nbsp;
          <div className={adminRequestListElementUserIDID}>
            {request.contact_id}
          </div>
        </div>
        <div className={adminRequestListElementResultPoint}>
          총 잔액 : {value.result_point}
        </div>
        <button onClick={handleChargeDelete}>X</button>
      </div>

      <div className={adminRequestListItem}>
        <img
          src={pointIcon}
          alt="cost"
          className={adminRequestListItemImg}
        />
        <input
          type="text"
          value={value.add_point}
          onChange={handleInputChange}
          disabled={value.chargeCheck}
          className={adminRequestListItemInput}
        />
        {value.chargeCheck ? (
          <button onClick={handleChargeDecrease}>취소</button>
        ) : (
          <button onClick={handleChargeIncrease}>적용</button>
        )}
        <img
          src={heartIcon}
          alt="heart"
          className={adminRequestListItemImg}
        />
        <button
          type="button"
          onClick={handleDecrease}
          className={adminRequestListItemPickmeButton}
        >
          -
        </button>
        <div className={adminRequestListItemPickmeValue}>
          {value.add_pick_me}
        </div>
        <button
          type="button"
          onClick={handleIncrease}
          className={adminRequestListItemPickmeButton}
          disabled={value.result_point < 500}
        >
          +
        </button>
        <button
          type="button"
          className={adminRequestListItemSubmitButton}
          onClick={handleAdminSubmit}
          disabled={!value.chargeCheck}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default AdminRequestListContainer;
