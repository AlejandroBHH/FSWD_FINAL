import "./IntermediateRows.css";

function IntermediateRows() {
  return (
    <div className="containerRow">
      <div className="rowInter">
        <img src="/images/DC.jpg" alt="Descripción de la imagen 1" />
        <div>
          <p>Top Stories</p>
          <sub>Fan-favorites collection</sub>
        </div>
      </div>
      <div className="rowInter">
        <img src="/images/DC.jpg" alt="Descripción de la imagen 2" />
        <div>
          <p>Trending Tales</p>
          <sub>Popular picks daily</sub>
        </div>
      </div>
      <div className="rowInter">
        <img src="/images/DC.jpg" alt="Descripción de la imagen 3" />
        <div>
          {" "}
          <p>New Authors</p>
          <sub>Fresh talent spotlight</sub>
        </div>
      </div>
    </div>
  );
}

export default IntermediateRows;
