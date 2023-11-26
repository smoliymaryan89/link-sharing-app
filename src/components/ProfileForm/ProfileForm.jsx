import { useFormik } from "formik";
import { nanoid } from "nanoid";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/userSlice";
import {
  updateUserAvatar,
  updateUserProfile,
} from "../../redux/user/userOperations";
import { selectUser } from "../../redux/user/userSelectors";

import sprite from "../../assets/icons/sprite.svg";
import Input from "../Input/Input";
import Button from "../Button/Button";

const firstName = nanoid();
const lastName = nanoid();
const emailPreview = nanoid();

const ProfileForm = () => {
  // TODO add validation add loader // maybe dont need to change email in base

  const [avatar, setAvatar] = useState("");

  const { id } = useSelector(selectUser);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      image: avatar,
      firstName: "",
      lastName: "",
      emailPreview: "",
    },

    onSubmit: ({ image, firstName, lastName, emailPreview }) => {
      const formData = new FormData();
      if (image) {
        formData.append("avatarURL", image);
        dispatch(updateUserAvatar(formData));
      }

      if (!firstName.trim() || !lastName.trim()) {
        return;
      }

      dispatch(updateUserProfile({ firstName, lastName, emailPreview, id }));

      formik.resetForm();
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setAvatar(reader.result);

        dispatch(updateUser({ imagePreview: reader.result }));
      };

      formik.setFieldValue("image", file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    dispatch(updateUser({ [name]: value }));

    formik.handleChange(e);
  };

  return (
    <form
      className=" bg-white  rounded-[12px]"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <div className="mb-[24px] bg-light-grey p-[20px] rounded-[12px] md:flex md:items-center">
        <p className="mb-[16px] flex-1">Profile picture</p>
        <div className="bg-light-purple text-center relative cursor-pointer w-[193px] h-[193px] mb-[24px] rounded-[12px] flex items-center justify-center flex-col gap-[8px] md:mr-[24px]">
          {avatar ? (
            <img
              src={avatar}
              className="w-full h-full absolute top-0 right-0 rounded-[12px] object-cover "
            />
          ) : (
            <svg className="block fill-blue" width={40} height={40}>
              <use href={`#${sprite}_img`}></use>
            </svg>
          )}
          {avatar && (
            <>
              <svg
                className="block relative z-30 fill-white"
                width={40}
                height={40}
              >
                <use href={`#${sprite}_img`}></use>
              </svg>
              <p className="font-semibold relative z-30 text-white">
                Change Image
              </p>
            </>
          )}
          <p className="text-blue font-semibold">+ Upload Image</p>
          <input
            type="file"
            className="block h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
            name="avatar"
            onChange={handleImageChange}
            value={formik.values.avatar}
            accept="image/png, image/jpeg"
          />
        </div>
        <p className="text-[12px] md:max-w-[127px]">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>

      <div className="bg-light-grey p-[20px] rounded-[12px] mb-[61px] md:flex md:gap-[12px] md:flex-col md:mb-[113px]">
        <div className="md:flex md:items-center md:justify-between sm:mb-[12px]">
          <label
            htmlFor={firstName}
            className="mb-[4px] md:mb-0 text-grey text-[12px] md:text-[16px] "
          >
            First name*
          </label>
          <Input
            id={firstName}
            name="firstName"
            onChange={handleInputChange}
            value={formik.values.firstName}
            type="text"
            placeholder={"e.g. John"}
            iconStyle={"hidden"}
            className={" profile-input md:w-[432px]"}
          />
        </div>

        <div className="md:flex md:items-center md:justify-between sm:mb-[12px]">
          <label
            htmlFor={lastName}
            className="mb-[4px] md:mb-0 text-grey text-[12px]  md:text-[16px]"
          >
            Last name*
          </label>
          <Input
            id={lastName}
            name="lastName"
            onChange={handleInputChange}
            value={formik.values.lastName}
            type="text"
            placeholder={"e.g. Appleseed"}
            iconStyle={"hidden"}
            className={"profile-input md:w-[432px]"}
          />
        </div>
        <div className="md:flex md:items-center md:justify-between">
          <label
            htmlFor={emailPreview}
            className="mb-[4px] md:mb-0 text-grey text-[12px] md:text-[16px]"
          >
            Email
          </label>
          <Input
            id={emailPreview}
            name="emailPreview"
            onChange={handleInputChange}
            value={formik.values.emailPreview}
            type="emailPreview"
            placeholder={"e.g. email@example.com"}
            iconStyle={"hidden"}
            className={"profile-input md:w-[432px]"}
          />
        </div>
      </div>

      <Button
        type="submit"
        title={"Save"}
        className={
          "block text-white sm:w-full hover:bg-blue hover:opacity-50 hover:text-white transition-all duration-350 md:py-[11px] md:px-[27px] md:w-[91px] md:ml-auto  "
        }
      />
    </form>
  );
};

export default ProfileForm;
