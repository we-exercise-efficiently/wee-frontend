import { useState } from "react";

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function NextArrow({ onClick }: NextArrowProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      className={`transition-all top-36 cursor-pointer ${
        isHover && "pl-5"
      } w-24 h-24 absolute right-5 flex flex-col justify-center items-center`}
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
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}
