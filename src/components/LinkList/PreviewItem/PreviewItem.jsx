import sprite from "../../../assets/icons/sprite.svg";

const PreviewItem = ({ id, color, icon, url, label }) => {
  return (
    <li
      key={id}
      className={`flex items-center w-[237px] ${color} py-[14px] px-[16px] rounded-[8px] mb-[18px] last:mb-0`}
    >
      <svg className="block mr-[8px] fill-white" width="16" height="16">
        <use href={icon}></use>
      </svg>
      <a href={url} className="text-white text-[12px]">
        {label}
      </a>
      <svg className="block fill-white ml-auto" width="16" height="16">
        <use href={`#${sprite}_arrow`}></use>
      </svg>
    </li>
  );
};

export default PreviewItem;
