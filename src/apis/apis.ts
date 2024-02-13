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

/**
 * LJM 2024.01.07
 * @param data login interface
 * @returns 로그인 요청 API 함수 (POST)
 */
export function postLogin(data: ILoginDataProps) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/login`;
  console.log(url);
  return axios.post(url, data);
}

/**
 * LJM 2024.01.07
 * @returns 회원가입 요청 API 함수 (POST)
 */
export function postSignup(data: ISignupProps) {
  const url = `${import.meta.env.VITE_BASE_URL}/wee/user/register`;
  console.log(url);

  return axios.post(url, data);
}
