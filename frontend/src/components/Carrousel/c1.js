import classes from "../Carrousel/css/Carrousel.module.css";

function Carrousel(props) {
  return (
    <div>
      {" "}
      <div className={classes.sectionContainer}>
        <div className={classes.card1}>
          <div className={classes.imageContainer1}>
            <img
              className={classes.select}
              src="/images/worm.jpg"
              alt="Mi Imagen"
              onClick={() => {
                props.imagenClick(); // Llama a la función existente
                props.setModel("Book"); // Llama a la nueva función que deseas ejecutar
              }}
            />
          </div>
          <div className={classes.textContainer}>
            <article>
              <h2>WORM</h2>
              <p>
                An introverted teenage girl with an unconventional superpower,
                Taylor goes out in costume to find escape from a deeply unhappy
                and frustrated civilian life. Her first attempt at taking down a
                supervillain sees her mistaken for one, thrusting her into the
                midst of the local ‘cape’ scene’s politics, unwritten rules, and
                ambiguous morals. As she risks life and limb, Taylor faces the
                dilemma of having to do the wrong things for the right reasons.
              </p>
            </article>
          </div>
        </div>
        <div className={classes.card2}>
          <div className={classes.imageContainer2}>
            <img
              className={classes.select}
              src="/images/harry.jpg"
              alt="Mi Imagen"
              onClick={() => {
                props.imagenClick(); // Llama a la función existente
                props.setModel("HarryP"); // Llama a la nueva función que deseas ejecutar
              }}
            />
          </div>
          <div className={classes.textContainer}>
            <article>
              <h2>HARRY POTTER</h2>
              <p>
                "Harry Potter" es una serie de novelas escritas por J.K. Rowling
                que sigue las aventuras de un joven mago llamado Harry Potter.
                La historia comienza cuando Harry descubre que es un mago y ha
                sido aceptado en la Escuela de Magia y Hechicería de Hogwarts. A
                lo largo de la serie, Harry y sus amigos, Ron y Hermione, luchan
                contra el mago tenebroso Lord Voldemort y su búsqueda de poder.
                La serie está llena de magia, criaturas mágicas, amistad y
                valentía, y explora temas como el bien y el mal, el destino y la
                elección personal.
              </p>
            </article>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Carrousel;
