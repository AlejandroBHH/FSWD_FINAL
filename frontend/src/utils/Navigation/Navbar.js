import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Navigation/Navbar.css";

// Icono para el logout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

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
    <header className={scrolled ? "scrolled" : "scrolledoff"}>
      <nav className="navbar">
        <h1>FanFicVerse</h1>
        <ul>
          {currentPath === "/login" ? (
            <li>
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/register"
              >
                Sign up
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
          {currentPath !== "/login" && currentPath !== "/register" && (
            <>
              <li>
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/index/Page/1.html"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/User"
                >
                  User
                </NavLink>
              </li>
            </>
          )}

          <li>
            <FontAwesomeIcon
              icon={faHouseUser}
              size="xl"
              className="nav-link"
              onClick={handleLogout}
              style={{ marginLeft: "5px", borderRadius: "3px" }}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
