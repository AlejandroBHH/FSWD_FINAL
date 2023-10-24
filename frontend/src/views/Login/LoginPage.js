import classes from "./css/LoginPage.module.css";
import LoginForm from "./LoginForm";
import Modal from "../Modal/Modal";
import SignupForm from "../signup/SignupForm";

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

  //para login o signup
  const [isLogin, setIsLogin] = useState(true);

  const [loginInfo, setLoginInfo] = useState({
    loggedIn: false,
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    rememberMe: localStorage.getItem("rememberMe") || false,
    loginError: "",
    name: "",
    role: "user",
  });

  //para las lines del password req
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
  });

  //refactor
  const handleVisibility = async (loginData) => {
    const info = {
      loggedIn: true,
      email: loginData.email === "" ? "Email required" : loginData.email,
      password:
        loginData.password === "" ? "Password required" : loginData.password,
      name: loginData.name === "" ? "Name required" : loginData.name,

      rememberMe: loginData.rememberMe,
      loginHeader: "login successfull",
      loginMessage: "you may be redirected to index",
    };
    if (
      loginData.email === "" ||
      loginData.password === "" ||
      loginData.name === ""
    ) {
      info.loggedIn = false;
      info.loginHeader = "Register failed";
      info.loginMessage = "Please fill in all required fields.";
      setLoginInfo(info);
      setVisible(true); // Mostrar el modal con el mensaje de error
      return; // Salir de la función ya que hay campos en blanco
    }

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
      const endpoint = isLogin
        ? "http://localhost:8000/auth/login"
        : "http://localhost:8000/auth/signup";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          name: loginData.name,
          role: "user",
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
        // Almacenar la hora de expiración de la sesión en milisegundos
        const sessionExpirationTime = Date.now() + 10 * 1000; // Caducará en 1 hora

        localStorage.setItem(
          "sessionExpirationTime",
          sessionExpirationTime.toString()
        );

        isLogin
          ? //redirección cuando pasen 3s
            setTimeout(() => {
              navigate("/index/Page/1.html");
            }, 3000)
          : setTimeout(() => {
              setIsLogin(!isLogin);
            }, 3000);
      } else {
        // Aquí puedes mostrar un mensaje de error o realizar cualquier otra acción apropiada
        info.loggedIn = false;
        info.loginHeader = "login failed";
        info.loginMessage = "Wrong email or Password";
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

  function handleModal() {
    setVisible(false);
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Modal visible={visible} onLogin={handleModal} data={loginInfo} />,
        document.querySelector("#modal")
      )}
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.formWrapper}>
            <div className={classes.title}>
              <FontAwesomeIcon icon={faHouseUser} size="xl" />
              <h1 style={{ margin: 0 }}> Welcome Back!</h1>
            </div>
            <p>{isLogin ? "Login to have access." : "Create an account."}</p>
            <div className={classes["login-links"]}>
              <a
                className={isLogin ? classes.active : ""}
                onClick={() => {
                  setIsLogin(true);
                  navigate("/login");
                }}
              >
                Login
              </a>
              <a
                className={!isLogin ? classes.active : ""}
                onClick={() => {
                  setIsLogin(false);
                  navigate("/register");
                }}
              >
                Register
              </a>
            </div>
            {isLogin ? (
              <LoginForm onLogin={handleVisibility} />
            ) : (
              <>
                <SignupForm
                  onSignup={handleVisibility}
                  passwordRequirementsChanged={(newRequirements) => {
                    setPasswordRequirements(newRequirements);
                  }}
                />
                <div className={classes.passwordrequirements}>
                  <ul>
                    Password must meet the following requirements:
                    <li className={classes.noBullets}>
                      <li
                        className={
                          passwordRequirements.lowercase
                            ? classes.underline
                            : ""
                        }
                      >
                        Include at least one lowercase letter.
                      </li>
                      <li
                        className={
                          passwordRequirements.uppercase
                            ? classes.underline
                            : ""
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
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
