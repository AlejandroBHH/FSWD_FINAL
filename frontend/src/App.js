import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useParams } from "react-router-dom"; // Importar useParams
import Fictions from "./views/Fictions/Fictions";

const LoginPage = lazy(() => import("./views/Login/LoginPage"));
const ForgotPassword = lazy(() =>
  import("./views/ForgotPassword/ForgotPassword")
);
const ChangePassword = lazy(() => import("./views/ForgotPassword/NewPassword"));
const Search = lazy(() => import("./views/Search/HomeSearch"));
const UserPage = lazy(() => import("../src/views/User/UserPage"));
const CreateStoryForm = lazy(() =>
  import("./views/CreateStory/CreateStoryForm")
);
const EditStoryForm = lazy(() => import("./views/CreateStory/EditStoryForm"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage isLogin={true} />
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
            <LoginPage isLogin={false} />
          </Suspense>
        }
      />
      <Route
        path="/forgotPassword"
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
        path={`/index/Page/:id`}
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentWithPagination />
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <UserPage />
          </Suspense>
        }
      />
      <Route
        path="/fictions"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Fictions />
          </Suspense>
        }
      />
      <Route
        path="/edit-story/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EditStories />
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

function EditStories() {
  const { id } = useParams(); // Obtener el valor de id de la URL
  //console.log(id);
  return <EditStoryForm id={id} />; // Pasar el valor de id al componente Component
}

export default App;
