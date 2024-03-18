///////////////////////////////////////
//
//  NOTIFICATION
//
//  - 함수 작성 시 함수 작성한 사람 명 기재
//  - BACKEND 의 API 로직을 보고 수정해야함
//
//  - Error Handling, refreshToken 은
//  구현이 안되어있으므로 아직은 API 만
//
///////////////////////////////////////

import axios from "axios";
import { ILoginDataProps } from "../pages/Login";
import { ISignupProps } from "../pages/Signup";
import { IInfoFormDataProps } from "../pages/InfoCollect";
import tokenRefresher from "./refresh";

// refresh 가 필요없는 일반 인스턴스
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

/**
 * LJM 2024.01.07
 * @param data login interface
 * @returns 로그인 요청 API 함수 (POST)
 */
export async function postLogin(data: ILoginDataProps) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/login`;

  return tokenRefresher
    .post(url, data)
    .then((response) => {
      console.log(response);
      if (response.data.code === 200) {
        // 200 login success
        const accessToken = response.data.data["accessToken"];

        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return true;
      } else {
        throw new Error("Login Failed");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * LJM 2024.01.07
 * @returns 회원가입 요청 API 함수 (POST)
 */
export function postSignup(data: ISignupProps) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/register`;
  return tokenRefresher.post(url, data);
}

/**
 * LJM 2024.02.16
 * @param code URL 에서 받아온 code
 * @returns
 */
export function postLoginKakao(code: string) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/login/kakao`;

  return instance.post(
    url,
    {},
    {
      headers: {
        code: code,
      },
    }
  );
}

export function postLoginGoogle(code: string) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/login/google`;

  // axios params 로 code를 전송
  // LJM 2024.02.20. POST 요청이지만 params 로 요청
  return instance.post(
    url,
    {},
    {
      params: {
        code: code,
      },
    }
  );
}

export function postLoginNaver(code: string) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/login/naver`;

  return instance.post(
    url,
    {},
    {
      headers: {
        code: code,
      },
    }
  );
}

export function getGoogleLoginData(token: string) {
  let url = `https://www.googleapis.com/oauth2/v3/userinfo`;
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * LJM 2024.03.06
 * @param email 중복검사 할 이메일
 * @returns
 */
export function getEmailValidation(email: string) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/register/checkemail`;

  return axios.get(url, {
    params: {
      email,
    },
  });
}

/**
 * LJM 2024.03.11
 * 회원 탈퇴
 */
export function deleteMemberInfo() {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/mypage`;

  return tokenRefresher.delete(url);
}

/**
 * LJM 2024.03.11
 * 회원 정보 가져오기
 * @returns
 */
export function getMemberInfo() {
  let url = `${import.meta.env.VITE_BASE_URL}/wee/user/mypage`;

  return tokenRefresher.get(url);
}

/**
 * LJM 2024.03.12
 * 회원 정보 수정
 * @returns
 */
export function patchMemberInfo(data: IInfoFormDataProps) {
  let url = `${import.meta.env.VITE_BASE_URL}/wee/user/mypage`;

  return tokenRefresher.patch(url, {
    body: data,
  });
}

/**
 * LJM 2024.03.12
 * 현재 더미데이터를 가져오는 로직. 추후 수정 예정.
 * Promise 로 lazy loading test 중
 *
 */
export async function getRoutineData() {
  let url = `${import.meta.env.VITE_BASE_URL}/wee/user/mainpage`;

  return tokenRefresher.get(url);
}

/**
 * JCJ 2024.02.21
 * 투두리스트 조회 (GET)
 */
export const getTodo = async () => {
  const response = await axios.get("/DummyData.json");
  return response.data.todos || [];
};

/**
 * JCJ 2024.02.21
 * 투두리스트 추가 (POST)
 */
export const postTodo = async (id: number, content: string) => {
  const response = await axios.post("/DummyData.json", {
    id,
    content,
  });
  return response;
};

/**
 * SJW 2024.03.06
 * 크루 모집방 조회 (GET)
 */

// export const getCrew = async () => {
//   const response = await axios.get("/CrewExample.json");
//    return response.data.data || [];
// };

export const getCrew = async () => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/crew/list`;
    const response = await axios.get(url);
    const crewData = response.data.data || [];
    return crewData;
  } catch (error) {
    console.error("Error fetchig crew:", error);
    throw error;
  }
};

/**
 * SJW 2024.03.06
 * 크루 모집방 추가 (POST)
 */
// export const postCrew = async (crewId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number, startDate: Date, endDate: Date, location: string, type: string, headcount: number, status: string) => {
//   try {
//     // 서버에서 가장 최근에 추가된 crewId 값을 가져옵니다.
//     const response = await axios.get("/CrewExample.json");
//     const data = response.data.data;
//     const lastCrew = data[data.length - 1];
//     const lastCrewId = lastCrew ? lastCrew.crewId : 0; // 마지막 crewId 값이 없으면 0으로 초기화합니다.

//     // 새로운 crewId 값을 계산합니다.
//     const newCrewId = lastCrewId + 1;

//     // 새로운 데이터를 서버에 추가합니다.
//     const postResponse = await axios.post("/CrewExample.json", {
//       crewId: newCrewId,
//       userId,
//       title,
//       contents,
//       like,
//       createDate,
//       viewCnt,
//       commentCnt,
//       startDate,
//       endDate,
//       location,
//       type,
//       headcount,
//       status,
//     });

//     return postResponse;
//   } catch (error) {
//     console.error('Error posting crew:', error);
//     throw error;
//   }
// };

export const postCrew = async (crewData: any) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/crew`;
    const postResponse = await axios.post(url, crewData);
    return postResponse;
  } catch (error) {
    console.error("Error posting crew:", error);
    throw error;
  }
};

export const postCrew1 = async (
  crewId: number,
  userId: number,
  title: string,
  contents: string,
  like: number,
  createDate: Date,
  viewCnt: number,
  commentCnt: number,
  startDate: Date,
  endDate: Date,
  location: string,
  type: string,
  headcount: number,
  status: string
) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/crew`;
    // 서버에서 가장 최근에 추가된 crewId 값을 가져옵니다.
    // const response = await axios.get(url);
    // const data = response.data.data;
    // const lastCrew = data[data.length - 1];
    // const lastCrewId = lastCrew ? lastCrew.crewId : 0; // 마지막 crewId 값이 없으면 0으로 초기화합니다.

    // // 새로운 crewId 값을 계산합니다.
    // const newCrewId = lastCrewId + 1;

    // 새로운 데이터를 서버에 추가합니다.
    const postResponse = await axios.post(url, {
      crewId,
      userId,
      title,
      contents,
      like,
      createDate,
      viewCnt,
      commentCnt,
      startDate,
      endDate,
      location,
      type,
      headcount,
      status,
    });

    return postResponse;
  } catch (error) {
    console.error("Error posting crew:", error);
    throw error;
  }
};

/**
 * SJW 2024.03.06
 * 운동 루틴방 조회 (GET)
 */
export const getShare = async () => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/share/list`;
    const response = await axios.get(url);
    const shareData = response.data.data || [];
    return shareData;
  } catch (error) {
    console.error("Error fetchig crew:", error);
    throw error;
  }
};

/**
 * SJW 2024.03.06
 * 운동 루틴방 추가 (POST)
 */
export const postShare = async (
  shareId: number,
  userId: number,
  title: string,
  contents: string,
  like: number,
  createDate: Date,
  viewCnt: number,
  commentCnt: number
) => {
  const response = await axios.post("/ShareExample.json", {
    shareId,
    userId,
    title,
    contents,
    like,
    createDate,
    viewCnt,
    commentCnt,
  });
  return response;
};

/**
 * SJW 2024.03.06
 * 운동 질문방 조회 (GET)
 */
export const getQuestion = async () => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/question/list`;
    const response = await axios.get(url);
    const questionData = response.data.data || [];
    return questionData;
  } catch (error) {
    console.error("Error fetchig crew:", error);
    throw error;
  }
};

/**
 * SJW 2024.03.06
 * 운동 질문방 추가 (POST)
 */
export const postQuestion = async (
  questionId: number,
  userId: number,
  title: string,
  contents: string,
  like: number,
  createDate: Date,
  viewCnt: number,
  commentCnt: number,
  type: string,
  status: string
) => {
  const response = await axios.post("/QuestionExample.json", {
    questionId,
    userId,
    title,
    contents,
    like,
    createDate,
    viewCnt,
    commentCnt,
    location,
    type,
    status,
  });
  return response;
};
