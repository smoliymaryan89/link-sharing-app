import PropTypes from "prop-types";

const InfoPanel = ({ title, text, className }) => {
  return (
    <div className="mb-[40px]">
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
};

export default InfoPanel;
