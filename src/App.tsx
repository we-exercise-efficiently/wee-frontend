import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import Community from "./pages/Community";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/login`} element={<Login />} />
      <Route path={`/todo`} element={<TodoList />} />
      <Route path={`/community`} element={<Community />} />
    </Routes>
  );
}
