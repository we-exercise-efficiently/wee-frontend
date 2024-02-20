import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLoginGoogle } from "../../apis/apis";

export default function GoogleLoginHandler(props: any) {
  const code = new URL(window.location.href).searchParams.get("code") || "";
  const nav = useNavigate();

  useEffect(() => {
    const googleLogin = async () => {
      try {
        console.log(code);

        const response = await postLoginGoogle(code);
        console.log("=== RESPONSE ===");
        console.log(response);
      } catch (error) {
        console.log("=== ERROR ===");
        console.error(error);
      } finally {
        nav("/");
      }
    };

    googleLogin();
  }, [props.history]);

  return (
    <>
      <h2>구글 로그인 중 입니다.</h2>
    </>
  );
}
