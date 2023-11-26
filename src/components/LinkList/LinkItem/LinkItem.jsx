import PropTypes from "prop-types";

import { nanoid } from "nanoid";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deletePreviewLink, getData } from "../../../redux/link/linkSlice";
import { deleteLink } from "../../../redux/link/linkOperations";
import { selectPreviewLinks } from "../../../redux/link/linkSelectors";

import sprite from "../../../assets/icons/sprite.svg";
import options from "../../../utils/selectData";

import Button from "../../Button/Button";
import CustomSelect from "../../CustomSelect/CustomSelect";
import Input from "../../Input/Input";
import getPlaceholder from "../../../utils/getPlaceholder";

const platformId = nanoid();
const linkId = nanoid();

const LinkItem = ({ handleDelete, item, linkList }) => {
  const { id: itemId, url, platform } = item;

  const [selectedLink, setSelectedLink] = useState();
  const [linkUrl, setLinkUrl] = useState("");

  const previewLink = useSelector(selectPreviewLinks);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedLink(value);

    dispatch(getData({ id: itemId, platform: value }));
  };

  const handleInput = (e) => {
    setLinkUrl(e.target.value);

    if (!linkUrl.trim()) {
      return;
    }

    dispatch(getData({ id: itemId, url: e.target.value }));
  };

  return (
    <li className="p-[17px] rounded-[12px] bg-light-grey mb-[15px] mr-[8px] ">
      <div className="flex items-center mb-[12px]">
        <svg className="block mr-[8px]" width={12} height={6}>
          <use href={`#${sprite}_line`}></use>
        </svg>

        <Button
          type={"button"}
          title={"Remove"}
          onClick={() => {
            if (linkList?.length > 0) {
              handleDelete(itemId);
              return;
            }
            if (previewLink.length > 0) {
              dispatch(deletePreviewLink(itemId));
            }

            dispatch(deleteLink(itemId));
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
          value={linkUrl ?? url}
          id={linkId}
          icon={"link"}
          iconStyle={"w-[16px] h-[16px] fill-grey"}
          onChange={handleInput}
          placeholder={getPlaceholder(selectedLink)}
        />
      </div>
    </li>
  );
};

LinkItem.propTypes = {
  handleDelete: PropTypes.func,
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
