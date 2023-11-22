import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { useDispatch, useSelector } from "react-redux";
import { getLinkData, removePreviewLink } from "../../redux/link/linkSlice";
import { deleteLink } from "../../redux/link/linkOperations";
import { selectLink } from "../../redux/link/linkSelectors";

import sprite from "../../assets/icons/sprite.svg";
import links from "../../utils/selectData";

import Button from "../Button/Button";
import CustomeSelect from "../CustomSelect/CustomSelect";
import Input from "../Input/Input";

const platformId = nanoid();
const linkId = nanoid();

const LinkItem = ({ id, label, value, linkText, handleDeleteLinkItem }) => {
  const [selectedLink, setSelectedLink] = useState(links[0]);

  const dispatch = useDispatch();
  const link = useSelector(selectLink);

  const handleInput = (e) => {
    dispatch(getLinkData({ id, link: e.target.value }));
  };

  const handleChange = (value) => {
    setSelectedLink(value);
  };

  useEffect(() => {
    dispatch(getLinkData({ id, platform: selectedLink }));
  }, [dispatch, id, selectedLink]);

  return (
    <li className="p-[20px] bg-light-grey  rounded-[10px]">
      <div className="flex justify-between items-center mb-[12px]">
        <div className="flex items-center gap-[8px]">
          <svg className="" width={12} height={6}>
            <use href={`#${sprite}_line`}></use>
          </svg>
          <span className="text-[16px] font-semibold">Link #{1}</span>
        </div>

        <Button
          title="Remove"
          className={` max-w-[61px]  bg-transparent py-0 px-0`}
          onClick={() => {
            handleDeleteLinkItem(id);
            dispatch(removePreviewLink(id));

            if (link.length > 0) {
              dispatch(deleteLink({ id }));
            }
          }}
        />
      </div>

      <div>
        <div className="mb-[12px]">
          <label htmlFor={platformId} className="text-[12px] mb-[4px] block">
            Platform
          </label>
          <CustomeSelect
            platformId={platformId}
            handleChange={handleChange}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            options={links}
          />
        </div>

        <div>
          <label htmlFor={linkId} className="text-[12px] mb-[4px]  block">
            Link
          </label>
          <Input
            id={linkId}
            className={"pr-0"}
            icon={"link"}
            iconStyle={"w-[16px] h-[16px] fill-grey"}
            name="link"
            onChange={handleInput}
          />
        </div>
      </div>
    </li>
  );
};

export default LinkItem;
