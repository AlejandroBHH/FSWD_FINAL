import React, { useEffect, useState } from "react";
import classes from "./FavHistory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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

  // Función para agregar o quitar historias de favoritos
  const handleAddToFavorites = async (storyId, userEmail) => {
    // Realizar solicitud POST para agregar o quitar la historia de favoritos
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          story_id: storyId._id,
          title: storyId.title,
          href: storyId.href,
          user_email: userEmail,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Éxito: puedes manejarlo aquí
        // Por ejemplo, puedes actualizar la lista de historias favoritas después de agregar/quitar una nueva
        const updatedStories = await getFavoriteStories(userEmail);
        setFavoriteStories(updatedStories);
      } else {
        // Error: puedes mostrar un mensaje de error o realizar otras acciones
        console.log(response.status);
      }
    } catch (error) {
      // Error en la solicitud
      console.error("Error:", error);
    }
  };

  return (
    <div className={classes.FavContainer}>
      <h3>Historias Favoritas</h3>
      <ul className={classes.List}>
        {favoriteStories.map((story, index) => (
          <li key={index} className={classes.list}>
            {/* Renderiza los detalles de las historias aquí */}

            <FontAwesomeIcon
              icon={faXmark}
              className={classes.RemoveButton}
              onClick={() =>
                handleAddToFavorites(story, localStorage.getItem("email"))
              }
            />

            <a href={`${story.href}`}>
              Título nº{index + 1}: {story.title}
            </a>
            {/* Agregar o quitar de favoritos */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavHistory;
