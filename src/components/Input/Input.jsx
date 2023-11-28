import PropTypes from "prop-types";

import sprite from "../../assets/icons/sprite.svg";

const Input = ({
  id,
  name,
  type,
  onChange,
  value,
  className,
  placeholder,
  icon,
  iconStyle,
  onBlur,
}) => {
  return (
    <div className={`relative  flex items-center`}>
      <svg className={`absolute top-[16px] left-[16px] ${iconStyle}`}>
        <use href={`#${sprite}_${icon}`}></use>
      </svg>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`rounded-[8px] w-full border-input border-[1px] outline-none text-[16px] leading-[1.5] text-dark-grey py-[12px] pl-[44px] pr-[44px] ${className}`}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.string,
};

export default Input;
