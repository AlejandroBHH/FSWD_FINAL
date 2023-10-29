import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../LateralNavbar/LateralNavbar.css";

// icono para el logout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faBars,
  faTableColumns,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function LateralNavbar() {
  // para el logout
  const navigate = useNavigate(); // Usa useNavigate para manejar la redirección
  const [navAlternative, setNavAlternative] = useState(true);

  const handleToggleNav = () => {
    setNavAlternative(!navAlternative);
  };

  const handleLogout = () => {
    navigate("/index"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <header className={"scrolledLateral"}>
      <nav className={"lateralNavbar"}>
        <ul className={navAlternative ? "lateral" : "lateralAlternative"}>
          <li onClick={handleToggleNav}>
            <FontAwesomeIcon
              icon={navAlternative ? faBars : faXmark}
              size="xl"
              className={navAlternative ? "nav-button" : ""} // Agregar la clase nav-lateral aquí
              style={{ marginLeft: "5px", borderRadius: "3px" }}
            />
            <strong className={navAlternative ? "hidden" : "visible"}>
              Close
            </strong>
          </li>
          <li>
            <NavLink
              className="nav-lateral" // Agregar la clase nav-lateral aquí
              to="/index/Page/1.html"
            >
              <FontAwesomeIcon
                icon={faHouseUser}
                size="xl"
                onClick={handleLogout}
                style={{ marginLeft: "5px", borderRadius: "3px" }}
              />
              <strong className={navAlternative ? "hidden" : "visible"}>
                Home
              </strong>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-lateral" // Agregar la clase nav-lateral aquí
              to="/Dashboard"
            >
              <FontAwesomeIcon
                icon={faTableColumns}
                size="xl"
                className="nav-lateral" // Agregar la clase nav-lateral aquí
                style={{ marginLeft: "5px", borderRadius: "3px" }}
              />
              <strong className={navAlternative ? "hidden" : "visible"}>
                Dashboard
              </strong>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-lateral" // Agregar la clase nav-lateral aquí
              to="/User"
            >
              <FontAwesomeIcon
                icon={faUser}
                size="xl"
                className="nav-lateral" // Agregar la clase nav-lateral aquí
                style={{ marginLeft: "5px", borderRadius: "3px" }}
              />
              <strong className={navAlternative ? "hidden" : "visible"}>
                UserPage
              </strong>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default LateralNavbar;
