import { useForm } from "react-hook-form";
import Container from "../components/Container";
import useScrollReset from "../utils/useScrollReset";
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { postLogin } from "../apis/apis";
import { useNavigate } from "react-router-dom";

export interface ILoginDataProps {
  email: string;
  password: string;
}

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_KAKAO_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${
  import.meta.env.VITE_GOOGLE_CLIENT_ID
}&redirect_uri=${
  import.meta.env.VITE_GOOGLE_REDIRECT_URI
}&response_type=code&scope=profile`;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  import.meta.env.VITE_NAVER_CLIENT_ID
}&redirect_uri=http%3A%2F%2F43.200.2.121%3A3000%2Fwee%2Fuser%2Flogin%2Fnaver%2Fcallback&state=1234`;

/**
 * LJM 2024.01.08
 * @returns 로그인 페이지
 */
export default function Login() {
  const { register, handleSubmit } = useForm<ILoginDataProps>();
  const reset = useScrollReset();
  const nav = useNavigate();

  /**
   * validation 통과 시 실행 될 함수
   * @param data 로그인 데이터
   */
  const onValid = async (data: ILoginDataProps) => {
    try {
      const response = await postLogin(data);
      console.log(response);

      if (response.status === 200) {
        console.log("=== LOGIN SUCCESS ===");
        nav("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log(data);
    }
  };

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
            <label className="mb-1" htmlFor="email">
              이메일 또는 아이디
            </label>
            <input
              {...register("email", {
                minLength: {
                  message: "아이디는 최소 5글자 이상입니다.",
                  value: 5,
                },
              })}
              type="text"
              autoComplete="off"
              placeholder="name@weemail.com"
              id="email"
              className="rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime focus:outline-none focus:bg-transparent"
            />
            <label className="mb-1 mt-4">비밀번호</label>
            <input
              {...register("password")}
              type="password"
              autoComplete="off"
              placeholder="비밀번호"
              id="password"
              className="rounded-sm border-2 px-2 py-2 bg-transparent border-themeLime focus:outline-none focus:bg-transparent"
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
            <div className="cursor-pointer flex flex-col justify-center items-center w-12 h-12 rounded-full color-kakao">
              <a href={KAKAO_AUTH_URL}>
                <SiKakao fontSize={28} />
              </a>
            </div>
            <a href={NAVER_AUTH_URL}>
              <div className="cursor-pointer flex flex-col justify-center items-center w-12 h-12 rounded-full color-naver">
                <SiNaver />
              </div>
            </a>
            <a href={GOOGLE_AUTH_URL}>
              <div className="cursor-pointer flex flex-col justify-center items-center w-12 h-12 rounded-full bg-white text-themeDark">
                <SiGoogle />
              </div>
            </a>
          </div>
          <div className="flex-row flex mt-8 justify-between items-center">
            <h2 className="text-sm font-bold">아직 회원이 아니신가요?</h2>
            <p
              onClick={() => {
                reset("/signup");
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
