import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Atoms/LoginForm/LoginForm";
import RegisterForm from "./Components/Atoms/Register/Register";
import Dashboard from "./Components/Dashboard/Dashboard"; 
import UserTable from "./Components/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/homepage" element={<UserTable/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
