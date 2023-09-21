import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/Login/LoginPage";
import SignupPage from "./views/signup/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
