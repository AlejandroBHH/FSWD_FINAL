import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Fictions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//para verificar que lo elimina
import Modal from "../../utils/VerifyModal/VerifyModal";

import LateralNavbar from "../../utils/LateralNavbar/LateralNavbar";
import Footer from "../../utils/Footer/Footer";

// Función para obtener las historias favoritas
const getCreatedStories = async (showAllStories) => {
  try {
    const authToken = localStorage.getItem("accessToken");

    const response = await fetch(
      `http://localhost:8000/library/created-books/?showAllStories=${showAllStories}`,
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
      //console.log(data);
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

function Fictions() {
  const [createdStory, setCreatedStory] = useState([]);
  const [storyToRemove, setStoryToRemove] = useState(null); // Estado para almacenar la historia a eliminar
  const [isActive, setIsActive] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stories = await getCreatedStories(showAllStories);
        setCreatedStory(stories);
      } catch (error) {
        console.error("Error fetching favorite stories:", error);
      }
    };

    fetchData();
  }, [showAllStories]);

  // Función para eliminar una historia de favoritos
  const removeStory = async (storyId) => {
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
        const updatedStories = await getCreatedStories(showAllStories);
        setCreatedStory(updatedStories);
      } else {
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
    // Llama a la función handleSelectStory con la historia seleccionada
    handleSelectStory(createdStory[index]);
  };

  const editStory = (story) => {
    // Navigate to the edit form, passing the selected story as a prop
    navigate(`/edit-story/${story._id}`);
  };

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
            {showAllStories ? <p>My Stories</p> : <p>All Stories</p>}
            {/* Agrega un botón "Crear Historia" que redirige al formulario */}
            <button
              className={classes.CreateStoryButton}
              onClick={() => setShowAllStories(!showAllStories)}
            >
              {showAllStories ? "All Stories" : "My Stories"}
            </button>
          </div>
          <div style={{ height: "90%", padding: "10px" }}>
            <ul className={classes.List}>
              {createdStory.length > 0 ? (
                createdStory.map((story, index) => (
                  <li key={index} className={classes.list}>
                    {/* Renderiza los detalles de las historias aquí */}
                    {/* Icono de eliminación */}
                    {showAllStories ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "13px",
                        }}
                        id="button"
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={classes.RemoveButton}
                          style={{ position: "relative" }}
                          onClick={() => setStoryToRemove(story)} // Establece la historia a eliminar
                        />
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className={classes.EditButton}
                          style={{ position: "relative" }}
                          onClick={() => editStory(story)} //  Set the story to edit
                        />
                      </div>
                    ) : (
                      <div style={{ width: "5px" }}></div>
                    )}
                    <img
                      className={classes.stories}
                      src={`http://localhost:8000/${story.image}`}
                      alt="Story Image"
                    />

                    <div
                      onClick={(e) => {
                        toggle(index);
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        padding: "5px",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      }}
                    >
                      <b>
                        Title nº{index + 1}: {story.title}
                      </b>
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

export default Fictions;
