import { useState } from "react";

interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function PrevArrow({ onClick }: PrevArrowProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div
      className={`transition-all top-36 cursor-pointer w-24 flex flex-col justify-center items-center ${
        isHover && "pr-5"
      } h-24  absolute left-5 z-10`}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 text-slate-50"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
}
