interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function PrevArrow({ onClick }: PrevArrowProps) {
  return (
    <div
      className={`bg-slate-700 top-36 cursor-pointer w-8 h-24 absolute left-5 z-10`}
      onClick={onClick}
    />
  );
}
