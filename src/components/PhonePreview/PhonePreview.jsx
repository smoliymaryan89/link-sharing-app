import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelectors";
import {
  selectLinks,
  selectPreviewLinks,
} from "../../redux/link/linkSelectors";

import PhoneIcon from "../../assets/icons/phone.svg";
import PreviewItem from "../LinkList/PreviewItem/PreviewItem";

const PhonePreview = () => {
  const { image, imagePreview, lastName, firstName, emailPreview } =
    useSelector(selectUser);

  const links = useSelector(selectLinks);
  const previewLinks = useSelector(selectPreviewLinks);

  const nonMatchingPreviewLinks = previewLinks.filter(
    (previewLink) => !links.some((link) => link.id === previewLink.id)
  );

  const linksArray = [...links, ...nonMatchingPreviewLinks];

  let fullName = `${firstName} ${lastName}`;

  if (fullName.length > 15) {
    fullName = fullName.slice(0, 15);
  }

  return (
    <section className="section">
      <div className=" w-[560px] h-[835.6px] bg-white rounded-[12px] py-[102px] px-[127px] relative ">
        <div className="absolute top-[287px] left-[200px] flex flex-col justify-center items-center">
          <div
            className={`w-[160px] h-[16px] rounded-[104px] bg-[#eee] mb-[13px] ${
              firstName && "bg-transparent"
            }`}
          >
            {firstName && (
              <div className="flex items-center justify-center">
                <p className="text-center text-[18px] font-semibold text-dark-grey">
                  {fullName}
                </p>
              </div>
            )}
          </div>
          <div
            className={`min-w-[72px] h-[8px] rounded-[104px] bg-[#eee]   mx-auto ${
              emailPreview && "bg-transparent "
            }`}
          >
            {emailPreview && (
              <p className="text-center text-[14px]">
                {emailPreview.slice(0, 15)}
              </p>
            )}
          </div>
        </div>

        {imagePreview || image ? (
          <img
            src={imagePreview || image}
            className="rounded-full w-24 h-24 absolute top-[166px] left-[230px] object-cover border-[4px] border-blue"
          />
        ) : null}

        <ul className="absolute top-[379px] left-[161px]">
          {linksArray.slice(0, 5).map(({ id, platform, url }) => (
            <PreviewItem key={id} id={id} platform={platform} url={url} />
          ))}
        </ul>

        <svg className="w-full h-full ">
          <use href={`#${PhoneIcon}`}></use>
        </svg>
      </div>
    </section>
  );
};

export default PhonePreview;
