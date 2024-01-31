/**
 * LJM 2024.01.08
 * @returns 홈페이지 루틴소개
 */
export default function AnnounceRoutine() {
  return (
    <div className="mb-24 mx-16 mt-24 flex flex-col justify-start items-start">
      <h2 className="font-bold text-2xl">
        루틴 정보를 소개하는 간단한 텍스트를 입력해주세요
      </h2>
      <div
        className="bg-themeBlue p-1 sm:grid flex flex-col w-full min-h-[32rem] gap-1 rounded-xl mt-4"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "2fr 3fr",
        }}
      >
        <div
          className="bg-slate-300 rounded-xl min-h-48 sm:h-auto flex flex-col gap-2 justify-center items-start px-8"
          style={{
            gridColumn: "1 / span 2", // 1열에서 시작해 2열을 차지
            gridRow: "1", // 1행
          }}
        >
          <h2 className="text-xl font-bold">닉네임이 설정한 목표는</h2>
          <h2 className="text-xl font-bold underline">
            설정한 목표를 입력해주세요
          </h2>
          <h2 className="text-xl font-bold">입니다</h2>
        </div>
        <div
          className="bg-slate-300 rounded-xl min-h-48 sm:h-auto flex flex-col gap-2 justify-center items-start px-8"
          style={{
            gridColumn: "3", // 3열
            gridRow: "1", // 1행
          }}
        >
          <h2 className="text-xl font-bold">현재 몸무게는</h2>
          <h2 className="text-xl font-bold underline">100KG</h2>
          <h2 className="text-xl font-bold"> 입니다</h2>
        </div>
        <div
          className="bg-slate-300 rounded-xl min-h-48 sm:h-auto flex flex-col gap-2 justify-center items-start px-8"
          style={{
            gridColumn: "4", // 1열
            gridRow: "1 / span 3", // 2행에서 시작해 3행까지 차지
          }}
        >
          <h2 className="text-xl font-bold">오늘의 루틴</h2>
          <h2 className="text-xl font-bold underline">달성률</h2>
        </div>

        <div
          className="bg-slate-300 rounded-xl min-h-48 sm:h-auto flex flex-col gap-2 justify-center items-start px-8"
          style={{
            gridColumn: "1 / span 3", // 2열에서 시작해 3열을 차지
            gridRow: "2 / span 2", // 2행에서 시작해 3행까지 차지
          }}
        >
          <h2 className="text-xl font-bold">오늘 달성해야 하는 루틴은</h2>
          <h2>1</h2>
          <h2>2</h2>
          <h2>3</h2>
        </div>
      </div>
    </div>
  );
}
