import { useForm } from "react-hook-form";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";

export interface ILoginDataProps {
  loginId: string;
  loginPassword: string;
}

/**
 * LJM 2024.01.08
 * @returns 로그인 페이지
 */
export default function Login() {
  const { register, handleSubmit } = useForm<ILoginDataProps>();
  const nav = useNavigate();

  const onValid = () => {};

  return (
    <Container>
      <div className="bg-themeDark text-gray-100 min-h-[100vh] flex flex-col justify-start items-center">
        <div className="flex flex-col gap-2 justify-start items-start mt-12 mb-12 w-72">
          {/* TEXT-BOX */}
          <h1 className="text-4xl font-bold">WEE 와</h1>
          <h1 className="text-4xl font-bold">함께</h1>
          <h1 className="text-4xl font-bold">운동하기</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col w-72">
            <label className="mb-1" htmlFor="loginId">
              이메일 또는 아이디
            </label>
            <input
              {...register("loginId", {
                minLength: {
                  message: "아이디는 최소 5글자 이상입니다.",
                  value: 5,
                },
              })}
              placeholder="name@weemail.com"
              id="loginId"
              className="rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime"
            />
            <label className="mb-1 mt-4">비밀번호</label>
            <input
              {...register("loginPassword", {
                minLength: {
                  message: "비밀번호는 최소 8글자 이상입니다.",
                  value: 8,
                },
              })}
              placeholder="비밀번호"
              id="loginPassword"
              className="rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime focus:bg-transparent"
            />

            <button className="mt-12 text-center w-full py-2 bg-themeLime text-themeDark font-bold text-sm border-2 border-themeLime rounded-full">
              로그인하기
            </button>
          </form>

          <div className="border-b h-6 border-gray-500 mt-4 relative">
            <h2 className="absolute left-20 text-sm -bottom-3 bg-themeDark px-6">
              간편 로그인
            </h2>
          </div>
          <div className="mt-8 flex flex-row items-center justify-around">
            <div className="w-12 h-12 rounded-full bg-themeBlue" />
            <div className="w-12 h-12 rounded-full bg-themeBlue" />
            <div className="w-12 h-12 rounded-full bg-themeBlue" />
            <div className="w-12 h-12 rounded-full bg-themeBlue" />
          </div>
          <div className="flex-row flex mt-8 justify-between items-center">
            <h2 className="text-sm font-bold">아직 회원이 아니신가요?</h2>
            <p
              onClick={() => {
                nav("/signup");
              }}
              className="text-sm underline cursor-pointer"
            >
              회원 가입하기
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
