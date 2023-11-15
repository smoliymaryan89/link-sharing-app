import PropTypes from "prop-types";

const InfoPanel = ({ title, text, className, wrapper }) => {
  return (
    <div className={`mb-[40px] ${wrapper}`}>
      <h2
        className={`text-dark-grey text-[24px] font-bold mb-[8px] md:text-[32px] ${className}`}
      >
        {title}
      </h2>
      <p>{text}</p>
    </div>
  );
};

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  wrapper: PropTypes.string,
};

export default InfoPanel;
