import React, { useEffect, useState } from "react";
import classes from "./FavHistory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//para verificar que lo elimina
import Modal from "../../utils/VerifyModal/VerifyModal";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Función para obtener las historias favoritas
const getFavoriteStories = async (userEmail) => {
  try {
    const authToken = localStorage.getItem("accessToken");

    const response = await fetch(
      `http://localhost:8000/get-favorites?user_email=${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data.data; // Retorna los datos de las historias favoritas
    } else {
      console.log("Error:", data.error);
      return []; // Retorna un array vacío en caso de error
    }
  } catch (error) {
    console.error("Error:", error);
    return []; // Retorna un array vacío en caso de excepción
  }
};
function FavHistory(props) {
  const [favoriteStories, setFavoriteStories] = useState([]);
  const [storyToRemove, setStoryToRemove] = useState(null); // Estado para almacenar la historia a eliminar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const stories = await getFavoriteStories(userEmail);
        setFavoriteStories(stories);
      } catch (error) {
        console.error("Error fetching favorite stories:", error);
      }
    };

    fetchData();
  }, []);

  // Función para eliminar una historia de favoritos
  const removeStory = async (storyId, userEmail) => {
    // Realizar solicitud POST para eliminar la historia de favoritos
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          story_id: storyId._id,
          user_email: userEmail,
        }),
      });

      if (response.ok) {
        // Éxito: puedes manejarlo aquí
        // Por ejemplo, puedes actualizar la lista de historias favoritas después de eliminar una
        const updatedStories = await getFavoriteStories(userEmail);
        setFavoriteStories(updatedStories);
      } else {
        // Error: puedes mostrar un mensaje de error o realizar otras acciones
        console.log(response.status);
      }
    } catch (error) {
      // Error en la solicitud
      console.error("Error:", error);
    } finally {
      // Luego de eliminar la historia, cierra el modal
      setStoryToRemove(null);
    }
  };
  //console.log(storyToRemove);
  return (
    <>
      {/* Modal de confirmación */}
      {storyToRemove && (
        <Modal
          visible={true}
          onConfirm={() =>
            removeStory(storyToRemove, localStorage.getItem("email"))
          }
          onCancel={() => setStoryToRemove(null)} // Cancela la eliminación
          story={storyToRemove} // Pasa la historia al modal
        >
          ¿Estás seguro de que deseas eliminar esta historia favorita?
        </Modal>
      )}
      <div className={classes.FavContainer}>
        <div className={classes.ButContainer}>
          <h3>Historias Favoritas</h3>

          {/* Agrega un botón "Crear Historia" que redirige al formulario */}
          <Link to="/crear-historia" className={classes.CreateStoryButton}>
            Add History
          </Link>
        </div>
        <ul className={classes.List}>
          {favoriteStories.map((story, index) => (
            <li key={index} className={classes.list}>
              {/* Renderiza los detalles de las historias aquí */}
              {/* Icono de eliminación */}
              <FontAwesomeIcon
                icon={faXmark}
                className={classes.RemoveButton}
                onClick={() => setStoryToRemove(story)} // Establece la historia a eliminar
              />
              <a href={`${story.href}`}>
                Título nº{index + 1}: {story.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FavHistory;
