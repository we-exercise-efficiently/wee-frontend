import { useEffect, useState } from "react";
import AnnounceRoutineLine from "../AnnounceRoutine/AnnounceRoutineLine";
import { IUserInfoProps } from "../../../models/userInfo.model";
import { getMemberInfo } from "../../../apis/apis";
import { FaFaceDizzy } from "react-icons/fa6";

import { cardio } from "ldrs";
import { FaSmileWink } from "react-icons/fa";
import { ILogTypes, logHandler } from "../../../utils/logHandler";

cardio.register();

// Default values shown

/**
 * LJM 2024.01.08
 * LJM 2024.02.02
 *
 * 루틴 소개 design ++
 *
 * @returns 홈페이지 루틴소개
 */
export default function AnnounceRoutine() {
  const [isUserInfo, setIsUserInfo] = useState<IUserInfoProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // 첫 마운팅 시
    const getData = async () => {
      try {
        const response = await getMemberInfo();
        console.log(response);
        if (response.data.code === 200) {
          // 성공 했을 시
          setIsUserInfo(response.data.data);
          // 기존 데이터 삽입
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
          // 로딩 상태 해제
        }
      } catch (error) {
        // 실패 시
        // 로그인을 다시 시키기 위해
        // reset("/");
        console.error(error);
        logHandler({
          text: "MAINPAGE INFO ERROR OCCURED",
          type: ILogTypes.WARNNING,
        });
        setTimeout(() => {
          setIsError(true);
        }, 3000);
      }
    };

    getData();
  }, []);

  return isError ? (
    <div className="my-16 rounded-xl mx-16 flex flex-col gap-2 h-96 bg-themeDark text-white justify-center items-center">
      <FaFaceDizzy className="text-themeLime mb-8 animate-shake" size={82} />
      <div className="flex flex-row justify-between items-center gap-4 text-themeLime">
        <span className="text-3xl font-bold">오류가 발생했어요... :(</span>
      </div>
      <p className="text-slate-500 text-lg">
        새로고침을 하거나 다시 접속해주세요
      </p>
    </div>
  ) : isLoading ? (
    <div className="my-16 rounded-xl mx-16 flex flex-col gap-2 h-96 bg-themeDark text-white justify-center items-center">
      <FaSmileWink className="text-themeLime mb-8 animate-shake" size={82} />
      <div className="flex flex-row justify-between items-center gap-4 text-themeLime">
        <span className="text-3xl font-bold">잠시만 기다려 주세요</span>
        <l-bouncy size="24" speed="1.75" color="rgb(209 253 10)" />
      </div>
      <p className="text-slate-500 text-lg">환영하기 위해 준비 중 입니다!</p>
    </div>
  ) : (
    <div className="my-16 mx-16 flex flex-col justify-start items-start">
      <h2 className="font-bold text-2xl">
        {`${3}일 연속 루틴 달성 중인 ${
          isUserInfo?.nickname
        }님의 오늘 루틴입니다!`}
      </h2>
      <div
        className="bg-transparent p-1 xl:grid flex flex-col w-full min-h-[32rem] gap-4 rounded-xl mt-4"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "2fr 3fr",
        }}
      >
        <div
          className="bg-themeLime xl:text-4xl lg:text-3xl sm:text-3xl text-2xl rounded-xl min-h-48 sm:h-auto flex flex-col gap-2 justify-center items-start px-8"
          style={{
            gridColumn: "1 / span 2", // 1열에서 시작해 2열을 차지
            gridRow: "1", // 1행
          }}
        >
          <div className="flex items-center justify-start gap-2 w-full">
            <h2 className="font-extrabold underline">
              {isUserInfo?.info.goal}
            </h2>
            <h2 className=" font-medium">까지</h2>
          </div>
          <h2 className="font-medium">WEE 가 함께해요</h2>
        </div>
        <div
          className="bg-themeDark rounded-xl min-h-48 sm:h-auto flex flex-col gap-2 justify-center items-start px-8"
          style={{
            gridColumn: "3", // 3열
            gridRow: "1", // 1행
          }}
        >
          <h2 className="text-lg font-medium text-white">현재 몸무게는</h2>
          <div className="w-full">
            <h2 className="text-6xl font-bold text-center text-themeLime">
              {"60kg"}
            </h2>
          </div>
        </div>
        <div
          className="bg-themeDark rounded-xl min-h-[32rem] sm:h-auto flex flex-col gap-2 justify-between items-start px-8"
          style={{
            gridColumn: "4", // 1열
            gridRow: "1 / span 3", // 2행에서 시작해 3행까지 차지
          }}
        >
          <div
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(4,15,21,1) 20%, rgba(209,253,10,1) 75%)`,
            }}
            className="bg-themeLime min-h-[24rem] h-4/5 w-full rounded-b-3xl flex flex-col justify-end p-6 items-center relative"
          >
            <div className="absolute top-12 left-1 text-white">
              <p className="text-base">오늘의 루틴</p>
              <h2 className="text-3xl">달성률</h2>
            </div>
            <div className="flex flex-row items-end justify-center">
              <h2 className="text-8xl font-bold">{"60"}</h2>
              <h2 className="text-4xl pb-1">%</h2>
            </div>
          </div>
          <div className="text-white text-base pb-4">
            <h2>
              오늘의 루틴을 확인하고, 달성하여 3일 연속의 기록을 확보해보세요 :)
            </h2>
          </div>
        </div>

        <div
          className="bg-themeDark text-white rounded-xl min-h-48 sm:h-auto flex flex-col gap-2 justify-start py-8 items-start px-8"
          style={{
            gridColumn: "1 / span 3", // 2열에서 시작해 3열을 차지
            gridRow: "2 / span 2", // 2행에서 시작해 3행까지 차지
          }}
        >
          <h2 className="text-4xl font-bold mb-6">WEE TO DO LIST</h2>
          <div className="flex flex-col gap-3">
            <AnnounceRoutineLine isComplete={true} mission={"123123123123"} />
            <AnnounceRoutineLine isComplete={true} mission={"123123123123"} />
            <AnnounceRoutineLine isComplete={false} mission={"adfafadfadf"} />
            <AnnounceRoutineLine isComplete={false} mission={"adfafadfadf"} />
            <AnnounceRoutineLine
              isComplete={false}
              mission={"ffffffffffffffffffffffffffffffffffff"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
