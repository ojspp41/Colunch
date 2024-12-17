
# COMAtching

COMAtching은 사용자의 취미, 성향, 선호도를 기반으로 최적의 매칭을 제공하는 웹 애플리케이션입니다. 이 프로젝트에서 프론트엔드를 담당하였으며, 주된 기술 스택으로 `React`, `Vanilla CSS`, `Recoil`을 사용했습니다.


## 프로젝트 시연 GIF


[![COMAtching 시연 영상](./public/assets/youtube.png)](https://www.youtube.com/watch?v=jDAygPgQty0&t=55s)
## 주요 기능

- **카카오 로그인**: 카카오로그인을 통해 로그인합니다.
- **사용자 취미 선택**: 취미와 활동을 선택하여 사용자의 프로필을 생성합니다.
- **매칭 결과 확인**: 선택된 기준에 따라 최적의 매칭 결과를 확인할 수 있습니다.
- **관리자 페이지**: 사용자 요청을 확인하고 처리할 수 있는 관리자 전용 페이지가 포함되어 있습니다.
- **외부 브라우저 리디렉션**: 카카오톡이나 기타 인앱 브라우저에서 크롬 브라우저로 리디렉션하는 기능을 구현하였습니다.




## 배포

Firebase Hosting을 통해 COMAtching이 배포되었습니다. 최신 코드가 Firebase를 통해 자동으로 배포되며, 항상 최신 버전의 서비스를 제공하고 있습니다.

[COMAtching Firebase 배포 링크](https://comatching-devs.web.app/)


## 기술 스택

- **React**: 사용자 인터페이스 구축을 위한 주요 라이브러리입니다.
- **Vanilla CSS**: 스타일링을 위해 Vanilla CSS를 사용하여 깔끔하고 일관된 디자인을 구현했습니다.
- **Recoil**: 상태 관리 라이브러리로, 복잡한 상태 관리와 컴포넌트 간의 데이터 공유를 원활하게 처리했습니다.
- **Axios**: 서버와의 통신을 위해 Axios를 사용하여 효율적인 API 요청 및 응답 처리를 구현했습니다.
- **Firebase Hosting**: Firebase를 통해 프로젝트를 배포하여 안정적인 웹 서비스 환경을 제공했습니다.


## 파일 구조

```plaintext
src/
│
├── pages/                       # 주요 페이지 컴포넌트 폴더
│   ├── Mainpage.jsx             # 메인 페이지
│   ├── Hobbyform.jsx            # 취미 선택 페이지
│   ├── Matchresult.jsx          # 매칭 결과 페이지
│   ├── Checkresult.jsx          # 결과 확인 페이지
│   ├── Loading.jsx              # 로딩 페이지
│   ├── Guide.jsx                # 가이드 페이지
│   ├── CodeReader.jsx           # QR 코드 인식 페이지
│   ├── QRGenerator.jsx          # QR 코드 생성 페이지
│   ├── Adminpage_unlogin.jsx    # 관리자 로그인 전 페이지
│   ├── Describe.jsx             # 설명 페이지
│   ├── Matching.jsx             # 매칭 중 페이지
│   ├── Charge.jsx               # 충전 페이지
│   ├── Heart.jsx                # 좋아요 페이지
│   └── User_info_page.jsx       # 사용자 정보 페이지
│
├── components/                  # 재사용 가능한 컴포넌트 폴더
│   └── AdminRequestList.jsx     # 관리자 요청 리스트 컴포넌트
│
├── App.js                       # 루트 컴포넌트
├── axiosConfig.js               # Axios 설정 파일
├── recoil/                      # Recoil 상태 관리 파일
│   ├── charge.js
│   ├── adminRequests.js
│   ├── userState.js
│   ├── selectedMBTIState.js
│   ├── MatchPickState.js
│   └── MatchResultState.js
└── ...
```

## 프로젝트 이미지

![COMAtching 취미 선택 페이지](./public/assets/guide.png)
![COMAtching 로고](./public/assets/logowhite.png)

## 브라우저 리디렉션 처리

인앱 브라우저(예: 카카오톡)에서 링크가 열릴 경우 외부 브라우저(크롬, 사파리 등)로 리디렉션하기 위한 기능을 구현했습니다. 사용자가 앱을 통해 접근할 때도 문제없이 사용할 수 있도록 설계되었습니다.

```javascript
import { useEffect } from "react";

const OpenExternalBrowser = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const currentUrl = window.location.href;

    if (userAgent.includes("kakaotalk")) {
      window.location.href = "kakaotalk://web/openExternal?url=" + encodeURIComponent(currentUrl);
    }
    // 기타 브라우저 조건도 추가
  }, []);

  return null;
};

export default OpenExternalBrowser;
```
##밀어서 넘기기 기능
사용자가 특정 조건(나이, 연락 빈도, 취미 등)을 선택하면, "밀어서 커플되기" 버튼이 활성화됩니다. 이 버튼을 드래그하여 원하는 조건을 확인한 후, 다음 단계로 넘어갈 수 있는 직관적인 인터페이스를 구현했습니다. 이를 통해 사용자는 인터랙티브한 경험을 할 수 있습니다.

```javascript
const handleMove = (e) => {
  if (isDragging) {
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const deltaX = clientX - startX.current;
    const newPosition = Math.min(Math.max(0, imagePosition + deltaX), 252); // 252는 이동 가능한 최대 위치
    setImagePosition(newPosition);
    startX.current = clientX;
  }
};
```
## Recoil 상태 관리

Recoil을 사용하여 글로벌 상태를 관리하고, 사용자의 매칭 정보, 관리자 요청 리스트, 사용자 정보 등의 상태를 효율적으로 관리합니다. 예를 들어, `userState`를 통해 사용자 정보를 상태로 관리합니다.

```javascript
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    username: "",
    major: "",
    age: "",
    admissionYear: null,
    song: "",
    mbti: "",
    point: 0,
    pickMe: 0,
    contact_id: "",
    canRequestCharge: true,
    hobby: [],
    comment: "",
    numParticipants: 0,
    contact_frequency: "",
    contact: "kakao",
  },
});
- **Clipboard API**: 계좌번호를 자동으로 클립보드에 복사하여 사용자가 쉽게 입금 정보를 입력할 수 있도록 돕습니다.

- **모달 컴포넌트**: 충전 요청을 확인하는 모달 창을 제공하여 사용자가 요청 내용을 다시 확인하고 실수로 인한 요청을 방지할 수 있습니다.
- **유효성 검사**: 사용자 입력 값을 검증하여 최소 충전 금액을 1원 이상으로 제한하고, 올바른 금액만 전송될 수 있도록 합니다.

---

# 📡 실시간 WebSocket 통신 - 관리자 충전 요청 관리  

**AdminRequestList** 컴포넌트는 **SockJS**와 **Stomp.js**를 사용해 WebSocket을 통해 실시간으로 충전 요청 및 승인/취소 업데이트를 관리합니다. 페이지 새로고침 없이도 최신 데이터를 받아올 수 있도록 구현되었습니다.  

---

## 🔧 **주요 기능**  

1. **실시간 구독**  
   - **`/topic/chargeRequests`**:  
     새로운 충전 요청이 발생하면 요청 목록에 실시간으로 추가됩니다.  
   - **`/topic/approvalUpdate`**:  
     승인된 요청을 실시간으로 목록에서 제거합니다.  
   - **`/topic/cancelUpdate`**:  
     취소된 요청을 실시간으로 목록에서 제거합니다.  

2. **토큰 기반 인증**  
   - 쿠키에서 **Authorization** 토큰을 가져와 WebSocket 연결 시 인증을 처리합니다.  
   - 토큰이 없으면 관리자 로그인 페이지로 리디렉션됩니다.  

3. **중복 방지 및 상태 관리**  
   - `userId`를 기준으로 요청 목록에서 중복된 항목을 제거합니다.  

---

## 🛠️ **주요 코드**

### **1. WebSocket 연결 및 구독**  

```javascript
useEffect(() => {
  const socket = new SockJS("https://cuk.comatching.site/wss");
  const client = Stomp.over(socket);
  const token = getTokenFromCookie();

  if (!token) {
    navigate("/adminlogin");
    return;
  }

  client.connect({ Authorization: `Bearer ${token}` }, (frame) => {
    console.log("Connected: " + frame);

    client.subscribe("/topic/chargeRequests", (message) => {
      const chargeRequests = JSON.parse(message.body);
      setRequests((prev) => [
        ...prev,
        ...chargeRequests.filter((req) => !prev.some((r) => r.userId === req.userId)),
      ]);
    });

    client.subscribe("/topic/approvalUpdate", (message) => {
      const userId = message.body;
      setRequests((prev) => prev.filter((req) => req.userId !== userId));
    });

    client.subscribe("/topic/cancelUpdate", (message) => {
      const userId = message.body;
      setRequests((prev) => prev.filter((req) => req.userId !== userId));
    });
  });
}, []);
```

### **2. 쿠키에서 토큰 가져오기**  

```javascript
function getTokenFromCookie() {
  const name = "Authorization=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
```

### **3. 승인 및 취소 요청 처리**  

```javascript
function handleAction(userId, amount, actionType) {
  const approvalData = {
    userId,
    amount,
    approvalTime: new Date().toISOString(),
  };
  const destination =
    actionType === "approve" ? "/app/approveCharge" : "/app/cancelCharge";

  stompClient.send(destination, {}, JSON.stringify(approvalData));
  setRequests((prev) => prev.filter((req) => req.userId !== userId));
}
```

---

## ⚙️ **실행 흐름**  

1. **WebSocket 연결**  
   - 쿠키에서 `Authorization` 토큰을 가져와 서버에 인증 후 WebSocket에 연결합니다.  

2. **Topic 구독**  
   - **`/topic/chargeRequests`**: 새 충전 요청 실시간 추가  
   - **`/topic/approvalUpdate`**, **`/topic/cancelUpdate`**: 요청 실시간 삭제  

3. **요청 처리**  
   - 관리자 조작에 따라 서버로 승인 또는 취소 메시지를 전송합니다.  

---

## 🚀 **결과**  

- 실시간으로 충전 요청 목록이 갱신되며 관리자가 즉시 승인/취소를 처리할 수 있습니다.  
- 소켓 통신을 통해 사용자 경험이 개선됩니다.  

---

## 📚 **사용된 라이브러리**  

- **SockJS**: WebSocket 연결을 보조하여 다양한 브라우저 호환성 제공  
- **Stomp.js**: 메시지 브로커와의 효율적인 통신 지원  

---




