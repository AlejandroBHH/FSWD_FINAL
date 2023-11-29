import classes from "../Button/css/SubmitButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const SubmitButton = (props) => {
  return (
    <div className={classes.paginationContainer}>
      <button
        className={classes.paginationButton}
        onClick={() => {
          props.onPageChange(1);
          props.onImageClick(); // Llamar a la función onImageClick
        }}
        disabled={props.current === 1}
      >
        <FontAwesomeIcon icon={faAnglesLeft} size="lg" />
      </button>
      <button
        className={classes.paginationButton}
        onClick={() => {
          props.onPageChange(props.current - 1);
          props.onImageClick(); // Llamar a la función onImageClick
        }}
        disabled={props.current === 1}
      >
        Previous
      </button>
      <span style={{ margin: "0 10px" }}>
        {props.current} / {props.total}
      </span>
      <button
        className={classes.paginationButton}
        onClick={() => {
          props.onPageChange(props.current + 1);
          props.onImageClick(); // Llamar a la función onImageClick
        }}
        disabled={props.current === props.total}
      >
        Next
      </button>
      <button
        className={classes.paginationButton}
        onClick={() => {
          props.onPageChange(props.total);
          props.onImageClick(); // Llamar a la función onImageClick
        }}
        disabled={props.current === props.total}
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
