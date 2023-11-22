import React, { useState, useEffect, useRef } from "react";
import classes from "./CreateStoryForm.module.css";
import LateralNavbar from "../../utils/LateralNavbar/LateralNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "../../utils/Footer/Footer";

function CreateStoryForm({ id }) {
  const [hovered, setHovered] = useState(false);
  const [storyData, setStoryData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "", // Hacerlo automático
    synopsis: "", // Initialize synopsis field
    content: "",
    image: null, // Almacena la   seleccionada
  });

  const [charLength, setCharLength] = useState(0);
  const maxCharLength = 1500;

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const authToken = localStorage.getItem("accessToken");
          const response = await fetch(
            `http://localhost:8000/library/created-books/?id=${id}`,
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
            setStoryData(data.data);
          } else {
            console.log("Error fetching story data:", data.error);
          }
        }
      } catch (error) {
        console.error("Error fetching story data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storyData) {
          setFormData({
            title: storyData.title,
            synopsis: storyData.synopsis,
            content: storyData.content,
            image: null,
          });
        }
      } catch (error) {
        console.error("Error setting story data:", error);
      }
    };

    fetchData();
  }, [storyData]);

  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(formData.image);
    } else {
      setImagePreview(null);
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const image = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: image,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(image);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("synopsis", formData.synopsis);
      formDataToSend.append("content", formData.content);

      const endpoint = `http://localhost:8000/library/edit-books/?id=${id}`;

      const method = "PUT";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "auth-token": token,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/fictions");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log("Error creating/editing Story:", error);
    }
  };

  return (
    <div className={classes.Menu}>
      <LateralNavbar></LateralNavbar>
      <div className={classes.Main}>
        <div className={classes.Container} style={{ width: `98%` }}>
          {storyData ? (
            <div className={classes.ContainerStory}>
              <form onSubmit={handleSubmit}>
                <div style={{ margin: 0, textAlign: "start" }}>
                  <h2>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      style={{ marginLeft: "10px" }}
                    />{" "}
                    Novel information
                  </h2>
                </div>
                <div className={classes.FormGroup}>
                  <label htmlFor="image">Image</label>

                  {imagePreview !== null ? (
                    <div
                      className={classes.ImageContainer}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <img
                        style={{ width: "200px", height: "300px" }}
                        src={imagePreview}
                        alt="Image Preview"
                        className={classes.ImagePreview}
                      />
                    </div>
                  ) : (
                    <div
                      className={classes.ImagePreviewBlank}
                      onClick={() => fileInputRef.current.click()}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <img
                        style={{ width: "200px", height: "300px" }}
                        src={`http://localhost:8000/${storyData.image}`}
                        alt="Image Preview"
                        className={classes.ImageSaved}
                      />
                      {hovered && (
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          size="2xl"
                          className={classes.IconContainer}
                        />
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    name="image"
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.FormGroup}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.FormGroup}>
                  <label htmlFor="synopsis">Synopsis</label>
                  <textarea
                    id="synopsis"
                    name="synopsis"
                    value={formData.synopsis}
                    onChange={handleChange}
                    style={{ height: "50px" }}
                  />
                </div>
                <div className={classes.FormGroup}>
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setCharLength(inputValue.length);
                      handleChange(e);
                    }}
                    maxLength={maxCharLength}
                  />
                </div>
                <p style={{ textAlign: "right", margin: 0 }}>
                  {charLength}/{maxCharLength}
                </p>
                <div className={classes.FormGroup}>
                  <button
                    type="submit"
                    className={classes.SubmitButton}
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default CreateStoryForm;
