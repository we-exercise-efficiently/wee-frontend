interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function NextArrow({ onClick }: NextArrowProps) {
  return (
    <div
      className={`bg-slate-700 top-36 cursor-pointer w-8 h-24 absolute right-5`}
      onClick={onClick}
    />
  );
}
