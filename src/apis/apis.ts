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

/**
 * LJM 2024.01.07
 * @param data login interface
 * @returns 로그인 요청 API 함수 (POST)
 */
export function postLogin(data: ILoginDataProps) {
  const url = `${process.env.REACT_APP_BASE_URL}/wee/user/register`;
  return axios.post(url, data);
}

// /**
//  * LJM 2024.01.07
//  * @returns 회원가입 요청 API 함수 (POST)
//  */
// export function postSignup() {
//   const url = `${process.env.REACT_APP_BASE_URL}/api/signup`;

//   return console.log(url);
// }

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
 * 투두리스트 조회 (GET)
 */
export const postTodo = async (id: number, content: string) => {
  const response = await axios.post("/DummyData.json", {
    id,
    content,
  });
  return response;
};