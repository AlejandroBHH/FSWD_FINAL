import React, { useEffect, useState } from "react";
import classes from "./HeaderSection.module.css";

function HeaderSection() {
  const [text, setText] = useState(""); // Estado para el texto dinámico
  const fullText =
    "El fanfiction es una expresión creativa que permite a los amantes de la narrativa participar activamente en los mundos que adoran, explorar personajes desde nuevas perspectivas y dar rienda suelta a su imaginación de maneras sorprendentes.";

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
        <div className={classes.thinContainer}>
          <h1> FANFICTION</h1>
          <h2>
            <span className={classes["typewriter-text"]}>{text}</span>{" "}
            {/* Elemento span para el texto dinámico */}
          </h2>
          <button className={classes["Explorer"]}>EXPLORE NOW</button>
        </div>
      </div>
    </section>
  );
}

export default HeaderSection;
