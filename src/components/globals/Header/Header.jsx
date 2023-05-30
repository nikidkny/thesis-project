import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Header.scss";
import Line from "../Line/Line";

const Header = ({ className, theme }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  var classes = classNames([className, "header", `header-${theme}`]);
  return (
    <nav className={classes}>
      {!isLoginPage && (
        <div>
          <Link to="/profile">
            <Logo></Logo>
          </Link>
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
      )}
      {isLoginPage && (
        <li>
          <Link to="/">
            <Logo></Logo>
          </Link>
        </li>
      )}
      <Line />
    </nav>
  );
};
Header.PropType = {
  theme: PropTypes.oneOf(["light", "dark"]),
};
Header.defaultProps = {
  theme: "light",
};
export default Header;
