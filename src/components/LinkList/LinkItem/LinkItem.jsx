import PropTypes from "prop-types";

import { nanoid } from "nanoid";
import { useState } from "react";

import { Reorder } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { deletePreviewLink, getData } from "../../../redux/link/linkSlice";
import { deleteLink } from "../../../redux/link/linkOperations";
import {
  selectLinks,
  selectPreviewLinks,
} from "../../../redux/link/linkSelectors";

import sprite from "../../../assets/icons/sprite.svg";
import options from "../../../utils/selectData";
import getPlaceholder from "../../../utils/getPlaceholder";

import Button from "../../Button/Button";
import CustomSelect from "../../CustomSelect/CustomSelect";
import Input from "../../Input/Input";

const platformId = nanoid();
const linkId = nanoid();

const LinkItem = ({ handleDelete, item, linkList, index }) => {
  const { id: itemId, url, platform } = item;

  const [selectedLink, setSelectedLink] = useState();

  const [linkUrl, setLinkUrl] = useState(url || "");

  const dispatch = useDispatch();

  const links = useSelector(selectLinks);
  const previewLink = useSelector(selectPreviewLinks);

  const handleChange = (value) => {
    setSelectedLink(value);

    dispatch(getData({ id: itemId, platform: value }));
  };

  const handleInput = (e) => {
    const value = e.target.value;

    setLinkUrl(value.trim());

    dispatch(getData({ id: itemId, url: value.trim() }));
  };

  return (
    <Reorder.Item
      value={item}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      id={itemId}
      className="p-[17px] rounded-[12px] bg-light-grey mb-[15px] mr-[8px] "
    >
      <div className="flex items-center mb-[12px]">
        <svg className="block mr-[8px]" width={12} height={6}>
          <use href={`#${sprite}_line`}></use>
        </svg>

        <p className="font-bold">Link #{index + 1}</p>

        <Button
          type={"button"}
          title={"Remove"}
          onClick={() => {
            if (previewLink.length > 0) {
              dispatch(deletePreviewLink(itemId));
            }

            if (linkList?.length > 0) {
              handleDelete(itemId);
            }

            if (links.length > 0 || linkList.length === 0) {
              dispatch(deleteLink(itemId));
            }
          }}
          className={
            "py-[0px] px-[0px]  pl-[0px] pr-[0px] bg-transparent font-normal ml-auto w-[91px]"
          }
        />
      </div>

      <div>
        <label
          htmlFor={platformId}
          className="block mb-[4px] text-[12px] text-dark-grey "
        >
          Platform
        </label>
        <CustomSelect
          platformId={platformId}
          className={"mb-[12px]"}
          selectedLink={selectedLink ?? platform}
          handleChange={handleChange}
          options={options}
        />

        <label
          htmlFor={linkId}
          className="block mb-[4px] text-[12px] text-dark-grey "
        >
          Link
        </label>
        <Input
          type="text"
          name="linkUrl"
          value={linkUrl}
          id={linkId}
          icon={"link"}
          iconStyle={"w-[16px] h-[16px] fill-grey"}
          onChange={handleInput}
          placeholder={getPlaceholder(selectedLink)}
        />
      </div>
    </Reorder.Item>
  );
};

LinkItem.propTypes = {
  handleDelete: PropTypes.func,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    platform: PropTypes.object,
  }).isRequired,
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

export default LinkItem;
