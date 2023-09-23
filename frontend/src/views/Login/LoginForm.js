import classes from "./LoginForm.module.css";
import { useRef } from "react";

function LoginForm(props) {
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refCheckbox = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: refEmail.current.value,
      password: refPassword.current.value,
      rememberMe: refCheckbox.current.checked,
    };
    //lo sacamos arriba
    props.onLogin(loginData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={refEmail}
        className={classes["form-control"]}
        type="text"
        name="username"
        placeholder="E-mail address"
      />
      <input
        ref={refPassword}
        className={classes["form-control"]}
        type="password"
        name="password"
        placeholder="password"
      />
      <div className={classes.remember}>
        {" "}
        <input type="checkbox" id="check1" ref={refCheckbox} />
        <label htmlFor="check1">Remember me?</label>
      </div>
      <div className={classes["form-button"]}>
        <button type="submit">Login</button>
        <a href="/ForgotPassword">Forget Password?</a>
      </div>
    </form>
  );
}

export default LoginForm;
