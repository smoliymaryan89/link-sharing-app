import PropTypes from "prop-types";

import { Triangle } from "react-loader-spinner";

const Loader = ({ className }) => {
  return (
    <div
      className={`flex items-center justify-center h-[100vh] w-[100vw]  ${className}`}
    >
      <Triangle
        height="80"
        width="80"
        color="#633CFF"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
