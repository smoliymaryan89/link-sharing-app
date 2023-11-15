import PropTypes from "prop-types";

const Button = ({ className, type, title }) => {
  return (
    <button
      className={` w-full rounded-[8px] py-[11px] px-[80px] bg-blue text-white font-semibold ${className}`}
      type={type}
    >
      {title}
    </button>
  );
};

Button.propTypes = {};

export default Button;
