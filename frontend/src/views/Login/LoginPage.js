import classes from "./LoginPage.module.css";
import LoginForm from "./LoginForm";
import Modal from "../Modal/Modal";

import { useState } from "react";
import ReactDOM from "react-dom";
import {
  validateEmail,
  validatePassword,
  validatePasswordLength,
} from "../../utils/validate";
import { localStorageService } from "../../services/LocalStorage.service";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const navigate = useNavigate();
  //el pending es para el spinner
  const [pending, setPending] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    loggedIn: false,
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    rememberMe: localStorage.getItem("rememberMe") || false,
    loginError: "",
  });
  //refactor
  const handleVisibility = async (loginData) => {
    const info = {
      loggedIn: true,
      email: loginData.email === "" ? "Email required" : loginData.email,
      password:
        loginData.password === "" ? "Password required" : loginData.password,
      rememberMe: loginData.rememberMe,
      loginHeader: "login successfull",
      loginMessage: "you may be redirected to calendar",
    };
    //console.log(validateEmail(loginData.email));
    if (
      !loginData ||
      !validateEmail(loginData.email) ||
      !validatePasswordLength(loginData.password) ||
      !validatePassword(loginData.password)
      //setlogin info
    )
      setPending(true);
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (loginData.rememberMe) {
          localStorageService.setItem("email", loginData.email);
          localStorageService.setItem("password", loginData.password);
          localStorageService.setItem("rememberMe", true);
        }

        //guardar el token de acceso en el localstorage con la clave "accessToken"
        localStorage.setItem("accessToken", data.data.token);
        //guardar el Refreshtoken en el localstorage con la clave "refreshToken"
        localStorage.setItem("refreshToken", data.data.refreshToken);
        //guardamos el correo del user para pasarselo a Table
        localStorage.setItem("email", loginData.email);

        //redirección cuando pasen 3s
        setTimeout(() => {
          navigate("/index/Page/1.html");
        }, 3000);
      } else {
        // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción apropiada
        info.loggedIn = false;
        info.loginHeader = "login failed";
        info.loginMessage = "WTF";
        console.log(response.status);
      }
    } catch (error) {
      {
        info.loggedIn = false;
        info.loginHeader = "login failed";
        info.loginMessage = "wrong email or password";
        console.log("login failed");
      }
    }
    setLoginInfo(info);
    setPending(false);
    setVisible(!visible);
  };

  return (
    <>
      {/* creamos el portal y lo asignamos */}
      {ReactDOM.createPortal(
        <Modal visible={visible} onLogin={handleVisibility} data={loginInfo} />,
        document.querySelector("#modal")
      )}
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.formWrapper}>
            <h1>
              {" "}
              <FontAwesomeIcon icon={faHouseUser} size="xl" />
              Welcome Back!
            </h1>
            <p>Login to have access.</p>
            <div className={classes["login-links"]}>
              <a href="#" className={classes.active}>
                Login
              </a>
              <a onClick={() => navigate("/register")}>Register</a>
            </div>
            <LoginForm onLogin={handleVisibility} />
          </div>
          .
        </div>
      </div>
    </>
  );
}

export default LoginPage;
