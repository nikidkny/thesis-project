import classNames from "classnames";
import "./Footer.scss";

const Footer = ({ clasName }) => {
  var classes = classNames([clasName, "footer"]);
  return <div className={classes}>Footer</div>;
};

export default Footer;
