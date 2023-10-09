import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Navigation/Navbar.css";

function Navbar() {
  //para el sticky navbar
  const [scrolled, setScrolled] = useState(false);
  //para el logout
  const navigate = useNavigate();
  //manejar el sticky navbar
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

  return (
    <header className={scrolled ? "scrolled" : "scrolledoff"}>
      <nav>
        <h1>FanFicVerse</h1>
        <ul>
          <li>
            <NavLink
              className="nav-link" // Agregar la clase nav-link aquí
              activeclassname="active" // Opcional, si deseas resaltar el enlace activo
              to="/index/Page/1.html"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link" // Agregar la clase nav-link aquí
              activeclassname="active" // Opcional, si deseas resaltar el enlace activo
              to="/Login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link" // Agregar la clase nav-link aquí
              activeclassname="active" // Opcional, si deseas resaltar el enlace activo
              to="/User"
            >
              User
            </NavLink>
          </li>
          <li>
            <button
              className="nav-link" // Agregar la clase nav-link aquí
              onClick={handleLogout}
              style={{ marginLeft: "5px", borderRadius: "3px" }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
