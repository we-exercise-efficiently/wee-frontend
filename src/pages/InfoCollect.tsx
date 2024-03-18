import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { getMemberInfo, patchMemberInfo } from "../apis/apis";
import useScrollReset from "../utils/useScrollReset";
import Loading from "../components/Loading";

interface ITimeProps {
  first: string | null;
  second: string | null;
}

interface IToggleProps {
  first: boolean;
  second: boolean;
}

export interface IInfoFormDataProps {
  gender: string;
  age: string;
  height: string;
  weight: string;
  firstTime: string;
  secondTime: string;
  preferList: string[];
  kcal: string;
  goals: string;
}

const timeList: string[] = ["12", "1", "2"];
const trainingList: string[] = ["근력 운동", "요가", "유산소", "스트레칭"];

export default function InfoCollect() {
  const [isPage, setIsPage] = useState(0);
  const [isGender, setIsGender] = useState("none");
  const [isTime, setIsTime] = useState<ITimeProps>({
    first: null,
    second: null,
  });
  const [isClicked, setIsClicked] = useState<IToggleProps>({
    first: false,
    second: false,
  });
  const [isPreferlist, setIsPreferList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useScrollReset();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<IInfoFormDataProps>();

  const onNext = async () => {
    const isGenderValid = await trigger("gender");
    const isAgeValid = await trigger("age");
    const isWeightValid = await trigger("weight");
    const isHeightValid = await trigger("height");

    if (isGenderValid && isAgeValid && isWeightValid && isHeightValid) {
      setIsPage((current) => (current += 1));
    }
  };

  const onToggleTab = (target: string) => {
    if (target === "first") {
      setIsClicked((prev) => ({
        ...prev,
        first: !isClicked.first,
        second: false,
      }));
    } else if (target === "second") {
      setIsClicked((prev) => ({
        ...prev,
        first: false,
        second: !isClicked.second,
      }));
    }
  };

  const onFirstTimeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    let value = Number(event.currentTarget.id);
    const selectedTime = timeList[value];

    setIsTime((prev) => ({
      ...prev,
      first: selectedTime,
    }));

    setValue("firstTime", selectedTime, { shouldValidate: true });
  };

  const onSecondTimeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    let value = Number(event.currentTarget.id);
    const selectedTime = timeList[value];

    setIsTime((prev) => ({
      ...prev,
      second: selectedTime,
    }));

    setValue("secondTime", selectedTime);
  };

  const onUpdateList = (event: React.MouseEvent<HTMLDivElement>) => {
    let value = event.currentTarget.id;
    // 누른 값
    setIsPreferList((prev) => {
      if (prev.includes(value)) {
        return prev.filter((target) => value !== target);
      } else {
        return [...prev, value];
      }
    });
  };

  const onSelectGender = (event: React.MouseEvent<HTMLDivElement>) => {
    let value = event.currentTarget.id;
    setIsGender(value);
  };

  /**
   * LJM 2024.03.12
   * 조건 만족 시 api 요청
   * 요청 시 대기상태를 isLogin 으로 관리
   * @param data
   */
  const onValid = async (data: IInfoFormDataProps) => {
    try {
      setIsLoading(true);
      // validation 통과 시
      // 1) 전송 될 데이터
      console.log(data);

      // 2) 전송 할 데이터를 보냄
      console.log("PATCH START ::");
      const response = await patchMemberInfo(data);
      console.log(response);
      if (response.data.code === 200) {
        // 성공했을 때
        console.log(":: PATCH SUCCESS");
        nav("/");
      }
    } catch (error) {
      console.error(error);
      console.log(":: PATCH ERROR OCCURED");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * LJM 2024.03.12
   * 기본적으로 갖고있는 값
   * 무조건 빈 값이 아닌 초기 데이터 값 가져오도록
   * 추후에 데이터 연결 및 테스트
   */
  useEffect(() => {
    // 추후 get 으로 데이터 사용
    const getData = async () => {
      try {
        console.log(`GET DATA START ::`);
        const response = await getMemberInfo();
        if (response.data.code === 200) {
          // 성공하면
          setIsLoading(false);
        }
      } catch (error) {
        console.log(`:: GET DATA FAILED`);
        console.error(error);
        setIsLoading(true);
      }
    };

    getData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <div className="w-screen h-screen bg-themeDark">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center pt-8 min-h-screen bg-slate-100">
          <h2 className="font-bold text-3xl pb-8">
            회원님의 루틴을 WEE 해 필요해요
          </h2>
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-row w-auto"
          >
            <div
              className={`${
                isPage === 0 ? "flex" : "hidden"
              } flex-col justify-start items-center gap-8`}
            >
              {/* 시간 선택 Box */}
              <div
                className={`px-4 bg-white py-8 rounded-3xl flex flex-col justify-start gap-6 min-w-[36rem]`}
              >
                <h2 className="font-bold text-base">성 별</h2>
                {/* 성별 선택란 */}
                <div className="flex flex-row justify-around items-center">
                  <div
                    id="none"
                    onClick={onSelectGender}
                    className="flex flex-row gap-4 cursor-pointer"
                  >
                    <div
                      className={`${
                        isGender === "none" && "bg-themeLime"
                      } relative w-6 h-6 rounded-full ring-2 ring-themeLime ring-offset-4`}
                    />
                    <h2 className={`${isGender === "none" && "font-bold"}`}>
                      선택 안함
                    </h2>
                  </div>
                  <div
                    id="female"
                    onClick={onSelectGender}
                    className="flex flex-row gap-4 cursor-pointer"
                  >
                    <div
                      className={`${
                        isGender === "female" && "bg-themeLime"
                      } relative w-6 h-6 rounded-full ring-2 ring-themeLime ring-offset-4`}
                    />
                    <h2 className={`${isGender === "female" && "font-bold"}`}>
                      여 성
                    </h2>
                  </div>
                  <div
                    id="male"
                    onClick={onSelectGender}
                    className="flex flex-row gap-4 cursor-pointer"
                  >
                    <div
                      className={`${
                        isGender === "male" && "bg-themeLime"
                      } relative w-6 h-6 rounded-full ring-2 ring-themeLime ring-offset-4`}
                    />
                    <h2 className={`${isGender === "male" && "font-bold"}`}>
                      남 성
                    </h2>
                  </div>
                </div>
                <input
                  hidden
                  className="h-12 w-12 text-red-500"
                  value={isGender}
                  {...register("gender", {
                    required: "성별을 선택해주세요.",
                  })}
                />
              </div>

              {/* 선호 운동종목 Box */}
              <div className=" px-4 bg-white py-8 rounded-3xl flex flex-col justify-start gap-6 min-w-[36rem]">
                <h2 className="relative font-bold text-base">
                  나이
                  <p className="absolute text-red-500 left-0 -bottom-4 text-xs">
                    {errors.age?.message}
                  </p>
                </h2>
                <div className="flex flex-row justify-start items-end gap-2">
                  <input
                    id="age"
                    className="h-12 border-2 border-themeLime focus:outline-none"
                    {...register("age", {
                      required: "나이를 입력해주세요.",
                      pattern: {
                        value: /^\d+$/,
                        message: "나이는 숫자만 입력해주세요.",
                      },
                    })}
                  />
                  <label htmlFor="kcal" className="text-xl font-bold">
                    세
                  </label>
                </div>

                <h2 className="relative font-bold text-base">
                  내 신체 사이즈
                  <p className="absolute text-red-500 left-0 -bottom-4 text-xs">
                    {errors.height?.message || errors.weight?.message}
                  </p>
                </h2>
                <div className="flex flex-row justify-between items-end gap-2">
                  <div className="flex flex-row justify-start items-end gap-2">
                    <input
                      id="cm"
                      className="h-12 border-2 border-themeLime focus:outline-none"
                      {...register("height", {
                        required: "신장을 입력해주세요.",
                        pattern: {
                          value: /^\d+$/,
                          message: "소숫점을 제외한 숫자만 입력해주세요.",
                        },
                      })}
                    />
                    <label htmlFor="cm" className="text-xl font-bold">
                      cm
                    </label>
                  </div>
                  <div className="flex flex-row justify-start items-end gap-2">
                    <input
                      id="kg"
                      className="h-12 border-2 border-themeLime focus:outline-none"
                      {...register("weight", {
                        required: "몸무게를 입력해주세요.",
                        pattern: {
                          value: /^\d+$/,
                          message: "소숫점을 제외한 숫자만 입력해주세요.",
                        },
                      })}
                    />
                    <label htmlFor="kg" className="text-xl font-bold">
                      kg
                    </label>
                  </div>
                </div>
              </div>

              <div
                onClick={onNext}
                className="flex flex-col justify-center items-center cursor-pointer h-14 w-72 mb-12 rounded-full x-4 y-2 bg-themeDark font-bold text-slate-100"
              >
                다 음
              </div>
            </div>

            <div
              className={`${
                isPage === 1 ? "flex" : "hidden"
              } flex-col justify-start items-center gap-8 fade-in`}
            >
              {/* 시간 선택 Box */}
              <div
                className={`px-4 bg-white py-8 rounded-3xl flex flex-col justify-start gap-6 min-w-[36rem]`}
              >
                <h2 className="relative font-bold text-base">
                  일일 운동시간
                  <p className="absolute text-red-500 left-0 -bottom-4 text-xs">
                    {errors.firstTime?.message}
                  </p>
                </h2>
                {/* 1번째 시간 선택란 */}
                <div
                  onClick={() => {
                    onToggleTab("first");
                  }}
                  className="relative cursor-pointer rounded-md border-themeLime border-2 px-4 py-3 min-h-12 select-without-arrow"
                >
                  <h2 className="absolute left-4 top-3 text-slate-500">
                    1타임
                  </h2>
                  <h2
                    className={`text-right ${
                      isTime.first === null
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {isTime.first === null
                      ? "선호 시간대를 정해주세요"
                      : isTime.first}
                  </h2>
                  <div
                    style={{ width: "calc(100% + 4px)" }}
                    className={`${
                      !isClicked.first && "hidden"
                    } absolute top-11 z-10 -left-[2px] bg-slate-100`}
                  >
                    {timeList.map((time, index) => (
                      <div
                        onClick={onFirstTimeClick}
                        className="hover:bg-themeLime h-12 px-4 py-3 flex-row items-center justify-end"
                        key={time}
                        id={String(index)}
                      >
                        <h2 className="text-center text-slate-700">{time}</h2>
                      </div>
                    ))}
                  </div>
                </div>
                <input
                  hidden
                  className="h-12 w-12 text-red-500"
                  value={isTime.first ? isTime.first : ""}
                  {...register("firstTime", {
                    required: "시간을 선택해주세요.",
                  })}
                />

                {/* 2번째 시간 선택란 (필수 아님) */}
                <div
                  onClick={() => {
                    onToggleTab("second");
                  }}
                  className="relative cursor-pointer rounded-md border-themeLime border-2 px-4 py-3 min-h-12 select-without-arrow"
                >
                  <h2 className="absolute left-4 top-3 text-slate-500">
                    2타임 (선택)
                  </h2>
                  <h2
                    className={`text-right ${
                      isTime.second === null
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {isTime.second === null
                      ? "선호 시간대를 정해주세요"
                      : isTime.second}
                  </h2>
                  <div
                    style={{ width: "calc(100% + 4px)" }}
                    className={`${
                      !isClicked.second && "hidden"
                    } absolute top-11 z-10 -left-[2px] bg-slate-100`}
                  >
                    {timeList.map((time, index) => (
                      <div
                        onClick={onSecondTimeClick}
                        className="hover:bg-themeLime h-12 px-4 py-3 flex-row items-center justify-end"
                        id={String(index)}
                        key={time}
                      >
                        <h2 className="text-center text-slate-700">{time}</h2>
                      </div>
                    ))}
                  </div>
                </div>
                <input
                  hidden
                  className="h-12 w-12 text-red-500"
                  value={isTime.second ? isTime.second : ""}
                  {...register("secondTime")}
                />
              </div>

              {/* 선호 운동종목 Box */}
              <div className="px-4 bg-white py-8 rounded-3xl flex flex-col justify-start gap-6 min-w-[36rem]">
                <h2 className="font-bold text-base">선호 운동 종목</h2>
                <div className="flex flex-row gap-4">
                  {trainingList.map((training, index) => (
                    <span
                      key={index}
                      onClick={onUpdateList}
                      id={training}
                      className={`${
                        isPreferlist.includes(training)
                          ? "border-slate-100 text-slate-100 bg-slate-500"
                          : "border-slate-500 text-slate-500"
                      } border px-4 py-2  rounded-full cursor-pointer`}
                    >
                      {training}
                    </span>
                  ))}
                </div>
                <input
                  hidden
                  className="h-12 text-red-500"
                  value={isPreferlist ? isPreferlist : []}
                  {...register("preferList")}
                />

                <h2 className="relative font-bold text-base">
                  일일 섭취량
                  <p className="absolute text-red-500 left-0 -bottom-4 text-xs">
                    {errors.kcal?.message}
                  </p>
                </h2>
                <div className="flex flex-row justify-start items-end gap-2">
                  <input
                    id="kcal"
                    className="h-12 w-56 border-2 border-themeLime focus:outline-none"
                    {...register("kcal", {
                      required: "일일 섭취량을 입력해주세요.",
                      pattern: {
                        value: /^\d+$/,
                        message: "소숫점을 제외한 숫자만 입력해주세요.",
                      },
                    })}
                  />
                  <label htmlFor="kcal" className="text-xl font-bold">
                    Kcal
                  </label>
                </div>
              </div>

              <div className="px-4 bg-white py-8 rounded-3xl flex flex-col justify-start gap-6 min-w-[36rem]">
                <h2 className="relative font-bold text-base">
                  원하는 목표는 무엇인가요?
                  <p className="absolute text-red-500 left-0 -bottom-4 text-xs">
                    {errors.goals?.message}
                  </p>
                </h2>
                <div className="flex flex-row justify-start items-end gap-2">
                  <input
                    id="goals"
                    placeholder="목표를 이루실때까지 WEE가 함께 할게요:D"
                    className="h-12 w-full border-2 border-themeLime px-2 focus:outline-none"
                    {...register("goals", {
                      required: "목표를 입력해주세요.",
                    })}
                  />
                </div>
              </div>

              <button className="h-14 w-72 mb-12 rounded-full x-4 y-2 bg-themeDark font-bold text-slate-100">
                루틴 확인하러 가기
              </button>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
}
