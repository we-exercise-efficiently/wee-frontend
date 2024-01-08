/**
 * LJM 2024.01.08
 * @returns 홈페이지 Ai 추천 컴포넌트
 */
export default function AiRecommand() {
  return (
    <div className="px-16 mt-12 flex flex-col justify-start items-stretch">
      <div className="flex flex-col mt-8 gap-4">
        <div className="flex flex-col h-96 bg-slate-300 rounded-xl justify-around items-center">
          <div className="flex flex-col justify-center items-center gap-2 pt-12">
            <h2 className="text-2xl font-bold">스마트한 AI 가</h2>
            <h2 className="text-2xl font-bold">개인 맞춤형으로 추천해주는</h2>
            <h2 className="text-2xl font-bold">운동 루틴을 만나보세요</h2>
          </div>

          <div className="transition duration-300 cursor-pointer ease-in-out hover:bg-slate-200 hover:text-slate-700 px-12 py-4 rounded-xl text-slate-200 bg-slate-800">
            <h2>AI 운동루틴 추천 받아보기</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
