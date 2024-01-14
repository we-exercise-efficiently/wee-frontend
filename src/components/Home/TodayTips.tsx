import { useState } from "react";

/**
 * LJM 2024.01.08
 * @returns 홈페이지 오늘의 팁 추천
 */
export default function TodayTips() {
  const [isTab, setIsTab] = useState<boolean>(true);

  const onTab = () => {
    setIsTab((current) => !current);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-themeLime h-auto p-4">
      <div
        className={`w-10/12 ${
          isTab ? "h-16" : "h-auto"
        } flex flex-row justify-between items-start pt-2 transition-all duration-300 ease-in-out gap-8`}
      >
        <div className="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </div>

        <div className={`w-10/12 my-2 ${isTab && "truncate"}`}>
          <h2 className={`text-lg font-bold ${isTab && "truncate"}`}>
            운동 초보자는 가벼운 중량으로 운동하기 때문에 호흡의 중요성을 모르는
            경우가 많다. 올바른 호흡법은 근육이운동 초보자는 가벼운 중량으로
            운동하기 때문에 호흡의 중요성을 모르는 경우가 많다. 올바른 호흡법은
            근육이운동 초보자는 가벼운 중량으로 운동하기 때문에 호흡의 중요성을
            모르는 경우가 많다. 올바른 호흡법은 근육이
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center">
          {isTab ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 cursor-pointer"
              onClick={onTab}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-10 h-10 cursor-pointer"
              onClick={onTab}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
