import React, { useEffect, useState } from "react";
import "../css/components/AdminRequestList.css"; // 스타일 파일 경로 확인
import AdminRequestListContainer from "./AdminRequestListContainer";
import * as styles from "../css/components/AdminRequestList.css";
import { useRecoilState } from "recoil";
import { adminRequests } from "../Atoms";
import SockJS from "sockjs-client";
import Stomp from "stompjs";



function getTokenFromCookie() {
  const name = 'Authorization=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function AdminRequestList() {
  const [requests, setRequests] = useRecoilState(adminRequests);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      const socket = new SockJS('http://backend.comatching.site:8080/ws');
      const client = Stomp.over(socket);
      const token = getTokenFromCookie();

      console.log("Token from cookie:", token);

      
        client.connect({ Authorization: `Bearer ${token}` }, (frame) => {
          console.log('Connected: ' + frame);

          setStompClient(client);

          // 충전 요청 구독
          client.subscribe('/topic/chargeRequests', (message) => {
            const chargeRequests = JSON.parse(message.body);
            console.log(chargeRequests);
            setRequests((prevRequests) => [...prevRequests, ...chargeRequests]);
          });

          // 승인 업데이트 구독
          client.subscribe('/topic/approvalUpdate', (message) => {
            const userId = message.body;
            setRequests((prevRequests) =>
              prevRequests.map((request) =>
                request.contact_id === userId ? { ...request, isChecked: true } : request
              )
            );
          });

          
        }, (error) => {
          console.error('Error connecting to WebSocket', error);
          
        });

    };

    const initializeWebSocket = async () => {
      try {
        await connectWebSocket();
      } catch (error) {
        console.error("Failed to connect to WebSocket:", error);
      }
    };

    initializeWebSocket();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, []); // 빈 의존성 배열로 한 번만 실행

  return (
    <div>
      <div className="content">
        <div className={styles.adminRequestListTitle}>충전 요청 목록</div>
        <div className={styles.adminRequestListText}>
          유저로부터 이름, 아이디, 입금 내역 확인해서 그만큼 충전
        </div>
        <div className={styles.adminRequestListBox}>
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

export default AdminRequestList;
