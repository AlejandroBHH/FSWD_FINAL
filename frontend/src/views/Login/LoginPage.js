import classes from "./css/LoginPage.module.css";
import LoginForm from "./LoginForm";
import Modal from "../Modal/Modal";
import SignupForm from "../signup/SignupForm";
import Footer from "../../utils/Footer/Footer";

import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../utils/Navigation/Navbar";

function LoginPage(props) {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const state = props.isLogin;

  //console.log(state);
  //para login o signup

  const [loginInfo, setLoginInfo] = useState({
    loggedIn: false,
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
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
      setVisible(true);
      console.log("Required fields are missing.");
      return;
    }
    //console.log(isLogin);
    try {
      const endpoint = state
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
        localStorage.setItem("accessToken", data.data.token);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("email", loginData.email);
        const sessionExpirationTime = Date.now() + 10 * 1000;
        localStorage.setItem(
          "sessionExpirationTime",
          sessionExpirationTime.toString()
        );
        //console.log("Hello", isLogin); // Esta línea debería ejecutarse correctamente

        if (state) {
          setTimeout(() => {
            navigate("/index/Page/1.html");
          }, 3000);
        } else {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        info.loggedIn = false;
        info.loginHeader = "login failed";
        info.loginMessage = "Wrong email or Password";
        console.log("Login failed. Status: " + response.status);
      }
    } catch (error) {
      info.loggedIn = false;
      info.loginHeader = "login failed";
      info.loginMessage = "Wrong email or password";
      console.log("An error occurred: " + error);
    }
    setLoginInfo(info);
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
      <Navbar></Navbar>
      <div className={state ? classes.container : classes.containerRegister}>
        <div className={classes.card}>
          {" "}
          <img
            src="/images/neon.jpg"
            alt="Descripción de la imagen 3"
            className={classes.MainImg}
          />
        </div>
        <div className={classes.formContainer}>
          <div className={classes.MainTitle}>
            <FontAwesomeIcon icon={faHouseUser} size="2xl" />
            <h1 style={{ margin: 0 }} className={classes.MainTitle}>
              {" "}
              Welcome Back!
            </h1>
          </div>
          <p className={classes.Maindescription}>
            {state
              ? "Discover a fresh social platform for you and your buddies. Register to find out more."
              : "Create an account."}
          </p>

          {state ? (
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
                  <div className={classes.noBullets}>
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
                  </div>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default LoginPage;
