import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useParams } from "react-router-dom"; // Import useParams
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
            <h1>Page not found</h1>
            <p>The URL you entered does not match any page.</p>
          </div>
        }
      />
    </Routes>
  );
}

// New component for Component with pagination and useParams
function ComponentWithPagination() {
  const { id } = useParams(); // Get the value of id from the URL
  // console.log(id);
  return <Search id={id} />; // Pass the value of id to the Component component
}

function EditStories() {
  const { id } = useParams(); // Get the value of id from the URL
  // console.log(id);
  return <EditStoryForm id={id} />; // Pass the value of id to the Component component
}

export default App;
