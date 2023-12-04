import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { selectLinks } from "../../redux/link/linkSelectors";
import { selectUser } from "../../redux/user/userSelectors";

import PreviewItem from "../LinkList/PreviewItem/PreviewItem";

const PreviewContent = ({ className }) => {
  const links = useSelector(selectLinks);
  const { image, lastName, firstName, emailPreview } = useSelector(selectUser);

  return (
    <div
      className={`max-w-[350px] mx-auto md:py-[48px] md:px-[56px] md:rounded-[24px] md:bg-white md:shadow-card-shadow ${className}`}
    >
      <div className="mb-[56px]">
        {image ? (
          <img
            src={image}
            className="rounded-full w-[104px] h-[104px] object-cover border-[4px] border-blue mb-[25px] mx-auto"
          />
        ) : (
          <div className="rounded-full w-[104px] h-[104px] bg-dark-white mb-[25px] mx-auto"></div>
        )}

        <ul>
          <li className="text-[32px] font-bold text-dark-grey text-center mb-[8px]">
            {firstName && firstName} {lastName && lastName}
          </li>
          <li className="text-center">{emailPreview && emailPreview}</li>
        </ul>
      </div>

      {links.length > 0 && (
        <ul className="flex flex-col items-center">
          {links.map(({ id, platform, url }) => (
            <PreviewItem key={id} platform={platform} url={url} />
          ))}
        </ul>
      )}
    </div>
  );
};

PreviewContent.propTypes = {
  className: PropTypes.string,
};

export default PreviewContent;
