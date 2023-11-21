import { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validate";

import classes from "../User/css/EditProfile.module.css";

const EditProfileForm = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    confirmPassword: "",
    // ...other fields
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

    // Perform validations for name
    if (!validateName(editedUser.name)) {
      console.log("Name is invalid");
      return;
    }

    // Perform validations for email
    if (!validateEmail(editedUser.email)) {
      console.log("Email is invalid");
      return;
    }

    // Perform validations for password
    if (editedUser.password !== editedUser.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    /*if (!validatePassword(editedUser.password)) {
      console.log("Password is invalid");
      return;
    }*/

    onSave(editedUser);
  };

  const handleCancelClick = () => {
    // Clear changes and close the form
    setEditedUser({
      name: user.name || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
      // ...other fields
    });

    onCancel();
  };

  return (
    <>
      <form className={classes["useredit"]}>
        <div className={classes["Sect"]}>
          <p>
            <b>Personal information</b>
          </p>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes["Sect"]}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </div>
        <p>
          <b>Change Password</b>
        </p>
        <div className={classes["Sect"]}>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={editedUser.password}
            onChange={handleInputChange}
            placeholder="insert new Password"
          />
        </div>
        <div className={classes["Sect"]}>
          <label>Confirm Password:</label>
          <input
            type="text"
            name="confirmPassword"
            value={editedUser.confirmPassword}
            onChange={handleInputChange}
            placeholder="confirm new password"
          />
        </div>
        {/* Add more editing fields here */}
        <div className={classes["Buttons"]}>
          <button onClick={handleSaveClick} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;
