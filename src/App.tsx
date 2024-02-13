import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import Community from "./pages/Community";
import Write from "./pages/Write";
import Post from "./pages/Post";

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/todo`} element={<TodoList />} />
      <Route path={`/community`} element={<Community />} />
      <Route path={`/write`} element={<Write />} /> 
      <Route path={`/post/:postId`} element={<Post />} />
    </Routes>
  );
}
