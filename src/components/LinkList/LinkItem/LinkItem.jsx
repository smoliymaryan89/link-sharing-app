import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import sprite from "../../../assets/icons/sprite.svg";
import link from "../../../utils/selectData";

import Button from "../../Button/Button";
import CustomSelect from "../../CustomSelect/CustomSelect";
import Input from "../../Input/Input";
import { deletePreviewLink, getData } from "../../../redux/link/linkSlice";
import { deleteLink } from "../../../redux/link/linkOperations";
import {
  selectLinks,
  selectPreviewLinks,
} from "../../../redux/link/linkSelectors";

const platformId = nanoid();
const linkId = nanoid();

const LinkItem = ({ handleDelete, item }) => {
  const { id: itemId, url, platform } = item;

  const [selectedLink, setSelectedLink] = useState();
  const [linkUrl, setLinkUrl] = useState(url);

  console.log("selectLinks", selectedLink);

  const previewLink = useSelector(selectPreviewLinks);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedLink(value);
    dispatch(getData({ id: itemId, platform: value }));
  };

  const handleInput = (e) => {
    setLinkUrl(e.target.value);
    dispatch(getData({ id: itemId, url: e.target.value }));
  };

  return (
    <li className="p-[20px] rounded-[12px] bg-light-grey">
      <div className="flex items-center mb-[12px]">
        <svg className="block mr-[8px]" width={12} height={6}>
          <use href={`#${sprite}_line`}></use>
        </svg>
        <p className="text-[16px] font-bold">Link #{1}</p>
        <Button
          type={"button"}
          title={"Remove"}
          onClick={() => {
            if (previewLink.length > 0) {
              dispatch(deletePreviewLink(itemId));
            }
            handleDelete(itemId);
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
          selectedLink={platform ?? selectedLink}
          handleChange={handleChange}
          options={link}
        />

        <label
          htmlFor={linkId}
          className="block mb-[4px] text-[12px] text-dark-grey "
        >
          Link
        </label>
        <Input
          name="linkUrl"
          value={linkUrl}
          id={linkId}
          icon={"link"}
          iconStyle={"w-[16px] h-[16px] fill-grey"}
          onChange={handleInput}
        />
      </div>
    </li>
  );
};

export default LinkItem;
