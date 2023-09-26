import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Spinner() {
  return (
    <div className="spinner-container">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </div>
  );
}

export default Spinner;
