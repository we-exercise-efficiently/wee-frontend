interface IRecommandBoxProps {
  level: string;
  id: string;
  post: string;
}

export default function CommunityRecommandBox({
  level,
  id,
  post,
}: IRecommandBoxProps) {
  return (
    <div className="h-full py-6 px-4 flex flex-col justify-start items-start gap-2">
      <div className="flex flex-row gap-4">
        <div className="bg-gray-200 w-16 h-16 rounded-full" />
        {/* PROFILE-IMAGE */}
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-sm text-themeBlue">{level}</h3>
          {/* RANK */}
          <h2 className="text-2xl font-bold text-themeDark max-w-full truncate">
            {id}
          </h2>
          {/* ID */}
        </div>
      </div>
      {/* TOP */}
      <div className="flex flex-row gap-10 max-w-full h-3/5">
        {/* BOTTOM */}
        <h2 className="text-slate-700 max-w-full truncate-3-lines text-md">
          {post}
        </h2>
        <div className="h-full flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8 text-themeBlue"
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
  );
}
