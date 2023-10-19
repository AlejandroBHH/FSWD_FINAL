import React from "react";
import "../Footer/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} size="2xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} size="2xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faYoutube} size="2xl" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} size="2xl" />
          </a>
        </div>

        <div className="row">
          Copyright © 2023 AlejandroBH - All rights reserved || Designed By:
          AlejandroBH
        </div>
      </div>
    </footer>
  );
}

export default Footer;
