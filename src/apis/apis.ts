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

const instance = axios.create({
  withCredentials: true,
});

/**
 * LJM 2024.01.07
 * @param data login interface
 * @returns 로그인 요청 API 함수 (POST)
 */
export function postLogin(data: ILoginDataProps) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/login`;
  return instance.post(url, data);
}

/**
 * LJM 2024.01.07
 * @returns 회원가입 요청 API 함수 (POST)
 */
export function postSignup(data: ISignupProps) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/register`;
  return instance.post(url, data);
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

/**
 * JCJ 2024.02.21
 * 투두리스트 조회 (GET)
 */
export const getTodo = async () => {
  const response = await axios.get('/DummyData.json');
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
export const getCrew = async () => {
  const response = await axios.get('/CrewExample.json');
  return response.data.data || [];
};

/**
 * SJW 2024.03.06
 * 크루 모집방 추가 (POST)
 */
export const postCrew = async (crewId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number, startDate: Date, endDate: Date, location: string, type: string, headcount: number, status: string) => {
  const response = await axios.post('/CrewExample.json', {
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
  return response;
};

/**
 * SJW 2024.03.06
 * 운동 루틴방 조회 (GET)
 */
export const getShare = async () => {
  const response = await axios.get('/ShareExample.json');
  return response.data.data || [];
};

/**
 * SJW 2024.03.06
 * 운동 루틴방 추가 (POST)
 */
export const postShare = async (shareId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number) => {
  const response = await axios.post('/ShareExample.json', {
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
  const response = await axios.get('/QuestionExample.json');
  return response.data.data || [];
};

/**
 * SJW 2024.03.06
 * 운동 질문방 추가 (POST)
 */
export const postQuestion = async (questionId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number, type: string, status: string) => {
  const response = await axios.post('/QuestionExample.json', {
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

