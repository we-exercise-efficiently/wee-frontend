import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Goal from "./Goal";

interface IGoalBoxProps {
  day: number;
  goals: string[];
}

export default function GoalBox({ day, goals }: IGoalBoxProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onToggle = () => {
    setIsClicked((current) => !current);
  };

  return (
    <div className="flex flex-col border border-themeDark rounded-2xl">
      <div
        onClick={onToggle}
        className={`transition-colors duration-300 cursor-pointer flex-shrink-0 w-full px-4 flex flex-row justify-between items-center ${
          isClicked
            ? "bg-themeDark text-white rounded-t-2xl"
            : "bg-white text-themeDark rounded-2xl"
        } h-16`}
      >
        <h2 className="font-bold text-2xl">{`DAY-${day}`}</h2>

        <IoIosArrowDown
          className={`font-bold text-2xl ${isClicked && "rotate-180"}`}
        />
      </div>

      <div
        className={`${
          !isClicked && "hidden"
        } px-8 py-16 flex flex-col justify-start gap-8 bg-white rounded-b-2xl`}
      >
        {goals.map((goal, index) => (
          <Goal key={index} text={goal} />
        ))}
      </div>
    </div>
  );
}
