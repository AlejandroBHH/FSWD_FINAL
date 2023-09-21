import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/Login/LoginPage";
//import SignupPage from "./views/signup/SignupPage";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
