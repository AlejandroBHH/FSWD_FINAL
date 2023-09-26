import { NavLink } from "react-router-dom";
import "../Navigation/Navbar.css";
import { useState, useEffect } from "react";

function Navbar() {
  //para el sticky navbar
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={scrolled ? "scrolled" : "scrolledoff"}>
      <nav>
        <h1>Index Search</h1>
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
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
