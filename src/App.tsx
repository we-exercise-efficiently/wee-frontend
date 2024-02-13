import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import Community from "./pages/Community";
import Write from "./components/Write";

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/todo`} element={<TodoList />} />
      <Route path={`/community`} element={<Community />} />
      <Route path="/write" element={<Write />} /> {/* Write 페이지 경로 추가 */}
    </Routes>
  );
}
