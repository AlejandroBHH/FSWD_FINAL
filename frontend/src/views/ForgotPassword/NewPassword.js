import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validatePassword } from "../../utils/validate";
import { useParams } from "react-router-dom";

const NewPassword = (props) => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (validatePassword(password))
      try {
        const response = await fetch(
          "http://localhost:8000/auth/update-user-data",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify({ newPassword: password }),
          }
        );

        if (response.status === 200) {
          setMessage("Contraseña cambiada exitosamente.");
          // Puedes redirigir al usuario a la página de inicio de sesión o a donde desees
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessage("Ha ocurrido un error al cambiar la contraseña 1.");
        }
      } catch (error) {
        setMessage("Ha ocurrido un error al cambiar la contraseña.");
      }
    else {
      setMessage("Contraseña no valida");
    }
  };

  return (
    <div>
      <h2>Cambiar contraseña olvidada</h2>
      <form onSubmit={handleResetPassword}>
        <label>
          Nueva contraseña:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button type="submit">Cambiar contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewPassword;
