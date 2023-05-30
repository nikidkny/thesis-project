import PropTypes from "prop-types";
import classNames from "classnames";
import "./LoginButton.scss";

const LoginButton = ({ className, buttonLabel }) => {
  var classes = classNames([className, "button"]);
  return (
    <button type="button" className={classes}>
      {buttonLabel}
    </button>
  );
};
LoginButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
LoginButton.defaultProps = {
  buttonLabel: "Button",
};
export default LoginButton;
