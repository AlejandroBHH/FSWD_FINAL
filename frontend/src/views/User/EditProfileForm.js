import { useState } from "react";

import { validateEmail, validateName } from "../../utils/validate";

import "../User/EditProfileForm.css";

const EditProfileForm = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name || "",
    email: user.email || "",
    // ...otros campos
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    // Realiza las validaciones aquí
    if (!validateName(editedUser.name)) {
      console.log("Name is invalid");
      return;
    }

    if (!validateEmail(editedUser.email)) {
      console.log("Email is invalid");
      return;
    }

    // Puedes agregar más validaciones aquí, si es necesario

    onSave(editedUser);
  };

  return (
    <>
      <form>
        <div className="Sect">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="Sect">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          {/*console.log(editedUser)*/}
        </div>
        {/* Agregar más campos de edición aquí */}
        <button onClick={handleSaveClick}>Save</button>
      </form>
    </>
  );
};

export default EditProfileForm;
