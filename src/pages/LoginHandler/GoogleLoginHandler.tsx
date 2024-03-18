import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGoogleLoginData, postLoginGoogle } from "../../apis/apis";
import Loading from "../../components/Loading";

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
        const getEmail = await getGoogleLoginData(response.data.accessToken);
        console.log(getEmail);
      } catch (error) {
        console.log("=== ERROR ===");
        console.error(error);
      } finally {
        nav("/");
      }
    };

    googleLogin();
  }, [props.history]);

  return <Loading />;
}
