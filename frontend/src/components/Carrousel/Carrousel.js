import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../Carrousel/Carrousel.css";

const Carrousel = (props) => {
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="centered-carousel">
      {" "}
      {/* Contenedor para centrar el carrusel */}
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={3000}
        animationDuration={2500}
        disableDotsControls
        disableButtonsControls={false}
        responsive={responsive}
        autoPlay
        autoPlayStrategy="default"
      >
        <div className="sliderimg">
          <img src={"/images/harry.jpg"} alt="cover 1" />{" "}
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("HarryP"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">
              A book series centered around the battle between Harry Potter and
              the evil wizard Lord Voldemort, who murdered Harry's parents in
              his quest to conquer the magical world.
            </p>
          </div>
        </div>
        <div className="sliderimg">
          <img src={"/images/worm.jpg"} alt="cover 2" />{" "}
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("Worm"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">
              An introverted teenage girl with an unconventional superpower,
              Taylor dons a costume to escape from a profoundly sad and
              frustrating civilian life. Her initial attempt to defeat a
              supervillain results in her being mistaken for one, thrusting her
              into the complex realm of "capes" politics, unspoken rules, and
              ambiguous morality.
            </p>
          </div>
        </div>
        <div className="sliderimg">
          <img src={"/images/Marvel.jpg"} alt="cover 3" />
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("Marvel"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">
              Marvel Comics, a powerhouse in the comic book world, is renowned
              for its diverse characters and interconnected storytelling. From
              Spider-Man to the Avengers, Marvel captivates with relatable
              heroes facing personal struggles and moral dilemmas.
            </p>
          </div>
        </div>
        <div className="sliderimg">
          <img
            src={"/images/DC.jpg"}
            alt="cover 4"
            style={{ cursor: "cursor: pointer" }}
          />{" "}
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("DC"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">
              DC Comics, a comic book giant, boasts legendary characters like
              Superman and Batman. With a focus on larger-than-life conflicts
              between good and evil, DC's stories delve into the complexities of
              heroism and the consequences of wielding extraordinary power.
              Timeless and iconic, DC continues to shape the superhero{" "}
            </p>
          </div>
        </div>
      </AliceCarousel>
    </div>
  );
};

export default Carrousel;
