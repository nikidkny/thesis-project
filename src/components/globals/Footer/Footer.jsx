import classNames from "classnames";
import PropTypes from "prop-types";
import "./Footer.scss";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import Line from "../Line/Line";

const Footer = ({ className, theme }) => {
  var classes = classNames([className, "footer", `footer-${theme}`]);
  return (
    <div className={classes}>
      <Link to="/profile">
        <Logo></Logo>
      </Link>
      <Line />
      <ul>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};
Footer.PropType = {
  theme: PropTypes.oneOf(["light", "dark"]),
};
Footer.defaultProps = {
  theme: "light",
};
export default Footer;
