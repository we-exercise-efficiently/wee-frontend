import { FaSmileWink } from "react-icons/fa";
import { bouncy } from "ldrs";
bouncy.register(); // Default values shown

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2">
      <FaSmileWink className="text-themeLime mb-8 animate-shake" size={82} />

      <div className="flex flex-row justify-between items-center gap-4 text-themeLime">
        <span className="text-3xl font-bold">잠시만 기다려 주세요</span>
        <l-bouncy size="24" speed="1.75" color="rgb(209 253 10)" />
      </div>
      <p className="text-slate-500 text-lg">환영하기 위해 준비 중 입니다!</p>
    </div>
  );
}
