import classes from "./css/LoginForm.module.css";
import { useRef, useState } from "react";
import { validateEmail } from "../../utils/validate";

function LoginForm(props) {
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refCheckbox = useRef(null);

  const [inputErrors, setInputErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los valores actuales del correo electrónico y la contraseña
    const emailValue = refEmail.current.value.trim();
    const passwordValue = refPassword.current.value.trim();

    // Validar que ambos campos no estén en blanco
    if (emailValue === "") {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Email is required",
      }));
    }

    if (passwordValue === "") {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Password is required",
      }));
      return;
    }

    // Si ambos campos están llenos, limpiar los errores
    if (emailValue !== "" && passwordValue !== "") {
      setInputErrors({
        emailError: "",
        passwordError: "",
      });
    }

    // Crear el objeto de datos de inicio de sesión
    const loginData = {
      email: emailValue,
      password: passwordValue,
      rememberMe: refCheckbox.current.checked,
    };

    // Llamar a la función de inicio de sesión
    props.onLogin(loginData);
  };

  const handleChange = (e) => {
    // Validar el campo de correo electrónico
    if (!refEmail.current.value.trim()) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Email is required",
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "",
      }));
    }
  };

  const handleChangePass = () => {
    // Validar el campo de contraseña
    if (!refPassword.current.value.trim()) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Password is required",
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={refEmail}
        className={classes["form-control"]}
        type="text"
        name="username"
        placeholder="E-mail address"
        onChange={handleChange}
      />

      <p
        className={`${classes["errorMessage"]} ${
          inputErrors.emailError ? classes.active : ""
        }`}
      >
        {inputErrors.emailError}
      </p>

      <input
        ref={refPassword}
        className={classes["form-control"]}
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChangePass}
      />

      <p
        className={`${classes["errorMessage"]} ${
          inputErrors.passwordError ? classes.active : ""
        }`}
      >
        {inputErrors.passwordError}
      </p>

      <div className={classes.remember}>
        {" "}
        <input type="checkbox" id="check1" ref={refCheckbox} />
        <label htmlFor="check1">Remember me?</label>
      </div>
      <div className={classes["form-button"]}>
        <button
          type="submit"
          disabled={inputErrors.emailError || inputErrors.passwordError}
        >
          Login
        </button>
        <a href="/ForgotPassword">Forget Password?</a>
      </div>
    </form>
  );
}

export default LoginForm;
