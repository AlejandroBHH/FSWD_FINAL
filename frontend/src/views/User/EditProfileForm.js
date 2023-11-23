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

  const [showChangePassword, setShowChangePassword] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
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

  const handleToggleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();

    // Reset validation errors
    setValidationErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      // ...other fields
    });

    // Perform validations for name
    if (!validateName(editedUser.name)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is invalid",
      }));
      return;
    }

    // Perform validations for email
    if (!validateEmail(editedUser.email)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is invalid",
      }));
      return;
    }

    // Perform validations for password if the change password fields are visible
    if (showChangePassword) {
      if (editedUser.password !== editedUser.confirmPassword) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          password: "Passwords do not match",
          confirmPassword: "Passwords do not match",
        }));
        return;
      }

      if (!validatePassword(editedUser.password)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is invalid",
        }));
        return;
      }
    }

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
          {validationErrors.name && (
            <p className={classes["error-message"]}>{validationErrors.name}</p>
          )}
        </div>
        <div className={classes["Sect"]}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          {validationErrors.email && (
            <p className={classes["error-message"]}>{validationErrors.email}</p>
          )}
        </div>

        <div className={classes["Sect"]}>
          <button
            type="button"
            onClick={handleToggleChangePassword}
            style={{ marginBottom: "10px" }}
          >
            {showChangePassword ? "Hide" : "Change Password"}
          </button>
        </div>
        {showChangePassword && (
          <>
            <div className={classes["Sect"]}>
              <label>Password:</label>
              <input
                type="text"
                name="password"
                value={editedUser.password}
                onChange={handleInputChange}
                placeholder="insert new Password"
              />
              {validationErrors.password && (
                <p className={classes["error-message"]}>
                  {validationErrors.password}
                </p>
              )}
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
              {validationErrors.confirmPassword && (
                <p className={classes["error-message"]}>
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>
          </>
        )}
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
