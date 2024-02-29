import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import Community from "./pages/Community";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Signup from "./pages/Signup";
import KakaoLoginHandler from "./pages/LoginHandler/KakaoLoginHandler";
import GoogleLoginHandler from "./pages/LoginHandler/GoogleLoginHandler";
import NaverLoginHandler from "./pages/LoginHandler/NaverLoginHandler";
import InfoCollect from "./pages/InfoCollect";
import Goals from "./pages/Goals";

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/login`} element={<Login />} />
      <Route path={`/todo`} element={<TodoList />} />
      <Route path={`/community`} element={<Community />} />
      <Route path={`/mypage`} element={<MyPage />} />
      <Route path={`/signup`} element={<Signup />} />
      <Route
        path={`/wee/user/login/kakao/callback`}
        element={<KakaoLoginHandler />}
      />
      <Route
        path={`/wee/user/login/google/callback`}
        element={<GoogleLoginHandler />}
      />
      <Route
        path={`/wee/user/login/naver/callback`}
        element={<NaverLoginHandler />}
      />
      <Route path={`/info-collect`} element={<InfoCollect />} />
      <Route path={`/goals`} element={<Goals />} />
    </Routes>
  );
}
