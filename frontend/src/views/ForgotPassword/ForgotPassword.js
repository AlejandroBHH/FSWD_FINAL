import { useState } from "react";
import emailjs from "emailjs-com";
import classes from "../ForgotPassword/css/ForgotPassword.module.css";
import Navbar from "../../utils/Navigation/Navbar";
import Footer from "../../utils/Footer/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        const tokenData = await response.json();
        const token = tokenData.token;
        //console.log(tokenData);
        // Envia el correo electrónico utilizando EmailJS
        const templateParams = {
          to_email: email,
          reset_link: `http://localhost:3000/reset-password/${token}`, // Cambia la URL base y la ruta según tu estructura
        };

        const emailResponse = await emailjs
          .send(
            "service_2xeff7t",
            "template_rs19voj",
            templateParams,
            "3aMv2ZwhFkztHTd6P"
          )
          .then(
            function (response) {
              return response;
            },
            function (error) {
              throw new Error("Error en el envío del correo electrónico");
            }
          );

        if (emailResponse.status === 200) {
          setIsSuccess(true);
          setMessage(
            "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña."
          );
        } else {
          setMessage(
            "Ha ocurrido un error al enviar el correo electrónico. Por favor, inténtalo de nuevo."
          );
        }
      } else {
        setMessage("Usuario no encontrado");
      }
    } catch (error) {
      setMessage(
        "Ha ocurrido un error al enviar el correo electrónico. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className={classes.container}>
          <div className={classes.formContainer}>
            <div className={classes.formWrapper}>
              <h2>Forgot your password?</h2>
              <form onSubmit={handleResetPassword}>
                <p>Enter your email address:</p>
                <div className={classes.buttons}>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <button type="submit">Enviar</button>
                </div>
              </form>

              {message && (
                <p
                  className={`${classes.message} ${
                    isSuccess ? classes.success : classes.error
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
            <img
              style={{ maxHeight: "400px" }}
              src="/images/password-1.png"
              alt=""
              className={classes.MainImg}
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ForgotPassword;
