export interface IInfoBlockProps {
  text: string;
  range: string;
  rank: number;
}

export default function InfoBlock({ text, range, rank }: IInfoBlockProps) {
  return (
    <div className="flex flex-col justify-center items-center border-r h-16 border-r-themeBlue last:border-none">
      <h2
        className={`font-bold ${
          rank === 1
            ? "text-green-600"
            : rank === 2
            ? "text-lime-600"
            : rank === 3
            ? "text-lime-800"
            : rank === 4
            ? "text-orange-800"
            : rank === 5
            ? "text-orange-700"
            : "text-themeDark"
        }`}
      >
        {text}
      </h2>
      <div className="flex flex-row gap-2">
        <span className="font-bold">{range}</span>
        <span>kg/m²</span>
      </div>
    </div>
  );
}
