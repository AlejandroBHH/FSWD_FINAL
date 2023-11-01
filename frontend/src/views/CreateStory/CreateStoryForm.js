import React, { useState, useEffect, useRef } from "react";
import classes from "./CreateStoryForm.module.css";
import LateralNavbar from "../../utils/LateralNavbar/LateralNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Footer from "../../utils/Footer/Footer";

function CreateStoryForm() {
  const [hovered, setHovered] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "", // Hacerlo automático
    description: "",
    content: "",
    image: null, // Almacena la imagen seleccionada
  });

  const [charLength, setCharLength] = useState(0);
  const maxCharLength = 1500;

  // Almacena la URL de la imagen seleccionada para la vista previa
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("accessToken");

  const handleSave = async () => {
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8000/library/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log("Error creating Story:", error);
    }
  };

  useEffect(() => {
    if (formData.image) {
      // Cuando se selecciona una imagen, muestra una vista previa
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(formData.image);
    } else {
      // Restablece la vista previa si no hay imagen seleccionada
      setImagePreview(null);
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const image = files[0];
      setFormData({
        ...formData,
        [name]: image,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className={classes.Menu}>
      <LateralNavbar></LateralNavbar>
      <div className={classes.Main}>
        <div className={classes.Container} style={{ width: `98%` }}>
          <div className={classes.ContainerStory}>
            <form onSubmit={handleSubmit}>
              <div style={{ margin: 0, textAlign: "start" }}>
                <h2>
                  {" "}
                  <FontAwesomeIcon
                    icon={faFileLines}
                    style={{ marginLeft: "10px" }}
                  />{" "}
                  Novel information
                </h2>
              </div>
              <div className={classes.FormGroup}>
                <label htmlFor="image">Image</label>{" "}
                {imagePreview ? (
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
                <label htmlFor="description">Synopsis</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default CreateStoryForm;
