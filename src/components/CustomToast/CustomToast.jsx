import sprite from "../../assets/icons/sprite.svg";

const CustomToast = (t) => {
  return (
    <div
      className={`max-w-[406px] w-full bg-dark-grey rounded-[12px] shadow-card-shadow py-[16px] px-[24px]`}
    >
      <div className="flex items-center gap-[8px]">
        <svg className="block fill-grey" width={20} height={20}>
          <use href={`#${sprite}_${t.icon}`}></use>
        </svg>
        <p className="font-semibold text-[14px] md:text-[16px] text-white">
          {t.text}
        </p>
      </div>
    </div>
  );
};

export default CustomToast;
