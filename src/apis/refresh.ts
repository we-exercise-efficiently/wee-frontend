import axios from "axios";

const tokenRefresher = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

tokenRefresher.interceptors.request.use(
  function (config) {
    console.log(`>> INTERCEPTED REQUEST <<`);
    return config;
  },
  function (error) {
    console.log(`>> INTERCEPTED REQUEST, BUT ERROR OCCURED <<`, error);
    return Promise.reject(error);
  }
);

tokenRefresher.interceptors.response.use(
  async function (response) {
    console.log(`>> INTERCEPTED RESPONSE <<`);
    return response;
  },
  async function (error) {
    console.log(`>> INTERCEPTED RESPONSE, BUT ERROR OCCURED <<`);

    // 401 에러 발생 시 "/" 페이지 이동
    if (error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default tokenRefresher;
