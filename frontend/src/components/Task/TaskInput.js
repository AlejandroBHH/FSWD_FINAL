import { useState } from "react";

import "../Task/TaskInput.css";

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
    <tr className="FilterPage">
      <td>
        <div className="FilterPage-controls">
          <select
            onChange={(event) => props.handleFilterSource(event.target.value)}
            style={{ textAlign: "center", maxWidth: "150px" }}
          >
            <option value="">Source</option>
            <option value="spacebattle">SpaceBattles</option>
            <option value="sufficentVelocity">SufficentVelocity</option>
            <option value="Archive of Our Own">Archive of Our Own</option>
          </select>

          <input
            type="text"
            //funcion en index para pasar el enteredvalue al backend
            onChange={inputChangeHandler}
            value={enteredValue}
            placeholder="Enter text"
            className={`FilterPage-input`}
          />
        </div>
      </td>
      <td className="FilterPage-words">
        <input
          type="text"
          name="Words_filter"
          id="Words_filter"
          placeholder="Words"
          //funcion en index para pasar el enteredvalue al backend

          className="form-control"
        />
      </td>
      <td></td>
    </tr>
  );
};

export default TaskInput;
