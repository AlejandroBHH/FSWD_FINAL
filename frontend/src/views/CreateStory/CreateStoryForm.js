import { useState } from "react";
import classes from "./CreateStoryForm.module.css";

function CreateStoryForm() {
  const [formData, setFormData] = useState({
    title: "",
    date: "", // Puedes ajustar esto para que se complete automáticamente
    tags: [],
    content: "",
  });

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
    <main className={classes.Main}>
      <h2>Crear Nueva Historia</h2>
      <section className={classes.Section}>
        <aside>
          <h1>Formulario</h1>
          <div className={classes.Container}>
            <form onSubmit={handleSubmit}>
              <div className={classes.FormGroup}>
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.FormGroup}>
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.FormGroup}>
                <label htmlFor="content">Contenido</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.FormGroup}>
                <button type="submit" className={classes.SubmitButton}>
                  Guardar Historia
                </button>
              </div>
            </form>
          </div>
        </aside>
        <div className={classes.Container}>
          {/* Aquí puedes agregar la visualización previa de la historia si lo deseas */}
        </div>
      </section>
    </main>
  );
}

export default CreateStoryForm;
