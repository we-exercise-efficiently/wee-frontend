import axios from "axios";
import { ILogTypes, logHandler } from "../utils/logHandler";

const tokenRefresher = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

tokenRefresher.interceptors.request.use(
  function (config) {
    logHandler({ text: `>> INTERCEPTED REQUEST <<`, type: ILogTypes.ALERT });
    return config;
  },
  function (error) {
    logHandler({
      text: `>> INTERCEPTED REQUEST, BUT ERROR OCCURED <<`,
      type: ILogTypes.WARNNING,
      error,
    });
    return Promise.reject(error);
  }
);

tokenRefresher.interceptors.response.use(
  async function (response) {
    logHandler({ text: `>> INTERCEPTED RESPONSE <<`, type: ILogTypes.ALERT });
    return response;
  },
  async function (error) {
    logHandler({
      text: `>> INTERCEPTED RESPONSE, BUT ERROR OCCURED <<`,
      type: ILogTypes.WARNNING,
      error,
    });
    // 401 에러 발생 시 "/" 페이지 이동
    if (error.response.status === 401) {
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default tokenRefresher;
