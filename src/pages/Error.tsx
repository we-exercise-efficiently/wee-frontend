import { FaFaceDizzy } from "react-icons/fa6";
import { cardio } from "ldrs";
cardio.register();

/**
 *  LJM 2024.03.21
 * @returns 에러출력
 */
export default function Error() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <FaFaceDizzy className="text-themeLime mb-8 animate-shake" size={82} />
      <div className="flex flex-row justify-between items-center gap-4 text-themeLime">
        <span className="text-3xl font-bold">오류가 발생했어요... :(</span>
      </div>
      <p className="text-slate-500 text-lg">
        새로고침을 하거나 다시 접속해주세요
      </p>
    </div>
  );
}
