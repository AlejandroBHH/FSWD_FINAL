import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faBars,
  faTableColumns,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../LateralNavbar/LateralNavbar.css";

function LateralNavbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current location

  const [navAlternative, setNavAlternative] = useState(true);

  const handleToggleNav = () => {
    setNavAlternative(!navAlternative);
  };

  const handleLogout = () => {
    navigate("/index");
  };

  const dashboardLink = location.pathname.includes("Dashboard")
    ? "/NewStory"
    : "/Dashboard";

  return (
    <header className={"scrolledLateral"}>
      <nav className={"lateralNavbar"}>
        <ul className={navAlternative ? "lateral" : "lateralAlternative"}>
          <li onClick={handleToggleNav}>
            <FontAwesomeIcon
              icon={navAlternative ? faBars : faXmark}
              size="xl"
              className={navAlternative ? "nav-button" : ""}
              style={{ marginLeft: "5px", borderRadius: "3px" }}
            />
            <strong className={navAlternative ? "hidden" : "visible"}>
              Close
            </strong>
          </li>
          <li>
            <NavLink className="nav-lateral" to={`/index/Page/1.html`}>
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
            <NavLink className="nav-lateral" to={dashboardLink}>
              <FontAwesomeIcon
                icon={faTableColumns}
                size="xl"
                style={{ marginLeft: "5px", borderRadius: "3px" }}
              />
              <strong className={navAlternative ? "hidden" : "visible"}>
                {location.pathname.includes("Dashboard")
                  ? "NewStory"
                  : "Dashboard"}
              </strong>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-lateral" to="/User">
              <FontAwesomeIcon
                icon={faUser}
                size="xl"
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
