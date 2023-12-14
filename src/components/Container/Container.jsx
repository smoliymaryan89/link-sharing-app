import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <div
      className={`max-w-[375px] px-[16px] mx-auto md:max-w-[768px] md:px-[24px] lg:max-w-[1400px] ${className}`}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
