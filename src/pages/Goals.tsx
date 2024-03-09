import { useState } from "react";
import Container from "../components/Container";
import GoalBox from "../components/Goals/GoalBox";

export default function Goals() {
  const [isPoint, _] = useState<string[]>(["10%", "20%", "100%"]);

  return (
    <Container>
      <div className="px-16 flex flex-col-reverse lg:flex-row gap-4 justify-center lg:justify-between items-center lg:items-start py-8 min-h-screen h-auto bg-slate-100">
        <div className="div-container w-full lg:w-[40rem] max-h-[38rem] overflow-auto pr-4 flex flex-col gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <GoalBox
              key={index}
              day={index + 1}
              goals={[
                "오늘자 달성해야 하는 루틴 오늘자 달성해야 하는 루틴 와자자!",
                "오늘자 달성해야 하는 루틴 오늘자 달성해야 하는 루틴 와자자!",
                "오늘자 달성해야 하는 루틴 오늘자 달성해야 하는 루틴 와자자!",
                "오늘자 달성해야 하는 루틴 오늘자 달성해야 하는 루틴 와자자!",
              ]}
            />
          ))}
        </div>

        <div className="lg:w-[28rem] h-auto gap-4 flex flex-col justify-start">
          <div className="px-4 gap-1 text-3xl flex flex-col items-start justify-center w-full bg-themeLime min-h-48 h-auto rounded-2xl">
            <div className="flex flex-row">
              <span className="font-bold underline underline-offset-4">
                회원님의 목표
              </span>
              <span>까지</span>
            </div>
            <span>WEE 가 함께해요</span>
          </div>
          <div className="w-full flex flex-col justify-between items-center px-8 gap-12 bg-themeDark pt-16 pb-12 rounded-2xl">
            {/* LINE */}
            {isPoint?.map((point, index) => (
              <div
                key={index}
                className="relative flex flex-row w-full justify-start gap-8"
              >
                <h2 className="absolute -top-6 text-white">{`DAY${index}`}</h2>
                <div className="w-8">
                  <p className="text-themeLime">{point}</p>
                </div>
                <div
                  style={{ width: point }}
                  className="h-8 bg-themeLime rounded-l-full bg-custom-gradient"
                />
              </div>
            ))}

            <div className="flex text-center text-white flex-col justify-center items-center">
              <p>
                루틴 달성률을 확인하고, 오늘 루틴을 완성하여 3일 연속의 기록을
                달성해보세요 :)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
