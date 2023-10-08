import classes from "../signup/css/SignupPage.module.css";
import SignupForm from "./SignupForm";
import Modal from "../Modal/Modal";
import { useState } from "react";
import ReactDOM from "react-dom";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validate";
import { localStorageService } from "../../services/LocalStorage.service";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    loggedIn: false,
    email: "",
    password: "",
    name: "",
    role: "user",

    loginError: "",
  });
  //para las lines del password req
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
  });

  //refactor
  const handleVisibility = async (SignupData) => {
    const info = {
      loggedIn: true,

      email: SignupData.email === "" ? "Email required" : SignupData.email,
      password:
        SignupData.password === "" ? "Password required" : SignupData.password,
      name: SignupData.name === "" ? "Name required" : SignupData.name,

      loginHeader: "register successfull",
      loginMessage: "you may be redirected to login",
    };
    if (
      SignupData.email === "" ||
      SignupData.password === "" ||
      SignupData.name === ""
    ) {
      info.loggedIn = false;
      info.loginHeader = "Register failed";
      info.loginMessage = "Please fill in all required fields.";
      setLoginInfo(info);
      setVisible(true); // Mostrar el modal con el mensaje de error
      return; // Salir de la función ya que hay campos en blanco
    }
    //console.log(validateEmail(SignupData.email));
    if (
      SignupData &&
      validateEmail(SignupData.email) &&
      validatePassword(SignupData.password) &&
      validateName(SignupData.name)
      //setlogin info
    )
      try {
        const response = await fetch("http://localhost:8000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: SignupData.email,
            password: SignupData.password,
            name: SignupData.name,
            role: "user",
          }),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok && SignupData.email !== "") {
          //redirección cuando pasen 3s

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción apropiada
          info.loggedIn = false;
          info.loginHeader = "Register failed";
          info.loginMessage = error.message;
          console.log(response.status);
        }
      } catch (error) {
        {
          info.loggedIn = false;
          info.loginHeader = "Register failed";
          info.loginMessage = "wrong email or password";
        }
      }
    setLoginInfo(info);

    setVisible(!visible);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Modal visible={visible} onLogin={handleVisibility} data={loginInfo} />,
        document.querySelector("#modal")
      )}
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.formWrapper}>
            <div className={classes["login-links"]}>
              <a onClick={() => navigate("/login")}>Login</a>
              <a href="#" className={classes.active}>
                Register
              </a>
            </div>
            <SignupForm
              onSignup={handleVisibility}
              passwordRequirementsChanged={(newRequirements) => {
                setPasswordRequirements(newRequirements);
              }}
            />
            <div className={classes.passwordrequirements}>
              <p>
                Password must meet the following requirements:
                <ul className={classes.noBullets}>
                  <li
                    className={
                      passwordRequirements.lowercase ? classes.underline : ""
                    }
                  >
                    Include at least one lowercase letter.
                  </li>
                  <li
                    className={
                      passwordRequirements.uppercase ? classes.underline : ""
                    }
                  >
                    Include at least one uppercase letter.
                  </li>
                  <li
                    className={
                      passwordRequirements.number ? classes.underline : ""
                    }
                  >
                    Include at least one number.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
