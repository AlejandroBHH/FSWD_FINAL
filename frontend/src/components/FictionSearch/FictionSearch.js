import { useState } from "react";

import classes from "../FictionSearch/FictionSearch.module.css";

const FictionSearch = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const inputChangeHandler = (event) => {
    const inputValue = event.target.value;

    //para que aparezca en el buscador
    setEnteredValue(inputValue);

    // Llamar a la función onEnteredValueChange para pasar el valor a Fictions
    props.onEnteredValueChange(inputValue);
  };

  return (
    <tr className={classes.FilterPage}>
      <td>
        {" "}
        <input
          type="text"
          //funcion en index para pasar el enteredvalue al backend
          onChange={inputChangeHandler}
          value={enteredValue}
          placeholder="Enter text"
          className={classes[`FilterPage-input`]}
        />
      </td>
    </tr>
  );
};

export default FictionSearch;
