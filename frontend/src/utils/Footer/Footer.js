import classes from "../Footer/css/Footer.module.css";
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
      <div className={classes.footer}>
        <div className={classes.row}>
          <span>
            <FontAwesomeIcon icon={faFacebook} size="2xl" />
          </span>
          <span>
            <FontAwesomeIcon icon={faInstagram} size="2xl" />
          </span>
          <span>
            <FontAwesomeIcon icon={faYoutube} size="2xl" />
          </span>
          <span>
            <FontAwesomeIcon icon={faTwitter} size="2xl" />
          </span>
        </div>

        <div className={classes.row}>
          Copyright © 2023 AlejandroBH - All rights reserved || Designed By:
          AlejandroBH
        </div>
      </div>
    </footer>
  );
}

export default Footer;
