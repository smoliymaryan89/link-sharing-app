import PropTypes from "prop-types";

import sprite from "../../../assets/icons/sprite.svg";

const PreviewItem = ({ platform, url }) => {
  return (
    platform && (
      <li
        className={`w-[237px] ${platform?.color} rounded-[8px] mb-[18px] last:mb-0`}
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-white flex items-center text-[12px] py-[14px] px-[16px]"
        >
          <svg className="block mr-[8px] fill-white" width="16" height="16">
            <use href={platform?.icon}></use>
          </svg>
          {platform?.label}

          <svg className="block fill-white ml-auto" width="16" height="16">
            <use href={`#${sprite}_arrow`}></use>
          </svg>
        </a>
      </li>
    )
  );
};

PreviewItem.propTypes = {
  platform: PropTypes.shape({
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  url: PropTypes.string,
};

export default PreviewItem;
