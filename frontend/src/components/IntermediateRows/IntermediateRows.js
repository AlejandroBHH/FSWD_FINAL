import "./IntermediateRows.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3 } from "@fortawesome/free-solid-svg-icons";

function IntermediateRows() {
  return (
    <div className="containerRow">
      <div className="rowInter">
        <img src="/images/DC.jpg" alt="Descripción de la imagen 1" />
        <div style={{ width: "100%" }}>
          <p style={{ margin: "0px" }}>Step 1: Discover Stories</p>
          <sub>
            Explore a variety of captivating stories in the carousel. Simply
            choose the one that catches your interest!
          </sub>
        </div>
        <FontAwesomeIcon icon={fa1} size="2xl" />
      </div>
      <div className="rowInter">
        <img src="/images/DC.jpg" alt="Descripción de la imagen 2" />
        <div style={{ width: "100%" }}>
          <p style={{ margin: "0px" }}>Step 2: Explore Further</p>
          <sub>
            Uncover more about your chosen story from various sources across the
            web.
          </sub>
        </div>
        <FontAwesomeIcon icon={fa2} size="2xl" />
      </div>
      <div className="rowInter">
        <img src="/images/DC.jpg" alt="Descripción de la imagen 3" />
        <div style={{ width: "100%" }}>
          {" "}
          <p style={{ margin: "0px" }}>Step 3: Enjoy the Experience</p>
          <sub>Sit back and enjoy your chosen story!</sub>
        </div>
        <FontAwesomeIcon icon={fa3} size="2xl" />
      </div>
    </div>
  );
}

export default IntermediateRows;
