import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLoginKakao } from "../../apis/apis";

export default function KakaoLoginHandler(props: any) {
  const code = new URL(window.location.href).searchParams.get("code") || "";
  const nav = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await postLoginKakao(code);
        console.log("=== RESPONSE ===");
        console.log(response);
      } catch (error) {
        console.log("=== ERROR ===");
        console.error(error);
      } finally {
        nav("/");
      }
    };

    kakaoLogin();
  }, [props.history]);

  return (
    <>
      <h2>로그인 중 입니다.</h2>
    </>
  );
}
