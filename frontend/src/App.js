import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/Login/LoginPage";
import SignupPage from "./views/signup/SignupPage";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
