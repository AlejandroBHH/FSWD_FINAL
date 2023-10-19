import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useParams } from "react-router-dom"; // Importar useParams

const LoginPage = lazy(() => import("./views/Login/LoginPage"));
const SignupPage = lazy(() => import("./views/signup/SignupPage"));
const ForgotPassword = lazy(() =>
  import("./views/ForgotPassword/ForgotPassword")
);
const ChangePassword = lazy(() => import("./views/ForgotPassword/NewPassword"));
const Search = lazy(() => import("./views/Search/HomeSearch"));
const UserPage = lazy(() => import("../src/views/User/UserPage"));
const CreateStoryForm = lazy(() =>
  import("./views/CreateStory/CreateStoryForm")
);

function App() {
  useEffect(() => {
    const sessionExpirationTime = localStorage.getItem("sessionExpirationTime");

    if (sessionExpirationTime) {
      const sessionExpirationTimeAsNumber = parseFloat(sessionExpirationTime);
      const currentTime = Date.now();

      if (currentTime > sessionExpirationTimeAsNumber) {
        // La sesión ha expirado, redirige al usuario al login
        <Navigate to="/login" />;
      }
    }
  }, [Navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/NewStory"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <CreateStoryForm />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignupPage />
          </Suspense>
        }
      />
      <Route
        path="/ForgotPassword"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ChangePassword />
          </Suspense>
        }
      />
      <Route
        path={`/index/Page/:id.html`}
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentWithPagination />
          </Suspense>
        }
      />
      <Route
        path="/user"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <UserPage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <div>
            <h1>Página no encontrada</h1>
            <p>La URL que ingresaste no coincide con ninguna página.</p>
          </div>
        }
      />
    </Routes>
  );
}

// Nuevo componente para Component con paginación y useParams
function ComponentWithPagination() {
  const { id } = useParams(); // Obtener el valor de id de la URL
  //console.log(id);
  return <Search id={id} />; // Pasar el valor de id al componente Component
}

export default App;
