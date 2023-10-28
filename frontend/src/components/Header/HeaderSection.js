import React, { useEffect, useState } from "react";
import classes from "./HeaderSection.module.css";

function HeaderSection() {
  const [text, setText] = useState(""); // Estado para el texto dinámico
  const fullText =
    "Dive into the thrilling world of fanfiction where your favorite characters come to life! Whether you crave romance, adventure, or mystery, we’ve got you covered.";

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
