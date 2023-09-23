import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/Login/LoginPage";
import SignupPage from "./views/signup/SignupPage";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ChangePassword from "./views/ForgotPassword/NewPassword";
import Search from "./views/Search/HomeSearch";
import { useParams } from "react-router-dom"; // Importar useParams
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ChangePassword />} />
      <Route
        path={`/index/Page/:id.html`}
        element={<ComponentWithPagination />}
      />
    </Routes>
  );
}

// Nuevo componente para Component con paginación y useParams
function ComponentWithPagination() {
  const { id } = useParams(); // Obtener el valor de id de la URL
  console.log(id);
  return <Search id={id} />; // Pasar el valor de id al componente Component
}

export default App;
