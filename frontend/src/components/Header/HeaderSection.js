import React, { useEffect, useState } from "react";
import classes from "./HeaderSection.module.css";

function HeaderSection() {
  const [text, setText] = useState(""); // Estado para el texto dinámico
  const fullText =
    "El fanfiction es una forma de amor y gratitud hacia las historias y los personajes que más nos han impactado.";

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex === fullText.length) {
        clearInterval(interval);
      } else {
        const currentChar = fullText[currentIndex];
        setText((prevText) => prevText + currentChar);
        currentIndex++;
      }
    }, 70); // Velocidad de escritura

    return () => {
      clearInterval(interval); // Limpieza al desmontar el componente
    };
  }, []);

  return (
    <section>
      <div className={classes.images}>
        <img className={classes.backimages} src="" alt="Mi Imagen" />
        <div className={classes.thinContainer}>
          <h1> Fanfiction searcher</h1>
          <h2>
            <span>{text}</span> {/* Elemento span para el texto dinámico */}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default HeaderSection;
