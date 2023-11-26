import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validatePassword } from "../../utils/validate";
import { useParams } from "react-router-dom";
import classes from "./NewPassword.module.css";
import Navbar from "../../utils/Navigation/Navbar";
import Footer from "../../utils/Footer/Footer";

const NewPassword = (props) => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (validatePassword(password)) {
      try {
        console.log(token);
        const response = await fetch("http://localhost:8000/auth/newpassword", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ newPassword: password }),
        });

        if (response.status === 200) {
          setIsSuccess(true);
          setMessage("Password changed successfully.");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessage("Time Out");
        }
      } catch (error) {
        setMessage("An error occurred while changing the password.");
      }
    } else {
      setMessage("Invalid password");
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <h2>Cambiar contraseña olvidada</h2>
        <form onSubmit={handleResetPassword} className={classes.formContainer}>
          <label>
            Nueva contraseña:
            <input
              style={{ marginLeft: "20px" }}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>{" "}
          {message && (
            <p
              className={`${classes.message} ${
                isSuccess ? classes.success : classes.error
              }`}
            >
              {message}
            </p>
          )}
          <button type="submit" style={{ marginTop: "20px" }}>
            Cambiar contraseña
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default NewPassword;
