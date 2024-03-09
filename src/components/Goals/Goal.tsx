import { FaStarOfLife } from "react-icons/fa";

interface IGoalProps {
  text: string;
}

export default function Goal({ text }: IGoalProps) {
  return (
    <div className="flex flex-row justify-start gap-4 items-center">
      <FaStarOfLife className="text-pink-600 text-2xl" />
      <h2>{text}</h2>
    </div>
  );
}
