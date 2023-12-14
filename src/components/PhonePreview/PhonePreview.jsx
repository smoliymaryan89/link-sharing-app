import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import EllipsisText from "react-ellipsis-text";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelectors";
import {
  selectLinks,
  selectPreviewLinks,
} from "../../redux/link/linkSelectors";

import { getAllLinks } from "../../redux/link/linkOperations";
import { getProfile, getUserAvatar } from "../../redux/user/userOperations";

import PhoneIcon from "../../assets/icons/phone.svg";
import PreviewItem from "../LinkList/PreviewItem/PreviewItem";

const PhonePreview = () => {
  const { image, imagePreview, lastName, firstName, emailPreview } =
    useSelector(selectUser);

  const dispatch = useDispatch();

  const location = useLocation();

  const links = useSelector(selectLinks);
  const previewLinks = useSelector(selectPreviewLinks);

  useEffect(() => {
    if (links.length === 0 && location.pathname !== "/") {
      dispatch(getAllLinks());
    }
  }, [dispatch, links.length, location.pathname]);

  useEffect(() => {
    if (!image && !imagePreview && location.pathname !== "/profile") {
      dispatch(getUserAvatar());
    }
  }, [dispatch, image, imagePreview, location.pathname]);

  useEffect(() => {
    if (
      !firstName &&
      !lastName &&
      !emailPreview &&
      location.pathname !== "/profile"
    ) {
      dispatch(getProfile());
    }
  }, [dispatch, emailPreview, firstName, lastName, location.pathname]);

  const combinedLinks = [
    ...previewLinks.map((previewLink) => ({
      ...previewLink,
      platform:
        previewLink.platform ||
        links.find((link) => link.id === previewLink.id)?.platform,
      url:
        previewLink.url ||
        links.find((link) => link.id === previewLink.id)?.url,
    })),
    ...links.filter(
      (link) => !previewLinks.some((previewLink) => previewLink.id === link.id)
    ),
  ].sort(
    (a, b) =>
      links.findIndex((link) => link.id === a.id) -
      links.findIndex((link) => link.id === b.id)
  );

  const linksArray = combinedLinks.slice(0, 5);

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

  return (
    <section className="section hidden lg:block">
      <div className=" w-[560px] h-[835.6px] bg-white rounded-[12px] py-[102px] px-[127px] relative ">
        <div className="absolute top-[287px] left-[200px] flex flex-col justify-center items-center">
          <div
            className={`w-[160px] h-[16px] rounded-[104px] bg-[#eee] mb-[13px] ${
              (firstName || lastName) && "bg-transparent"
            }`}
          >
            {fullName && (
              <div className="flex items-center justify-center">
                <EllipsisText
                  text={fullName}
                  length={16}
                  className={
                    "text-center text-[18px] font-semibold text-dark-grey"
                  }
                />
              </div>
            )}
          </div>
          <div
            className={`min-w-[72px] h-[8px] rounded-[104px] bg-[#eee] mx-auto ${
              emailPreview && "bg-transparent "
            }`}
          >
            {emailPreview && (
              <EllipsisText
                text={emailPreview}
                length={20}
                className={"text-center text-[14px]"}
              />
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
