import { useState, useEffect } from "react";
import Navbar from "../../utils/Navigation/Navbar";
import UserProfile from "../User/UserProfile";
import EditProfileForm from "./EditProfileForm";
import { useNavigate } from "react-router-dom";
import "../User/UserPage.css";

import FavHistory from "../../components/History/FavHistory";
import Footer from "../../utils/Footer/Footer";

const UserPage = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null); // Inicialmente, el usuario es null hasta que se carguen los datos
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  //console.log(token);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Realiza el fetch para obtener los datos del usuario
        const response = await fetch(
          "http://localhost:8000/auth/get-user-data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        //console.log(response);
        const data1 = await response.json();
        if (response.ok) {
          setUser(data1.data.user); // Actualiza el estado con los datos del usuario
          console.log("User after setting:", user, response);
        } else {
          throw new Error(data1.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // useEffect(() => {
  //  console.log("User after setting:", user);
  //}, [user]);

  const handleEditClick = (e) => {
    setEditing(true);
  };

  const handleSave = async (updatedUser) => {
    //console.log(updatedUser);
    //console.log("hola");
    try {
      // Realiza el fetch para actualizar la información del usuario
      const response = await fetch(
        "http://localhost:8000/auth/update-user-data",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(updatedUser),
        }
      );
      //console.log(response);

      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        setUser(updatedUser); // Actualiza el estado con los datos actualizados del usuario
        setEditing(false);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleLogout = () => {
    // Limpiar el token de acceso y cualquier otra información de usuario almacenada
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <>
      <Navbar />

      <div className="userPage">
        <div className="userWrap">
          {user && (
            <>
              {editing ? (
                /*aquí recibe los datos de user y la edición se la pasa al handlesave para guardar los cambios*/
                <EditProfileForm user={user} onSave={handleSave} />
              ) : (
                <>
                  <UserProfile user={user} />
                  <div className="edit-button">
                    <button onClick={handleEditClick}>Edit Profile</button>
                    <button
                      onClick={handleLogout}
                      style={{ marginLeft: "5px", borderRadius: "3px" }}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <FavHistory></FavHistory>
      <Footer></Footer>
    </>
  );
};

export default UserPage;
