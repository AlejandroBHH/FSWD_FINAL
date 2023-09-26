import classes from "./HeaderSection.module.css"; // Asegúrate de importar tus estilos aquí

function HeaderSection() {
  return (
    <section>
      <div className={classes.images}>
        <img
          className={classes.backimages}
          src="/images/pixabay.jpg"
          alt="Mi Imagen"
        />
        <div className={classes.thinContainer}>
          <h1> Fanfiction searcher</h1>
          <h2>
            "El fanfiction es una forma de amor y gratitud hacia las historias y
            los personajes que más nos han impactado. Es una celebración de la
            imaginación y la creatividad, y una demostración del poder duradero
            de una buena historia para inspirar a otros a soñar y crear." ~
            Rainbow Rowell
          </h2>
        </div>
      </div>
    </section>
  );
}

export default HeaderSection;
