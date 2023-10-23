import classes from "../signup/css/SignupForm.module.css";
import { useRef, useState } from "react";

function SignupForm(props) {
  const refName = useRef("");
  const refEmail = useRef("");
  const refPassword = useRef("");

  const [inputErrors, setInputErrors] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const SignupData = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
    };
    //lo sacamos arriba
    props.onSignup(SignupData);

    // Obtener los valores actuales del correo electrónico y la contraseña
    const emailValue = refEmail.current.value.trim();
    const passwordValue = refPassword.current.value.trim();
    const nameValue = refName.current.value.trim();

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

    if (nameValue === "") {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        nameError: "Name is required",
      }));
      return;
    }

    // Si ambos campos están llenos, limpiar los errores
    if (emailValue !== "" && passwordValue !== "" && nameValue !== "") {
      setInputErrors({
        emailError: "",
        passwordError: "",
        nameError: "",
      });
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const newRequirements = {
      lowercase: /[a-z]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      number: /\d/.test(newPassword),
    };
    //lo sacamos arriba
    props.passwordRequirementsChanged(newRequirements);
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

  const handleChangeName = () => {
    // Validar el campo de contraseña
    if (!refName.current.value.trim()) {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        nameError: "Name is required",
      }));
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        nameError: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={refName}
        className={classes["form-control"]}
        type="text"
        name="Name"
        placeholder="Name"
        onChange={handleChangeName}
      />
      <p
        className={`${classes["errorMessage"]} ${
          inputErrors.nameError ? classes.active : ""
        }`}
      >
        {inputErrors.nameError}
      </p>
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
        onChange={(e) => {
          handleChangePass(e);
          handlePasswordChange(e);
        }}
      />
      <p
        className={`${classes["errorMessage"]} ${
          inputErrors.passwordError ? classes.active : ""
        }`}
      >
        {inputErrors.passwordError}
      </p>
      <div className={classes["form-button"]}>
        <button
          type="submit"
          disabled={
            inputErrors.emailError ||
            inputErrors.passwordError ||
            inputErrors.nameError
          }
        >
          Sign Up
        </button>
        <a href="/ForgotPassword">Forget Password?</a>
      </div>
    </form>
  );
}

export default SignupForm;
