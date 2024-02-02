interface IAnnounceRoutineLineProps {
  isComplete: boolean;
  mission: string;
}

export default function AnnounceRoutineLine({
  isComplete,
  mission,
}: IAnnounceRoutineLineProps) {
  return (
    <div className="flex flex-row justify-start gap-4 items-center">
      <div
        className={`w-6 h-6 rounded-full ${
          isComplete ? "bg-themeLime" : "bg-slate-300"
        }`}
      />
      <div className="flex flex-row justify-start items-center text-base text-white">
        <h2>{mission}</h2>
      </div>
    </div>
  );
}
