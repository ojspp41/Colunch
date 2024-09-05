import { atom } from "recoil";
export const charge = atom({
  key: "charge",
  default: {
    chargeclick: false,
  },
});

export const adminRequests = atom({
  key: "adminRequests",
  default: [],
});
export const userState = atom({
  key: "userState",
  default: {
    university: "",
    major: "",
    age: "",
    contact: "kakao",
    contact_id: "",
    gender: "null",
    contactFrequency: "",
    admissionYear: "",
    mbti: "",
    hobby: ["운동"],
    song: "",
    comment: "",
    contact_id_Verified: true,
    isLoggedIn: false,
    point: null,
    pickme: null,
    token: null,
  },
});

export const selectedMBTIState = atom({
  key: "selectedMBTIState",
  default: {
    EI: "",
    SN: "",
    TF: "",
    PJ: "",
  },
});

export const MatchPickState = atom({
  key: "MatchPickState",
  default: {
    selectedMBTI: ["X", "X", "X", "X"],
    selectedCategory: [],
    point: 500,
    balance: null,
    isUseOption: [false, false, false, false],
    formData: {
      ageOption: "",
      mbti: "",
      hobbyOption: [""],
      contactFrequencyOption: "",
      sameMajorOption: false,
      uuid: "efc3044fc84d4f1e94209d784e8b2615",
    },
  },
});

export const MatchResultState = atom({
  key: "MatchResultState",
  default: {
    age: null,
    comment: "",
    contactFrequency: "",
    currentPoint: "",
    gender: "",
    hobby: [],
    major: null,
    mbti: null,
    socialId: null,
    song: null,
  },
});

export const checkresultState = atom({
  key: "checkresultState",
  default: [],
});
