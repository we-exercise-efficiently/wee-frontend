import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * LJM 2024.01.07
 * @returns 상단 바
 */
export default function TopBar() {
  const [isLogin, setIsLogin] = useState(false);
  const nav = useNavigate();

  const onMove = (event: React.MouseEvent<HTMLHeadElement>) => {
    let destination = event.currentTarget.id;
    // 이동 할 장소 지정
    nav(`/${destination === "main" ? "" : destination}`);
  };

  const onLogout = () => {
    try {
      // API connection
      setIsLogin(false);
    } catch {
      // Error Handling
    } finally {
    }
    console.log("logout");
    // 추후 API 연결 예정
  };

  return (
    <div className="bg-slate-100 px-10 py-1 flex flex-row justify-between">
      <div id="main" onClick={onMove} className="cursor-pointer">
        {/* Symbol-Logo */}
        <img src="logo-symbol.svg" width={"28"} height={"27"} />
      </div>
      <div className="flex flex-row  gap-2 sm:gap-12 text-xs text-slate-700">
        <div className="border-r border-slate-400 flex items-center justify-center">
          {isLogin ? (
            <h2
              onClick={onLogout}
              id="login"
              className="mr-2 sm:mr-12 cursor-pointer"
            >
              로그 아웃
            </h2>
          ) : (
            <h2
              onClick={onMove}
              id="login"
              className="mr-2 sm:mr-12 cursor-pointer"
            >
              로 그 인
            </h2>
          )}
        </div>
        <div className="border-r border-slate-400 flex items-center justify-center">
          <h2
            onClick={onMove}
            id="signup"
            className="mr-2 sm:mr-12 cursor-pointer"
          >
            회원 가입
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <h2
            onClick={onMove}
            id="mypage"
            className="mr-2 sm:mr-12 cursor-pointer"
          >
            마이 페이지
          </h2>
        </div>
      </div>
    </div>
  );
}
