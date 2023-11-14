import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="max-w-[375px] px-4 mx-auto md:max-w-[768px] md:px-6 lg:max-w-[1440px]">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
