import classes from "../Table/Table.module.css";
import { useState, useEffect } from "react";
import Spinner from "../../utils/Spinner/Spinner"; // Asegúrate de ajustar la ruta correcta

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import TaskInput from "../Task/TaskInput";

function Table(props) {
  const [filterSource, setFilterSource] = useState(""); // Estado para filtrar por source
  const [favoriteStories, setFavoriteStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para manejar el filtro por source
  const handleFilterSource = (source) => {
    setFilterSource(source);
  };

  // Función para manejar el agregado a favoritos
  const handleAddToFavorites = async (storyId, userEmail) => {
    // Realizar solicitud POST para agregar la historia a favoritos
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
        // console.log(data);
        // Llamar a la función para obtener las historias favoritas después de agregar una nueva
        fetchFavoriteStories();
      } else {
        // Error: puedes mostrar un mensaje de error o realizar otras acciones
        console.log(response.status);
      }
    } catch (error) {
      // Error en la solicitud
      console.error("Error:", error);
    }
  };

  // Función para obtener las historias favoritas
  const fetchFavoriteStories = async () => {
    try {
      const userEmail = localStorage.getItem("email");
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
        setFavoriteStories(data.data);
      } else {
        console.log("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching favorite stories:", error);
    } finally {
      setIsLoading(false); // Una vez que se completó la carga de datos, establecemos isLoading en false
    }
  };

  useEffect(() => {
    // Obtener las historias favoritas al cargar el componente
    fetchFavoriteStories();
  }, []);

  // Accedemos al email que guardamos en login
  const storedEmail = localStorage.getItem("email");

  // Filtrar los datos según el filtro por source
  const filteredData = filterSource
    ? props.data.filter((component) => component.source === filterSource)
    : props.data;

  // Verificar si un componente está en favoritos
  const isComponentInFavorites = (component) => {
    return (
      favoriteStories.find((favorite) => favorite.href === component.href) !==
      undefined
    );
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className={classes.TableContainer}>
          <tbody>
            <TaskInput
              onEnteredValueChange={props.onEnteredValueChange}
              handleFilterSource={handleFilterSource} // Pasa la función al componente TaskInput
            />
          </tbody>
          <tbody>
            <tr className={classes.Sorters}>
              <td onClick={() => props.handleSort("title")}>
                Update
                {/* con esto cambiamos el codigo según sortBy, el && para condicional si se cumple lo primero */}
                {props.sortBy === "title" && (
                  <FontAwesomeIcon
                    icon={
                      props.sortOrder === "asc"
                        ? faArrowDownWideShort
                        : faArrowDownWideShort
                    }
                    style={{
                      transform: `rotate(${props.sort === "asc" ? 0 : 180}deg)`,
                    }}
                  />
                )}
              </td>
              <td onClick={() => props.handleSort("href")}>
                Title
                {props.sortBy === "href" && (
                  <FontAwesomeIcon
                    icon={faArrowDownWideShort}
                    style={{
                      transform: `rotate(${props.sort === "asc" ? 0 : 180}deg)`,
                    }}
                  />
                )}
              </td>
              <td onClick={() => props.handleSort("words")}>
                Words
                {props.sortBy === "words" && (
                  <FontAwesomeIcon
                    icon={faArrowDownWideShort}
                    style={{
                      transform: `rotate(${props.sort === "asc" ? 0 : 180}deg)`,
                    }}
                  />
                )}
              </td>
              <td onClick={() => props.handleSort("Created")}>
                Created
                {props.sortBy === "Created" && (
                  <FontAwesomeIcon
                    icon={faArrowDownWideShort}
                    style={{
                      transform: `rotate(${props.sort === "asc" ? 0 : 180}deg)`,
                    }}
                  />
                )}
              </td>
            </tr>

            {filteredData.map((component, idx) => (
              <tr key={idx}>
                <td>{component.date}</td>
                <td>
                  <a href={component.href} target={"_blank"}>
                    <p
                      className={classes.tooltip}
                      data-text={component.description}
                    >
                      {component.title}
                    </p>
                  </a>
                  by {component.author}
                </td>
                <td>{component.words}</td>

                <td>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={classes.AddButton}
                    onClick={() => handleAddToFavorites(component, storedEmail)}
                    style={
                      isComponentInFavorites(component)
                        ? { color: "gold" }
                        : { color: "grey" }
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Table;
