import { useEffect } from "react";
import { postLoginNaver } from "../../apis/apis";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function NaverLoginHandler(props: any) {
  const code = new URL(window.location.href).searchParams.get("code") || "";
  const nav = useNavigate();

  useEffect(() => {
    const naverLogin = async () => {
      try {
        const response = await postLoginNaver(code);
        console.log("=== RESPONSE ===");
        console.log(response);
      } catch (error) {
        console.log("=== ERROR ===");
        console.error(error);
      } finally {
        nav("/");
      }
    };

    naverLogin();
  }, [props.history]);

  return (
    <div className="w-screen h-screen bg-themeDark">
      <Loading />
    </div>
  );
}
