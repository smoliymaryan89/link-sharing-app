import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const AuthPrompt = ({ text, path, label }) => {
  return (
    <div className="flex items-center flex-col md:flex-row md:gap-[3px] md:justify-center">
      <p className="text-center">{text}</p>
      <Link className=" text-blue" to={path}>
        {label}
      </Link>
    </div>
  );
};

AuthPrompt.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default AuthPrompt;
