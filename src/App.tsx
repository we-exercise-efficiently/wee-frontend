import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import CrewCommunity from './pages/CrewCommunity';
import ShareCommunity from './pages/ShareCommunity';
import QuestionCommunity from './pages/QuestionCommunity';
import Write from "./pages/Write";
import Post from "./pages/Post";
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
      <Route path={`/write`} element={<Write />} /> 
      <Route path={`/post/:postId`} element={<Post />} />
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
