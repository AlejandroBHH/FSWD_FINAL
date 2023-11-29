import { useState } from "react";
import emailjs from "emailjs-com";
import classes from "../ForgotPassword/css/ForgotPassword.module.css";
import Navbar from "../../utils/Navigation/Navbar";
import Footer from "../../utils/Footer/Footer";
import Spinner from "../../utils/Spinner/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    setMessage("");
    event.preventDefault();

    // Start the loading spinner
    setIsLoading(true);

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

        // Send the email using EmailJS
        const templateParams = {
          to_email: email,
          reset_link: `http://localhost:3000/reset-password/${token}`,
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
              throw new Error("Error sending the email");
            }
          );

        if (emailResponse.status === 200) {
          setIsSuccess(true);
          setMessage(
            "An email with instructions to reset the password has been sent."
          );
        } else {
          setMessage(
            "An error occurred while sending the email. Please try again."
          );
        }
      } else {
        setIsSuccess(false);
        setMessage("User not found");
      }
    } catch (error) {
      setMessage(
        "An error occurred while sending the email. Please try again."
      );
    } finally {
      // Stop the loading spinner, regardless of whether the request was successful or not
      setIsLoading(false);
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
                  <button type="submit">Send</button>
                </div>
              </form>
              <div style={{ marginTop: "10px" }}>
                {isLoading && <Spinner />}{" "}
              </div>
              {/* Display the Spinner while loading */}
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
