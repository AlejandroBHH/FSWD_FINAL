import classes from "../signup/css/SignupForm.module.css";
import { useRef } from "react";

function SignupForm(props) {
  const refName = useRef("");
  const refEmail = useRef("");
  const refPassword = useRef("");
  const refCheckbox = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const SignupData = {
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
    };
    //lo sacamos arriba
    props.onSignup(SignupData);
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={refName}
        className={classes["form-control"]}
        type="text"
        name="Name"
        placeholder="Name"
      />
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
        onChange={handlePasswordChange}
      />
      <div className={classes["form-button"]}>
        <button type="submit">Sign Up</button>
        <a href="/ForgotPassword">Forget Password?</a>
      </div>
    </form>
  );
}

export default SignupForm;
