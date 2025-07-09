import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Board from "./pages/Board";
import TaskPage from "./pages/TaskPage"; // if you're using /task route

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
        <Route path="/task" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
