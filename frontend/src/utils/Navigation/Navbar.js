import { NavLink } from "react-router-dom";
import "../Navigation/Navbar.css";

function Navbar() {
  return (
    <nav>
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
  );
}

export default Navbar;
