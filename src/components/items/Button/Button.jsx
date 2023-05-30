import classNames from "classnames";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ className }) => {
  var classes = classNames([className, "button"]);
  return <button className={classes}>Button</button>;
};
Button.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
Button.defaultProps = {
  buttonLabel: "Button",
};
export default Button;
