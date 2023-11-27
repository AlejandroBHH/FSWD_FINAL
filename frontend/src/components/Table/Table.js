import classes from "../Table/css/Table.module.css";
import { useState, useEffect } from "react";
import Spinner from "../../utils/Spinner/Spinner"; // Asegúrate de ajustar la ruta correcta

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
// ... Otros imports

import TaskInput from "../Task/TaskInput";
import { Navigate, useNavigate } from "react-router-dom";

function Table(props) {
  const [filterWords, setFilterWords] = useState("");
  const [favoriteStories, setFavoriteStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleFilterSource = (source) => {
    props.onEnteredSourceChange(source);
  };

  const handleAddToFavorites = async (storyId) => {
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          story_id: storyId._id,
        }),
      });

      if (response.ok) {
        fetchFavoriteStories();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Session ended");
      navigate("/login");
    }
  };

  const fetchFavoriteStories = async () => {
    try {
      const authToken = localStorage.getItem("accessToken");

      const response = await fetch(`http://localhost:8000/get-favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFavoriteStories(data.data);
      } else if (response.status === 401) {
        Navigate("/login");
      } else {
        console.log("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching favorite stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteStories();
  }, []);

  const storedEmail = localStorage.getItem("email");

  const filteredDataByWords = filterWords
    ? props.data.filter((component) => {
        const componentWords = parseInt(component.words);
        const filterWordsValue = parseInt(filterWords);
        return componentWords <= filterWordsValue;
      })
    : props.data;

  const isComponentInFavorites = (component) => {
    return (
      favoriteStories.find((favorite) => favorite.href === component.href) !==
      undefined
    );
  };

  const handleEnteredValueChangeWrapper = (value) => {
    props.onEnteredValueChange(value);
  };

  const handleFilterWordsChange = (value) => {
    setFilterWords(value);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className={classes.TableContainer}>
          <tbody>
            <TaskInput
              handleFilterSource={handleFilterSource}
              onEnteredValueChange={handleEnteredValueChangeWrapper}
              onEnteredWordsChange={handleFilterWordsChange}
            />
          </tbody>
          <tbody>
            <tr className={classes.Sorters}>
              <td onClick={() => props.handleSort("title")}>
                Update
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
            {filteredDataByWords.length === 0 ? (
              <tr>
                <td></td>
                <td>No stories found.</td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              filteredDataByWords.map((component, idx) => (
                <tr key={idx}>
                  <td>{component.date}</td>
                  <td>
                    <a href={component.href} target={"_blank"}>
                      {component.description ? (
                        <span
                          className={classes.tooltip}
                          data-text={component.description}
                        >
                          {component.title}
                        </span>
                      ) : (
                        <span
                          style={{ marginTop: "0" }}
                          data-text={component.description}
                        >
                          {component.title}
                        </span>
                      )}
                    </a>
                    <p>by {component.author}</p>
                  </td>
                  <td>{component.words}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faStar}
                      className={classes.AddButton}
                      onClick={() =>
                        handleAddToFavorites(component, storedEmail)
                      }
                      style={
                        isComponentInFavorites(component)
                          ? { color: "gold", marginLeft: "15px" }
                          : { color: "grey", marginLeft: "15px" }
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Table;
