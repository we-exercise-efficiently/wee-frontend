import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useScrollReset from "../utils/useScrollReset";
import { postSignup } from "../apis/apis";

export interface ISignupProps {
  signupId: string;
  signupPassword: string;
  signupPasswordCheck?: string;
  signupNickname: string;
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
        const response = await postSignup(data);
        console.log(response);
        if (response.status === 200) {
          // 추후 조건 수정
          console.log("==== Singup Success ====");
          reset("/login");
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log(data);
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
    const isIdValid = await trigger("signupId");
    const isPasswordValid = await trigger("signupPassword");
    const isPasswordCheckValid = await trigger("signupPasswordCheck");

    if (isIdValid && isPasswordValid && isPasswordCheckValid) {
      if (getValues("signupPassword") === getValues("signupPasswordCheck")) {
        onNextPage();
      } else {
        setError("signupPasswordCheck", {
          message: "* 비밀번호가 일치하지 않습니다",
        });
      }
    }
  };

  /**
   * 두번째 회원가입 탭 유효성 검사 추후 duplicate 사용 예정
   */
  const onSecondTab = async () => {
    const isNicknameValid = await trigger("signupNickname");

    if (isNicknameValid) {
      // 닉네임 유효성이 통과했을 경우
      try {
        onNextPage();
      } catch (error) {
      } finally {
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
                <div className="w-full relative">
                  <input
                    {...register("signupId", {
                      required: "* 아이디를 입력해 주세요.",
                      minLength: {
                        message: "* 아이디는 최소 5글자 이상입니다.",
                        value: 5,
                      },
                    })}
                    onChange={() => {
                      clearErrors("signupId");
                    }}
                    type="text"
                    autoComplete="off"
                    placeholder="name@weemail.com"
                    id="signupId"
                    className="focus:outline-none focus:bg-transparent w-full rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime"
                  />
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {errors?.signupId?.message}
                  </p>
                </div>

                <label className="mb-1 mt-6" htmlFor="signupPassword">
                  비밀번호
                </label>
                <div className="w-full relative">
                  <input
                    {...register("signupPassword", {
                      required: "* 비밀번호를 입력해 주세요.",
                      minLength: {
                        message: "* 비밀번호는 최소 8글자 이상입니다.",
                        value: 8,
                      },
                    })}
                    onChange={() => {
                      clearErrors("signupPassword");
                    }}
                    type="password"
                    autoComplete="off"
                    placeholder="비밀번호"
                    id="signupPassword"
                    className="focus:outline-none w-full rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime focus:bg-transparent"
                  />
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {errors?.signupPassword?.message}
                  </p>
                </div>
                <label className="mb-1 mt-6" htmlFor="signupPasswordCheck">
                  비밀번호 확인
                </label>
                <div className="w-full relative">
                  <input
                    {...register("signupPasswordCheck", {
                      required: "* 비밀번호를 입력해 주세요.",
                      minLength: {
                        message: "* 비밀번호는 최소 8글자 이상입니다.",
                        value: 8,
                      },
                    })}
                    onChange={() => {
                      clearErrors("signupPasswordCheck");
                    }}
                    type="password"
                    autoComplete="off"
                    placeholder="비밀번호 확인"
                    id="signupPasswordCheck"
                    className="focus:outline-none w-full rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime focus:bg-transparent"
                  />
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {errors?.signupPasswordCheck?.message}
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
                    {...register("signupNickname", {
                      required: "* 닉네임을 입력해 주세요.",
                      minLength: {
                        message: "* 닉네임은 최소 2글자 이상입니다.",
                        value: 2,
                      },
                    })}
                    onChange={() => {
                      clearErrors("signupNickname");
                    }}
                    placeholder="닉네임 입력"
                    autoComplete="off"
                    type="text"
                    id="signupNickname"
                    className="focus:outline-none focus:bg-transparent w-full rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime"
                  />
                  <p className="absolute left-0 -bottom-5 text-xs text-red-400">
                    {errors?.signupNickname?.message}
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
