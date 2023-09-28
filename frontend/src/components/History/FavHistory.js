import React, { useEffect, useState } from "react";
import classes from "./FavHistory.module.css"; // Asegúrate de importar tus estilos aquí

// conseguimos el token
const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

// Función para obtener las historias favoritas
const getFavoriteStories = async (userEmail) => {
  try {
    const authToken = getAuthToken();

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

  return (
    <div>
      <h3>Historias Favoritas</h3>
      <ul>
        {favoriteStories.map((story, index) => (
          <li key={index}>
            {/* Renderiza los detalles de las historias aquí */}
            <a href={`${story.href}`}>
              Título nº{index}: {story.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavHistory;
