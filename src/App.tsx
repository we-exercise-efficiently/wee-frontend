import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import CrewCommunity from './pages/CrewCommunity';
import ShareCommunity from './pages/ShareCommunity';
import QuestionCommunity from './pages/QuestionCommunity';
import CrewWrite from "./pages/CrewWrite";
import CrewPost from "./pages/CrewPost";
import SharePost from "./pages/SharePost";
import QuestionPost from "./pages/QuestionPost";
import Login from './pages/Login';
import MyPage from "./pages/MyPage";
import Signup from "./pages/Signup";
import KakaoLoginHandler from "./pages/LoginHandler/KakaoLoginHandler";
import GoogleLoginHandler from "./pages/LoginHandler/GoogleLoginHandler";
import NaverLoginHandler from "./pages/LoginHandler/NaverLoginHandler";

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/login`} element={<Login />} />
      <Route path={`/todo`} element={<TodoList />} />
      <Route path={`/community/crew`} element={<CrewCommunity />} />
      <Route path={`/community/question`} element={<QuestionCommunity />} />
      <Route path={`/community/share`} element={<ShareCommunity />} />
      <Route path={`/community/crew/write`} element={<CrewWrite />} /> 
      <Route path={`/community/crew/:crewId`} element={<CrewPost />} />
      <Route path={`/community/share/:shareId`} element={<SharePost />} />
      <Route path={`/community/question/:questionId`} element={<QuestionPost />} />
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
    </Routes>
  );
}
