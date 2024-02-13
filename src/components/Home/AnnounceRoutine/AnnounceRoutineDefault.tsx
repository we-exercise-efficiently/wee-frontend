interface IAnnounceTestProps {
  setHasData: Function;
}

/**
 * LJM 2024.02.02
 *
 * 추후 setHasData 는 삭제 필요 (테스트용)
 *
 * @param setHasData TEST-TOGGLE BUTTON
 * @returns 루틴 설정을 안했을 시 나타나는 component
 */
export default function AnnounceRoutineDefault({
  setHasData,
}: IAnnounceTestProps) {
  return (
    <div className="my-48 mx-16 flex flex-col justify-start items-start">
      <h2 className="font-bold text-2xl">
        {`${"회원"}님에게 맞는 개인 맞춤 루틴을 받아보세요!`}
      </h2>
      <div
        className="bg-transparent p-1 xl:grid flex flex-col w-full min-h-[32rem] gap-4 rounded-xl mt-4"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows: "2fr 3fr",
        }}
      >
        <div
          className="bg-white border relative text-themeBlue rounded-xl min-h-[32rem] sm:h-auto flex flex-col gap-2 justify-start py-8 items-start px-8"
          style={{
            gridColumn: "4 / span 2", // 1열
            gridRow: "1 / span 2", // 2행에서 시작해 3행까지 차지
          }}
        >
          <div className="flex flex-col justify-center items-center border-themeBlue border-2 px-4 py-1 font-bold text-lg text-themeBlue rounded-full">
            <h2>WEE REVIEW</h2>
          </div>
          <h2 className="text-4xl font-bold sm:text-6xl">WEE들이</h2>
          <h2 className="text-4xl font-bold sm:text-6xl">함께하는</h2>
          <h2 className="text-4xl font-bold sm:text-6xl">운동 이야기</h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-36 h-36 absolute bottom-8 right-12 text-themeBlue cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <div className="absolute sm:bottom-16 bottom-44">
            <div className="flex flex-row relative">
              <div className="bg-themeLime w-24 h-24 rounded-full absolute bottom-0 left-0" />
              <div className="bg-themeDark w-24 h-24 rounded-full absolute bottom-0 left-12" />
              <div className="bg-themeBlue w-24 h-24 rounded-full absolute bottom-0 left-24" />
            </div>
          </div>
        </div>

        <div
          className="bg-themeDark relative text-white rounded-xl min-h-[32rem] sm:h-auto flex flex-col gap-2 justify-start py-8 items-start px-8"
          style={{
            gridColumn: "1 / span 3", // 2열에서 시작해 3열을 차지
            gridRow: "1 / span 2", // 2행에서 시작해 3행까지 차지
          }}
        >
          <div className="flex flex-col justify-center items-center border-themeLime border-2 px-4 py-1 font-bold text-lg text-themeLime rounded-full">
            <h2>WEE TO DO</h2>
          </div>
          <h2 className="text-4xl font-bold sm:text-6xl">CUSTOMIZED</h2>
          <h2 className="text-4xl font-bold sm:text-6xl">AI ROUTINE</h2>
          <h2 className="text-4xl font-bold sm:text-6xl">JUST FOR YOU</h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-36 h-36 absolute bottom-8 right-12 text-themeLime cursor-pointer"
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
        className="bg-slate-300 px-4 py-2 rounded-full text-white cursor-pointer"
        onClick={() => setHasData((current: boolean) => !current)}
      >
        TEST
      </div>
    </div>
  );
}
