import React, { useEffect, useState } from "react";
import classes from "./DashBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

//para verificar que lo elimina
import Modal from "../../utils/VerifyModal/VerifyModal";
import { Link } from "react-router-dom";
import LateralNavbar from "../../utils/LateralNavbar/LateralNavbar";
import Footer from "../../utils/Footer/Footer";

// Función para obtener las historias favoritas
const getCreatedStories = async (userEmail) => {
  try {
    const authToken = localStorage.getItem("accessToken");

    const response = await fetch(
      `http://localhost:8000/library/created-books/`,
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
      console.log(data);
      return data.data; // Retorna los datos de las historias creadas
    } else {
      console.log("Error:", data.error);
      return []; // Retorna un array vacío en caso de error
    }
  } catch (error) {
    console.error("Error:", error);
    return []; // Retorna un array vacío en caso de excepción
  }
};

function DashBoard() {
  const [createdStory, setCreatedStory] = useState([]);
  const [storyToRemove, setStoryToRemove] = useState(null); // Estado para almacenar la historia a eliminar
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const stories = await getCreatedStories(userEmail);
        setCreatedStory(stories);
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
      const response = await fetch(
        "http://localhost:8000/library/delete-books",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("accessToken"),
          },
        }
      );

      if (response.ok) {
        // Éxito: puedes manejarlo aquí
        // Por ejemplo, puedes actualizar la lista de historias favoritas después de eliminar una
        const updatedStories = await getCreatedStories(userEmail);
        setCreatedStory(updatedStories);
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

  const toggle = (index) => {
    setIsActive((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  //console.log(storyToRemove);
  return (
    <>
      {/* Modal de confirmación */}
      {storyToRemove && (
        <Modal
          visible={true}
          onConfirm={() => removeStory(storyToRemove)}
          onCancel={() => setStoryToRemove(null)} // Cancela la eliminación
          story={storyToRemove} // Pasa la historia al modal
        >
          ¿Estás seguro de que deseas eliminar esta historia?
        </Modal>
      )}
      <div style={{ display: "flex" }}>
        {" "}
        <LateralNavbar></LateralNavbar>
        <div className={classes.FavContainer}>
          <div className={classes.ButContainer}>
            <h3>Favorite Stories</h3>
            {/* Agrega un botón "Crear Historia" que redirige al formulario */}
            <Link to="/NewStory" className={classes.CreateStoryButton}>
              All Stories
            </Link>
          </div>
          <div style={{ height: "90%", padding: "10px" }}>
            <ul className={classes.List}>
              {createdStory.length > 0 ? (
                createdStory.map((story, index) => (
                  <li
                    key={index}
                    className={classes.list}
                    onClick={(e) => {
                      toggle(index);
                    }}
                  >
                    {/* Renderiza los detalles de las historias aquí */}
                    {/* Icono de eliminación */}
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={classes.RemoveButton}
                      style={{ position: "relative" }}
                      onClick={() => setStoryToRemove(story)} // Establece la historia a eliminar
                    />
                    <img
                      className={classes.stories}
                      src={`http://localhost:8000/${story.image}`}
                      alt="Story Image"
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <a>
                        Title nº{index + 1}: {story.title} - {story.date}
                      </a>
                      <p>{story.synopsis}</p>
                      <div
                        style={{
                          borderTop: "1px solid rgba(76, 76, 76, 0.1)",
                        }}
                        className={
                          isActive[index] ? classes.active : classes.noActive
                        }
                      >
                        {" "}
                      </div>
                      <p
                        className={
                          isActive[index] ? classes.active : classes.noActive
                        }
                      >
                        {story.content}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p>You dont have any Story created</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default DashBoard;
