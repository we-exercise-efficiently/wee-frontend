import { useEffect, useRef, useState } from "react";
import useScrollReset from "../../utils/useScrollReset";

/**
 * LJM 2024.01.08
 * @returns 홈페이지 Ai 추천 컴포넌트
 */
export default function AiRecommand() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const nav = useScrollReset();

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    let destination = event.currentTarget.id;
    nav(`/${destination}`);
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback: IntersectionObserverCallback = (entries, _) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("HELLO");
          setIsView(true);
        } else {
          console.log("BYE BYE");
          setIsView(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={targetRef}
      className="px-16 mt-12 flex flex-col justify-start items-stretch"
    >
      <div className="flex flex-col mt-8 gap-4">
        <div className="flex flex-row h-96 bg-themeDark rounded-xl justify-center items-center">
          <div className="text-white px-4">
            <h2 className="font-bungee-outline text-6xl hidden sm:block">A</h2>
          </div>
          {/* Text-A */}
          <div
            className={`transition-all duration-500 delay-300 ease-in-out relative h-full w-80  ${
              isView && "sm:w-3/5"
            } flex flex-row justify-center items-center`}
          >
            <div
              onClick={onMove}
              id="ai"
              className="cursor-pointer p-12 sm:absolute gap-4 border-4 border-themeDark right-0 z-30 w-80 h-80 bg-themeBlue rounded-full flex flex-col justify-center items-center text-white"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="h-2/5 flex-col mt-10">
                  <h2 className="font-extrabold text-4xl">SMART AI ROUTINE</h2>
                </div>
                <div className="h-3/5 flex flex-row justify-between gap-2 items-center">
                  <h2 className="text-sm">
                    스마트한 AI가 개인 맞춤형으로 추천해주는 운동 루틴을
                    만나보세요.
                  </h2>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-36 h-36"
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
            <div className="absolute border-4 border-themeDark hidden sm:block inset-0 m-auto z-20 w-80 h-80 bg-gray-400 rounded-full"></div>
            <div className="pl-12 font-bold text-themeDark   text-6xl flex-row items-center justify-start absolute border-4 border-themeDark left-0 z-10 w-80 h-80  hidden sm:flex bg-themeLime rounded-full">
              <h2>:)</h2>
            </div>
          </div>
          {/* Circles */}
          <div className="text-white px-4">
            <h2 className="font-bungee-outline text-6xl hidden sm:block">I</h2>
          </div>
          {/* Text-I */}
        </div>
      </div>
    </div>
  );
}
