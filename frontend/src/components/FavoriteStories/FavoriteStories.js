import React, { useEffect, useState } from "react";
import classes from "./css/FavoriteStories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// To verify story removal
import Modal from "../../utils/VerifyModal/VerifyModal";
import { Link } from "react-router-dom";

// Function to fetch favorite stories
const getFavoriteStories = async (userEmail) => {
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
      return data.data; // Returns data of favorite stories
    } else {
      return []; // Returns an empty array in case of error
    }
  } catch (error) {
    console.error("Error:", error);
    return []; // Returns an empty array in case of exception
  }
};

function FavHistory(props) {
  const [favoriteStories, setFavoriteStories] = useState([]);
  const [storyToRemove, setStoryToRemove] = useState(null); // State to store the story to be removed

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

  // Function to remove a story from favorites
  const removeStory = async (storyId, userEmail) => {
    // Make a POST request to remove the story from favorites
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
        // Success: you can handle it here
        // For example, you can update the list of favorite stories after removing one
        const updatedStories = await getFavoriteStories(userEmail);
        setFavoriteStories(updatedStories);
      } else {
        // Error: you can show an error message or take other actions
        console.log(response.status);
      }
    } catch (error) {
      // Error in the request
      console.error("Error:", error);
    } finally {
      // After removing the story, close the modal
      setStoryToRemove(null);
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {storyToRemove && (
        <Modal
          visible={true}
          onConfirm={() =>
            removeStory(storyToRemove, localStorage.getItem("email"))
          }
          onCancel={() => setStoryToRemove(null)} // Cancel story removal
          story={storyToRemove} // Pass the story to the modal
        >
          Are you sure you want to remove this favorite story?
        </Modal>
      )}

      <div className={classes.FavContainer}>
        <div className={classes.ButContainer}>
          <h3>Favorite Stories</h3>
          {/* Add a "Create Story" button that redirects to the form */}
          <Link to="/NewStory" className={classes.CreateStoryButton}>
            Add History
          </Link>
        </div>
        <ul className={classes.List}>
          {favoriteStories.length > 0 ? (
            favoriteStories.map((story, index) => (
              <li key={index} className={classes.list}>
                {/* Render story details here */}
                {/* Removal icon */}
                <FontAwesomeIcon
                  icon={faTimes}
                  className={classes.RemoveButton}
                  onClick={() => setStoryToRemove(story)} // Set the story to be removed
                />
                <a href={`${story.href}`} target={"_blank"}>
                  Title nº{index + 1}: {story.title}
                </a>
              </li>
            ))
          ) : (
            <p>You don't have any favorite stories.</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default FavHistory;
