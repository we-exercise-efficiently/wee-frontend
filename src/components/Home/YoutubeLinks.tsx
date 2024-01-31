/**
 *  LJM 2024.01.08
 * @returns 홈페이지 유튜브 추천 리스트
 */
export default function YoutubeLinks() {
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // 해당 유튜브 링크로 이동 추후 추가
    console.log(event.currentTarget.id);
  };

  return (
    <div className="px-16 mt-36 flex flex-col justify-start items-stretch">
      <h2 className="text-2xl font-bold">
        운동 정보를 쉽고, 빠르게 얻을 수 있도록
      </h2>
      <div className="flex flex-col sm:flex-row mt-8 gap-4">
        {["1", "2", "3"].map((value: string) => (
          <div
            key={value}
            id={value}
            onClick={onMove}
            className="cursor-pointer transition-all duration-300 ease-in-out h-48 sm:h-96 sm:w-1/3 hover:sm:w-2/4 bg-slate-300 rounded-xl flex flex-col justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-36 h-36 text-slate-700 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
