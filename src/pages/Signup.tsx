import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useScrollReset from "../utils/useScrollReset";
import { getEmailValidation, postSignup } from "../apis/apis";
import { ILogTypes, logHandler } from "../utils/logHandler";

export interface ISignupProps {
  email: string;
  password: string;
  passwordCheck?: string;
  nickname: string;
}

interface ITermsProps {
  all: boolean;
  needs1: boolean;
  needs2: boolean;
  needs3: boolean;
  select1: boolean;
  select2: boolean;
}

/**
 * LJM 2024.01.18
 *
 * @returns 회원가입 페이지
 */
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    trigger,
    clearErrors,
  } = useForm<ISignupProps>();

  const [isPage, setIsPage] = useState(0);
  // 회원가입 시 넘어가는 페이지 state
  const [isTermMessage, setIsTermMessage] = useState<string>("");
  // 이용약관 메세지
  const [isTerms, setIsTerms] = useState<ITermsProps>({
    all: false,
    needs1: false,
    needs2: false,
    needs3: false,
    select1: false,
    select2: false,
  }); // 동의 체크여부

  const [isDuplicated, setIsDuplicated] = useState<boolean>(true);

  const [isUsable, setIsUsable] = useState<string>("");

  const reset = useScrollReset();

  /**
   * 다음 페이지 함수
   */
  const onNextPage = () => {
    setIsPage((current) => (current += 1));
  };

  /**
   * 모든 동의여부 체크 함수
   */
  const onSelectAll = () => {
    setIsTerms({
      all: true,
      needs1: true,
      needs2: true,
      needs3: true,
      select1: true,
      select2: true,
    });
    onRemoveMessage();
  };

  /**
   * 메세지를 비우는 함수 (동의 체크 메세지)
   */
  const onRemoveMessage = () => {
    if (isTerms.needs1 && isTerms.needs2 && isTerms.needs3) {
      // 전부다 눌렸을 경우
      setIsTermMessage("");
      // 공백란으로
    }
  };

  /**
   * validation 을 만족 시켰을 시 실행될 함수
   * @param data 회원가입 데이터
   */
  const onValid = async (data: ISignupProps) => {
    if (isTerms.needs1 && isTerms.needs2 && isTerms.needs3) {
      // 필수 선택란을 전부 선택했을 시
      try {
        // 추후 API 추가
        logHandler({ text: `SIGNUP START >>`, type: ILogTypes.NORMAL });
        const response = await postSignup(data);
        console.log(response);
        if (response.status === 200) {
          // 추후 조건 수정
          logHandler({ text: `SIGNUP SUCCESS`, type: ILogTypes.NORMAL });
          reset("/login");
        }
      } catch (error) {
        console.error(error);
        logHandler({ text: `SIGNUP FAILED`, type: ILogTypes.WARNNING });
      } finally {
        console.log(data);
        logHandler({ text: `<< SIGNUP END`, type: ILogTypes.NORMAL });
      }
    } else {
      setIsTermMessage("* 필수 선택란을 선택해 주세요.");
    }
  };

  /**
   * 첫번째 회원가입 탭 유효성 검사 추후 duplicate 사용 예정
   *
   * back-end 와 추후 validation 설정 논의
   */
  const onFirstTab = async () => {
    const isIdValid = await trigger("email");
    const isPasswordValid = await trigger("password");
    const isPasswordCheckValid = await trigger("passwordCheck");

    if (isIdValid && isPasswordValid && isPasswordCheckValid && !isDuplicated) {
      if (getValues("password") === getValues("passwordCheck")) {
        onNextPage();
      } else {
        setError("passwordCheck", {
          message: "* 비밀번호가 일치하지 않습니다",
        });
      }
    }
  };

  /**
   * 두번째 회원가입 탭 유효성 검사 추후 duplicate 사용 예정
   */
  const onSecondTab = async () => {
    const isNicknameValid = await trigger("nickname");

    if (isNicknameValid) {
      // 닉네임 유효성이 통과했을 경우
      try {
        onNextPage();
      } catch (error) {
      } finally {
      }
    }
  };

  /**
   * LJM 2024.03.06
   * 현재 Server Network Error 가 발생
   * DeadLine 이 다가오므로 일단 구현
   * (2024.03.18 수정 완료)
   */
  const onCheck = async () => {
    let email = getValues("email");
    let validate = await trigger("email");
    if (email && validate) {
      try {
        const response = await getEmailValidation(email);
        logHandler({
          text: `REQUEST START >>`,
          type: ILogTypes.NORMAL,
        });

        if (response.data.code === 200) {
          console.log(response);
          // 정상적으로 사용 가능한 이메일이면
          logHandler({
            text: `USABLE EMAIL`,
            type: ILogTypes.SUCCESS,
          });
          setIsUsable("사용 가능한 이메일 입니다.");
          setIsDuplicated(false);
          //
        } else {
          logHandler({
            text: `CANNOT USABLE EMAIL`,
            type: ILogTypes.WARNNING,
          });

          setIsUsable("");
          setIsDuplicated(true);
          // 그렇지 않으면
          setError("email", {
            message: "사용 할 수 없는 이메일 입니다.",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        logHandler({ text: `<< REQUEST END`, type: ILogTypes.NORMAL });
      }
    }
  };

  return (
    <Container>
      <div className="bg-themeDark text-gray-100 min-h-[100vh] flex flex-col justify-start items-center">
        <div className="flex flex-col gap-2 justify-start items-center mt-12 mb-8 w-72">
          {/* TEXT-BOX */}
          <h1 className="text-4xl font-bold">회원 가입</h1>
        </div>
        {/* UNDERLINE BAR */}
        <div className="flex-row flex mb-8">
          <div
            className={`h-2 w-56 border-b-2 ${
              isPage === 0 ? "border-themeLime" : "border-gray-100"
            }`}
          />
          <div
            className={`h-2 w-56 border-b-2 ${
              isPage === 1 ? "border-themeLime" : "border-gray-100"
            }`}
          />
          <div
            className={`h-2 w-56 border-b-2 ${
              isPage === 2 ? "border-themeLime" : "border-gray-100"
            }`}
          />
        </div>
        <div>
          {/* FORM DATA */}
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-row w-auto"
          >
            <div
              className={`w-[54rem] ${
                isPage === 0 ? "flex" : "hidden"
              } flex-col justify-center items-center fade-in`}
            >
              {/* FIRST PAGE */}
              <div id="first" className={`flex flex-col w-72`}>
                <label className="mb-1" htmlFor="loginId">
                  이메일 또는 아이디
                </label>
                <div className="flex flex-row justify-between items-center w-full relative">
                  <input
                    {...register("email", {
                      required: "* 아이디를 입력해 주세요.",
                      minLength: {
                        message: "* 아이디는 최소 5글자 이상입니다.",
                        value: 5,
                      },
                    })}
                    onChange={() => {
                      clearErrors("email");
                      setIsDuplicated(true);
                      setIsUsable("");
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="name@weemail.com"
                    id="email"
                    className="focus:outline-none focus:bg-transparent w-full rounded-t-sm rounded-b-sm rounded-l-sm border-2 px-2 py-2 bg-transparent border-themeLime"
                  />
                  <div
                    onClick={onCheck}
                    className="cursor-pointer flex rounded-r-sm bg-themeLime py-1 border-themeLime border-2 flex-col justify-center items-center px-4 text-xs"
                  >
                    <h2 className="text-center text-themeDark font-bold">
                      중복 확인
                    </h2>
                  </div>

                  {isUsable === "" ? (
                    <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                      {errors?.email?.message}
                    </p>
                  ) : (
                    <p className="absolute left-0 -bottom-5 text-xs text-green-400">
                      {isUsable}
                    </p>
                  )}
                </div>

                <label className="mb-1 mt-6" htmlFor="password">
                  비밀번호
                </label>
                <div className="w-full relative">
                  <input
                    {...register("password", {
                      required: "* 비밀번호를 입력해 주세요.",
                      minLength: {
                        message: "* 비밀번호는 최소 8글자 이상입니다.",
                        value: 8,
                      },
                    })}
                    onChange={() => {
                      clearErrors("password");
                    }}
                    type="password"
                    autoComplete="off"
                    placeholder="비밀번호"
                    id="password"
                    className="focus:outline-none w-full rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime focus:bg-transparent"
                  />
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {errors?.password?.message}
                  </p>
                </div>
                <label className="mb-1 mt-6" htmlFor="passwordCheck">
                  비밀번호 확인
                </label>
                <div className="w-full relative">
                  <input
                    {...register("passwordCheck", {
                      required: "* 비밀번호를 입력해 주세요.",
                      minLength: {
                        message: "* 비밀번호는 최소 8글자 이상입니다.",
                        value: 8,
                      },
                    })}
                    onChange={() => {
                      clearErrors("passwordCheck");
                    }}
                    type="password"
                    autoComplete="off"
                    placeholder="비밀번호 확인"
                    id="passwordCheck"
                    className="focus:outline-none w-full rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime focus:bg-transparent"
                  />
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {errors?.passwordCheck?.message}
                  </p>
                </div>

                <div
                  onClick={onFirstTab}
                  className="cursor-pointer mt-12 text-center w-full py-2 bg-themeLime text-themeDark font-bold text-sm border-2 border-themeLime rounded-full"
                >
                  다음
                </div>
              </div>
            </div>
            <div
              className={`w-[54rem] ${
                isPage === 1 ? "flex" : "hidden"
              } flex-col justify-center items-center fade-in`}
            >
              {/* SECOND PAGE */}
              <div id="second" className={`flex flex-col w-72`}>
                <h2 className="text-xl font-bold">WEE 와 함께하실 회원님을</h2>
                <h2 className="text-xl font-bold">어떻게 불러드릴까요?</h2>
                <label className="mb-1 mt-12" htmlFor="loginId">
                  닉네임
                </label>
                <div className="w-full relative">
                  <input
                    {...register("nickname", {
                      required: "* 닉네임을 입력해 주세요.",
                      minLength: {
                        message: "* 닉네임은 최소 2글자 이상입니다.",
                        value: 2,
                      },
                    })}
                    onChange={() => {
                      clearErrors("nickname");
                    }}
                    placeholder="닉네임 입력"
                    autoComplete="off"
                    type="text"
                    id="nickname"
                    className="focus:outline-none focus:bg-transparent w-full rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime"
                  />
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {errors?.nickname?.message}
                  </p>
                </div>

                <div
                  onClick={onSecondTab}
                  className="cursor-pointer mt-28 text-center w-full py-2 bg-themeLime text-themeDark font-bold text-sm border-2 border-themeLime rounded-full"
                >
                  다음
                </div>
              </div>
            </div>
            <div
              className={`w-[54rem] ${
                isPage === 2 ? "flex" : "hidden"
              } flex-col justify-center items-center fade-in`}
            >
              {/* THIRD PAGE */}
              <div id="third" className={`flex flex-col w-72`}>
                <h2 className="text-xl font-bold">WEE 서비스 이용약관에</h2>
                <h2 className="text-xl font-bold">동의 해주세요.</h2>

                <div className="flex mt-8 w-72 flex-col relative">
                  <div
                    onClick={onSelectAll}
                    className="flex flex-row justify-start items-center gap-2 pb-2 border-gray-500 border-b w-72"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={`w-6 h-6 border-gray-500 border-2 ${
                        isTerms.all === true &&
                        isTerms.needs1 === true &&
                        isTerms.needs2 === true &&
                        isTerms.needs3 === true &&
                        isTerms.select1 === true &&
                        isTerms.select2 === true &&
                        "text-themeLime"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h2 className="text-xs">모두 동의 (선택적 동의 포함)</h2>
                  </div>

                  <div
                    onClick={() => {
                      setIsTerms((prev) => {
                        return {
                          ...prev,
                          needs1: !prev.needs1,
                        };
                      });
                      onRemoveMessage();
                    }}
                    className="cursor-pointer flex flex-row justify-start items-center gap-2 pb-2 mt-2 w-72"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={`w-6 h-6 border-transparent border-2 ${
                        isTerms.needs1 === true && "text-themeLime"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h2 className="text-xs">[필수] 만 15세 이상입니다.</h2>
                  </div>

                  <div
                    onClick={() => {
                      setIsTerms((prev) => {
                        return {
                          ...prev,
                          needs2: !prev.needs2,
                        };
                      });
                      onRemoveMessage();
                    }}
                    className="cursor-pointer flex flex-row justify-start items-center gap-2 pb-2 mt-1 w-72"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={`w-6 h-6 border-transparent border-2 ${
                        isTerms.needs2 === true && "text-themeLime"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h2 className="text-xs">[필수] 이용약관 동의</h2>
                  </div>

                  <div
                    onClick={() => {
                      setIsTerms((prev) => {
                        return {
                          ...prev,
                          needs3: !prev.needs3,
                        };
                      });
                      onRemoveMessage();
                    }}
                    className="cursor-pointer flex flex-row justify-start items-center gap-2 pb-2 mt-1 w-72"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={`w-6 h-6 border-transparent border-2 ${
                        isTerms.needs3 === true && "text-themeLime"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h2 className="text-xs">
                      [필수] 개인정보 수집 및 이용 동의
                    </h2>
                  </div>

                  <div
                    onClick={() => {
                      setIsTerms((prev) => {
                        return {
                          ...prev,
                          select1: !prev.select1,
                        };
                      });
                      onRemoveMessage();
                    }}
                    className="cursor-pointer flex flex-row justify-start items-center gap-2 pb-2 mt-1 w-72"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={`w-6 h-6 border-transparent border-2 ${
                        isTerms.select1 === true && "text-themeLime"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h2 className="text-xs">
                      [선택] 마케팅 목적 개인정보 수집 및 이용 동의
                    </h2>
                  </div>

                  <div
                    onClick={() => {
                      setIsTerms((prev) => {
                        return {
                          ...prev,
                          select2: !prev.select2,
                        };
                      });
                      onRemoveMessage();
                    }}
                    className="cursor-pointer flex flex-row justify-start items-center gap-2 pb-2 mt-1 w-72"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={`w-6 h-6 border-transparent border-2 ${
                        isTerms.select2 === true && "text-themeLime"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h2 className="text-xs">[선택] 광고성 정보 수신 동의</h2>
                  </div>
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {isTermMessage}
                  </p>
                </div>

                {/* SIGNUP BUTTON */}
                <button className="cursor-pointer mt-12 text-center w-full py-2 bg-themeLime text-themeDark font-bold text-sm border-2 border-themeLime rounded-full">
                  동의하고 가입하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
