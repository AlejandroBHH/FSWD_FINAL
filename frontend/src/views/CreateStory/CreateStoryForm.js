import { useState } from "react";
import classes from "./CreateStoryForm.module.css";
import Navbar from "../../utils/Navigation/Navbar";

function CreateStoryForm() {
  const [formData, setFormData] = useState({
    title: "",
    date: "", // Hacerlo automático
    description: [],
    content: "",
  });

  const [chartlength, setCharlength] = useState(0);
  const maxcharlength = 1500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega aquí la lógica para guardar la historia
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={classes.Main}>
        <div style={{ margin: 0 }}>
          <h2>Create a New Story</h2>
        </div>

        <div className={classes.ContainerStory}>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="tags">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.tags}
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
                  // Actualiza la longitud del contenido y luego llama a handleChange
                  setCharlength(inputValue.length);
                  handleChange(e);
                }}
                maxLength={maxcharlength}
              />
            </div>
            <p style={{ textAlign: "right", margin: 0 }}>
              {chartlength}/{maxcharlength}
            </p>
            <div className={classes.FormGroup}>
              <button type="submit" className={classes.SubmitButton}>
                Save Story
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateStoryForm;
