import { useState, useEffect } from "react";
import Navbar from "../../utils/Navigation/Navbar";
import UserProfile from "../User/UserProfile";
import EditProfileForm from "./EditProfileForm";

import "../User/UserPage.css";

import FavoriteStories from "../../components/FavoriteStories/FavoriteStories";
import Footer from "../../utils/Footer/Footer";

const UserPage = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null); // Inicialmente, el usuario es null hasta que se carguen los datos

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
          //console.log("User after setting:", user, response);
        } else {
          throw new Error(data1.error);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCancelClick = (e) => {
    setEditing(false);
  };

  const handleEditClick = (e) => {
    setEditing(true);
  };

  const handleSave = async (updatedUser) => {
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
      console.log("Error updating user data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "20px", minHeight: "80vh" }}>
        <div className="userPage">
          <div className="userWrap">
            {user && (
              <>
                {editing ? (
                  /*aquí recibe los datos de user y la edición se la pasa al handlesave para guardar los cambios*/
                  <EditProfileForm
                    user={user}
                    onSave={handleSave}
                    onCancel={handleCancelClick}
                  />
                ) : (
                  <>
                    <UserProfile user={user} />
                    <div className="edit-button">
                      <button onClick={handleEditClick}>Edit Profile</button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <FavoriteStories data={user}></FavoriteStories>
      </div>
      <Footer></Footer>
    </>
  );
};

export default UserPage;
