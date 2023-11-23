import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./css/Fictions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//para verificar que lo elimina
import Modal from "../../utils/VerifyModal/VerifyModal";

import LateralNavbar from "../../utils/LateralNavbar/LateralNavbar";
import Footer from "../../utils/Footer/Footer";
import FictionSearch from "../../components/FictionSearch/FictionSearch";
import StoryButton from "../../UI/StoryButton/StoryButton";

// Función para obtener las historias favoritas
const getCreatedStories = async (showAllStories, page, filterValue) => {
  try {
    const authToken = localStorage.getItem("accessToken");

    const response = await fetch(
      `http://localhost:8000/library/created-books/?showAllStories=${showAllStories}&page=${page}&filterValue=${filterValue}`,
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
      const totalPages = data.totalPages !== undefined ? data.totalPages : 1;

      return { data: data.data, totalPages };
    } else {
      //console.log("Error:", data.error);
      return { data: [], totalPages: 1 };
    }
  } catch (error) {
    //  console.error("Error:", error);
    return { data: [], totalPages: 1 };
  }
};

function Fictions() {
  const [createdStory, setCreatedStory] = useState([]);
  const [storyToRemove, setStoryToRemove] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [enteredValue, setEnteredValue] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data, totalPages } = await getCreatedStories(
        showAllStories,
        page,
        enteredValue
      );
      // console.log(totalPages);
      setCreatedStory(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching favorite stories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showAllStories, page, enteredValue]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleEnteredValueChange = (value) => {
    setEnteredValue(value);
  };

  const removeStory = async (storyId) => {
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
        fetchData();
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setStoryToRemove(null);
    }
  };

  const toggle = (index) => {
    setIsActive((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const editStory = (story) => {
    navigate(`/edit-story/${story._id}`);
  };

  return (
    <>
      {/* Modal de confirmación */}
      {storyToRemove && (
        <Modal
          visible={true}
          onConfirm={() => removeStory(storyToRemove)}
          onCancel={() => setStoryToRemove(null)}
          story={storyToRemove}
        >
          ¿Estás seguro de que deseas eliminar esta historia?
        </Modal>
      )}
      <div style={{ display: "flex" }}>
        <LateralNavbar></LateralNavbar>
        <div className={classes.FavContainer}>
          <div className={classes.ButContainer}>
            {showAllStories ? (
              <b style={{ margin: "auto" }}>My Stories</b>
            ) : (
              <b style={{ margin: "auto" }}>All Stories</b>
            )}
            <FictionSearch
              onEnteredValueChange={handleEnteredValueChange}
              onSearch={fetchData}
            />
            <button
              className={classes.CreateStoryButton}
              onClick={() => {
                setShowAllStories(!showAllStories), setPage(1);
              }}
            >
              {showAllStories ? "All Stories" : "My Stories"}
            </button>
          </div>
          <div style={{ height: "90%", padding: "10px" }}>
            <StoryButton
              current={page}
              total={totalPages}
              onPageChange={handlePageChange}
            ></StoryButton>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className={classes.List}>
                {createdStory.length > 0 ? (
                  createdStory.map((story, index) => (
                    <li key={index} className={classes.list}>
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
                            onClick={() => setStoryToRemove(story)}
                          />
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={classes.EditButton}
                            style={{ position: "relative" }}
                            onClick={() => editStory(story)}
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
                        <b>{story.title}</b>
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
                <StoryButton
                  current={page}
                  total={totalPages}
                  onPageChange={handlePageChange}
                ></StoryButton>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Fictions;
