import { useEffect } from "react";
import "../css/components/AdminRequestList.css.ts"; // 확인: 경로와 확장자
import AdminRequestListContainer from "./AdminRequestListContainer";
import { adminRequestList, adminRequestListTitle, adminRequestListText, adminRequestListBox } from '../css/components/AdminRequestList.css.ts';
import axios from "axios";
import { useRecoilState } from "recoil";
import { adminRequests } from "../Atoms";

function AdminRequestList() {
  const [requests, setRequests] = useRecoilState(adminRequests);
  const exampleRequest = {
    contact_id: "user123",
    point: 1000,
  };
  
  useEffect(() => {
    // 초기 요청 목록 초기화
    setRequests([exampleRequest]);
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/manage/main");
        if (response.data.status === 200) {
          const updatedData = response.data.data.charge_request_info_list.map(
            (item) => ({
              ...item,
              isChecked: false,
            })
          );
          setRequests(updatedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if needed
      }
    };

    fetchData();
  }, [setRequests]); // useEffect의 의존성 배열에 setRequests 추가

  return (
    <div className={adminRequestList}>
      <div className="content">
        <div className={adminRequestListTitle}>충전 요청 목록</div>
        <div className={adminRequestListText}>
          유저로부터 이름, 아이디, 입금 내역 확인해서 그만큼 충전
        </div>
        <div className={adminRequestListBox}>
          {requests.map(
            (request, index) =>
              !request.isChecked && (
                <AdminRequestListContainer
                  key={index}
                  request={request}
                  setRequests={setRequests}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
export default AdminRequestList; // default로 export