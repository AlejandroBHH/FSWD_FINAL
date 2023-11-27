import { useState } from "react";

import classes from "./css/TaskInput.module.css";

const TaskInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const inputChangeHandler = (event) => {
    const inputValue = event.target.value;

    //para que aparezca en el buscador
    setEnteredValue(inputValue);

    // Llamar a la función onEnteredValueChange para pasar el valor a Table
    props.onEnteredValueChange(inputValue);
  };

  return (
    <tr className={classes.FilterPage}>
      <td>
        <div className={classes["FilterPage-controls"]}>
          <select
            onChange={(event) => props.handleFilterSource(event.target.value)}
            style={{ textAlign: "center", maxWidth: "150px", height: "100%" }}
          >
            <option value="">Source</option>
            <option value="spacebattle">SpaceBattles</option>
            <option value="sufficentVelocity">SufficentVelocity</option>
            <option value="Archive of Our Own">Archive of Our Own</option>
          </select>
        </div>
      </td>
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
      <td className={classes["FilterPage-words"]}>
        <input
          type="text"
          name="Words_filter"
          id="Words_filter"
          placeholder="Words"
          onChange={(event) => props.onEnteredWordsChange(event.target.value)}
          className={classes["form-control"]}
        />
      </td>
      <td></td>
    </tr>
  );
};

export default TaskInput;
