import { useState } from "react";

// Importing CSS module styles
import classes from "../FictionSearch/css/FictionSearch.module.css";

const FictionSearch = (props) => {
  // State to manage the entered input value
  const [enteredValue, setEnteredValue] = useState("");

  // Handler for input change
  const inputChangeHandler = (event) => {
    // Get the input value from the event
    const inputValue = event.target.value;

    // Update the enteredValue state to reflect in the search bar
    setEnteredValue(inputValue);

    // Call the onEnteredValueChange function to pass the value to the parent component (Fictions)
    props.onEnteredValueChange(inputValue);
  };

  return (
    <input
      type="text"
      // Attach the inputChangeHandler function to the onChange event
      onChange={inputChangeHandler}
      // Set the input value to the enteredValue state
      value={enteredValue}
      placeholder="Enter text"
      // Apply the CSS class from the imported module
      className={classes[`FilterPage-input`]}
    />
  );
};

export default FictionSearch;
