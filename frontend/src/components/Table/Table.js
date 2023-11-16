import classes from "../Table/css/Table.module.css";
import { useState, useEffect } from "react";
import Spinner from "../../utils/Spinner/Spinner"; // Make sure to adjust the correct path

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import TaskInput from "../Task/TaskInput";
import { Navigate, useNavigate } from "react-router-dom";

function Table(props) {
  const [filterSource, setFilterSource] = useState(""); // State to filter by source
  const [favoriteStories, setFavoriteStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Function to handle filtering by source
  const handleFilterSource = (source) => {
    setFilterSource(source);
  };

  // Function to handle adding to favorites
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

      const data = await response.json();
      if (response.ok) {
        // Success: handle it here
        // console.log(data);
        // Call the function to get favorite stories after adding a new one
        fetchFavoriteStories();
      } else {
        // Error: you can show an error message or take other actions
        console.log(response.status);
      }
    } catch (error) {
      // Error in the request
      console.error("Error:", error);
      alert("Session ended");
      navigate("/login");
    }
  };

  // Function to fetch favorite stories
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
      setIsLoading(false); // Once data loading is complete, set isLoading to false
    }
  };

  useEffect(() => {
    // Get favorite stories when the component is mounted
    fetchFavoriteStories();
  }, []);

  // Access the email stored during login
  const storedEmail = localStorage.getItem("email");

  // Filter the data based on the source filter
  const filteredData = filterSource
    ? props.data.filter((component) => component.source === filterSource)
    : props.data;

  // Check if a component is in favorites
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
              handleFilterSource={handleFilterSource}
            />
          </tbody>
          <tbody>
            <tr className={classes.Sorters}>
              <td onClick={() => props.handleSort("title")}>
                Update
                {/* Sorting by title */}
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
                    {component.description ? (
                      // Verify description
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
                    onClick={() => handleAddToFavorites(component, storedEmail)}
                    style={
                      isComponentInFavorites(component)
                        ? { color: "gold", marginLeft: "15px" }
                        : { color: "grey", marginLeft: "15px" }
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
