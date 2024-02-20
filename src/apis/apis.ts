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
