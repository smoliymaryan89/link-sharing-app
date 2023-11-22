import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/userSelectors";

import PhoneIcon from "../../assets/icons/phone.svg";

const PhonePreview = () => {
  const { image, imagePreview, lastName, firstName, emailPreview } =
    useSelector(selectUser);

  //TODO add border color when its focus

  return (
    <section className="section">
      <div className=" w-[560px] h-[835.6px] bg-white rounded-[12px] py-[102px] px-[127px] relative ">
        <div className="absolute top-[287px] left-[200px] flex flex-col justify-center items-center">
          <div
            className={`min-w-[160px] h-[16px] rounded-[104px] bg-[#eee] mb-[13px] ${
              firstName && "bg-transparent"
            }`}
          >
            {firstName && (
              <div className="flex items-center justify-center">
                <p className="text-center text-[18px] font-semibold text-dark-grey">
                  {firstName} {lastName}
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
              <p className="text-center text-[14px]">{emailPreview}</p>
            )}
          </div>
        </div>

        {imagePreview ? (
          <img
            src={imagePreview}
            className="rounded-full w-24 h-24 absolute top-[166px] left-[230px] object-cover"
          />
        ) : (
          <img
            src={image}
            className="rounded-full w-24 h-24 absolute top-[166px] left-[230px] object-cover"
          />
        )}

        <svg className="w-full h-full ">
          <use href={`#${PhoneIcon}`}></use>
        </svg>
      </div>
    </section>
  );
};

export default PhonePreview;
