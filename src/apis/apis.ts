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
import { ILogTypes, logHandler } from "../utils/logHandler";

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

  return tokenRefresher.post(url, data).then((response) => {
    console.log(response);
    if (response.data.code === 200) {
      // 200 login success
      const accessToken = response.data.data["accessToken"];
      console.log(accessToken);

      tokenRefresher.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return true;
    } else {
      logHandler({ text: `LOGIN FAILED`, type: ILogTypes.WARNNING });
    }
  });
  // .catch((_) => {
  //   // console.error(error);
  // });
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
