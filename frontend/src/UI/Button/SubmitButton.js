import classes from "../Button/SubmitButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const SubmitButton = (props) => {
  return (
    <div className={classes.paginationContainer}>
      <button
        className={classes.paginationButton}
        onClick={() => props.onPageChange(1)}
        disabled={props.current === 1} // Deshabilitar el botón si está en la primera página
      >
        <FontAwesomeIcon icon={faAnglesLeft} size="lg" />
      </button>
      <button
        className={classes.paginationButton}
        onClick={() => props.onPageChange(props.current - 1)}
        disabled={props.current === 1} // Deshabilitar el botón si está en la primera página
      >
        Previous
      </button>
      <span style={{ margin: "0 10px" }}>
        {props.current} / {props.total}
      </span>
      <button
        className={classes.paginationButton}
        onClick={() => props.onPageChange(props.current + 1)}
        disabled={props.current === props.total} // Deshabilitar el botón si está en la última página
      >
        Next
      </button>
      <button
        className={classes.paginationButton}
        onClick={() => props.onPageChange(props.total)}
        disabled={props.current === props.total} // Deshabilitar el botón si está en la primera página
      >
        <FontAwesomeIcon
          icon={faAnglesLeft}
          size="lg"
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
};

export default SubmitButton;
