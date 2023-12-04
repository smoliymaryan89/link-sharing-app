import PropTypes from "prop-types";

const Button = ({ className, type, title, disabled, onClick }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-[8px] py-[11px] px-[80px] bg-blue  font-semibold ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
