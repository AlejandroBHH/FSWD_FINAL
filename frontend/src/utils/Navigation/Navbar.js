import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "../Navigation/css/Navbar.module.css"; // Importa las clases desde el módulo CSS

// Icono para el logout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogout = () => {
    // Limpiar el token de acceso y cualquier otra información de usuario almacenada
    localStorage.removeItem("accessToken");
    navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
  };

  const currentPath = window.location.pathname;

  return (
    <header className={scrolled ? classes.scrolled : classes.scrolledoff}>
      <nav className={classes.navbar}>
        <h1>FanFicVerse</h1>
        <ul>
          {currentPath === "/login" ? (
            <li>
              <NavLink
                className={`${classes["nav-link"]} `}
                activeclassname={classes.active}
                to="/register"
              >
                Sign up
              </NavLink>
            </li>
          ) : (
            currentPath === "/register" && (
              <li>
                <NavLink
                  className={`${classes["nav-link"]}`}
                  activeclassname={classes.active}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            )
          )}
          {currentPath !== "/login" && currentPath !== "/register" && (
            <>
              <li>
                <NavLink
                  className={`${classes["nav-link"]}`}
                  to="/index/Page/1"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={`${classes["nav-link"]}`} to="/profile">
                  Profile{" "}
                </NavLink>
              </li>
              <li>
                <NavLink className={`${classes["nav-link"]}`} to="/fictions">
                  Ongoing Fictions
                </NavLink>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faPowerOff}
                  size="xl"
                  className={`${classes["nav-link"]}`}
                  onClick={handleLogout}
                  style={{
                    marginLeft: "5px",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
