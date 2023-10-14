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
        disableButtonsControls
        responsive={responsive}
        autoPlay
        autoPlayStrategy="default"
      >
        <div className="sliderimg">
          <img src={"/images/harry.jpg"} alt="Image 1" />{" "}
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("HarryP"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">"Descripción de la imagen 1"</p>
          </div>
        </div>
        <div className="sliderimg">
          <img src={"/images/worm.jpg"} alt="Image 2" />{" "}
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("Book"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">"Descripción de la imagen 2"</p>
          </div>
        </div>
        <div className="sliderimg">
          <img src={"/images/worm.jpg"} alt="Image 3" />
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("Book"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">"Descripción de la imagen 3"</p>
          </div>
        </div>
        <div className="sliderimg">
          <img
            src={"/images/worm.jpg"}
            alt="Image 4"
            style={{ cursor: "cursor: pointer" }}
          />{" "}
          <div
            className="overlay"
            onClick={() => {
              props.imagenClick(); // Llama a la función existente
              props.setModel("Book"); // Llama a la nueva función que deseas ejecutar
            }}
          >
            <p className="description">"Descripción de la imagen 4"</p>
          </div>
        </div>
      </AliceCarousel>
    </div>
  );
};

export default Carrousel;
