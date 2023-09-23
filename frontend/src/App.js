import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/Login/LoginPage";
import SignupPage from "./views/signup/SignupPage";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ChangePassword from "./views/ForgotPassword/NewPassword";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
