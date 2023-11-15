import PropTypes from "prop-types";

const Button = ({ className, type, title, disabled }) => {
  return (
    <button
      className={` w-full rounded-[8px] py-[11px] px-[80px] bg-blue  font-semibold ${className}`}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
