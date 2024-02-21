import { useState } from "react";
import Container from "../components/Container";

/**
 *  2024.01.16
 * @returns 마이 페이지
 */
export default function Mypage() {
  const [isAdded, _] = useState<boolean>(false);

  return (
    <Container>
      {/* BODY */}
      <div className="px-12 py-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
        {/* 1번째 */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
          <div className="bg-transparent rounded-2xl p-4 h-48">
            <div className="flex flex-row gap-4 justify-start items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-themeBlue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
              </svg>

              <h2 className="text-2xl font-bold">나의 목표치 혹은 꾸밈</h2>
            </div>
          </div>
          <div className="bg-gray-300 rounded-2xl p-4 h-48">
            <div className="h-full flex flex-row justify-between items-center">
              <div>
                <p className="text-sm">00 크루 소속 중 | 활동적 생활가</p>
                <h1 className="text-4xl font-bold">코끼리도초식동물 님</h1>
              </div>
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-400 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-400 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-400 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2번째 */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div
            className={`flex flex-col bg-gray-300 rounded-2xl p-4 h-96 lg:w-1/3
             `}
          >
            <div className="flex flex-col justify-between h-full py-8">
              <div className="font-bold text-2xl">
                <h2>건강 정보에 대해 입력해주시면</h2>
                <h2>상태를 분석해드려요 :)</h2>
              </div>
              <div className="bg-gray-400 flex justify-center items-center cursor-pointer rounded-md py-4">
                <h2>건강정보 입력하러 가기</h2>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col bg-gray-300 rounded-2xl p-4 h-96 lg:w-1/3
              `}
          >
            <div className="flex flex-col justify-between h-full py-8 relative">
              <div className="font-bold text-2xl">
                <h2>야심찬 운동계획</h2>
                <h2>투두리스트</h2>
                <h2>계획 하기</h2>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-20 h-20 absolute bottom-0 right-0 text-themeLime cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
          <div
            id="3"
            className={`flex flex-col bg-gray-300 rounded-2xl p-4 h-96 lg:w-1/3
              `}
          >
            <div className="flex flex-col justify-between h-full py-8 relative">
              <div className="font-bold text-2xl">
                <h2>AI가 설정해주는</h2>
                <h2>맞춤형 루틴 받고</h2>
                <h2>현황 확인하기!</h2>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-20 h-20 absolute bottom-0 right-0 text-themeLime cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3번째 */}
        <div className="flex flex-col sm:grid sm:grid-cols-1 gap-4">
          <div className="bg-gray-300 rounded-2xl p-4 min-h-96">
            <div className="flex flex-col gap-8 lg:flex-row h-full justify-between items-start py-12 px-16">
              <div className="lg:w-1/2 flex flex-col gap-6">
                <h2 className="text-2xl font-bold">간단하게 정보를 입력하고</h2>
                <h2 className="text-2xl font-bold">BMI 지수를 측정해보세요!</h2>
                <p className="text-xs">대한비만학회, 비만치료지침 기준</p>
              </div>
              <div className="lg:w-1/2 w-full">
                <form className="flex flex-col w-full gap-4">
                  <div className="flex flex-row w-full">
                    <label
                      className="w-2/12 flex flex-row justify-start items-center font-bold text-2xl"
                      htmlFor="height"
                    >
                      신장
                    </label>
                    <input
                      id="height"
                      className="w-full px-4 rounded-md focus:outline-none"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex flex-row w-full">
                    <label
                      className="w-2/12 flex flex-row justify-start items-center font-bold text-2xl"
                      htmlFor="weight"
                    >
                      체중
                    </label>
                    <input
                      id="weight"
                      className="w-full px-4 rounded-md focus:outline-none"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex flex-row w-full">
                    <label
                      className="w-2/12 flex flex-row justify-start items-center font-bold text-2xl"
                      htmlFor="age"
                    >
                      나이
                    </label>
                    <input
                      id="age"
                      className="w-full px-4 rounded-md focus:outline-none"
                      autoComplete="off"
                    />
                  </div>

                  <button className="mt-12 bg-gray-400 py-4 rounded-md">
                    BMI 지수 측정하기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* 4번째 */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4">
          <div className="bg-gray-300 rounded-2xl p-4 h-44">
            {isAdded ? (
              <div className="flex flex-col gap-4 justify-start items-center">
                <h2 className="text-2xl font-bold">커뮤니티</h2>
                <p className="text-xl">sdfsdfsdfsfs</p>
              </div>
            ) : (
              <div className="h-full flex flex-col gap-2 p-2 justify-start items-start relative">
                <h2 className="text-3xl font-bold z-10">사람들과</h2>
                <h2 className="text-3xl font-bold z-10">소통하기</h2>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-20 h-20 absolute bottom-0 right-0 text-themeLime cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="bg-gray-300 rounded-2xl p-4 h-44">
            {isAdded ? (
              <div className="flex flex-col gap-4 justify-start items-center">
                <h2 className="text-2xl font-bold">커뮤니티</h2>
                <p className="text-xl">sdfsdfsdfsfs</p>
              </div>
            ) : (
              <div className="h-full flex flex-col gap-2 p-2 justify-start items-start relative">
                <h2 className="text-3xl font-bold z-10">크루</h2>
                <h2 className="text-3xl font-bold z-10">활동하기</h2>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-20 h-20 absolute bottom-0 right-0 text-themeLime cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="bg-transparent rounded-2xl p-4 h-56 col-span-3">
            <div className="h-full relative">
              <h2 className="font-bold text-3xl px-4 py-6 z-20 relative">
                꾸밈공간 혹은 슬로건 이용
              </h2>

              <div className="w-28 h-28 bg-themeLime rounded-full absolute bottom-10 z-10 left-0" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
