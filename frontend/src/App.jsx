import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import TodoForm from "./pages/TodoForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Todos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<TodoForm />} />
      <Route path="/edit/:id" element={<TodoForm />} />
    </Routes>
  );
};

export default App;
