import { useFormik } from "formik";
import { nanoid } from "nanoid";

import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/userSlice";
import {
  updateUserAvatar,
  updateUserProfile,
} from "../../redux/user/userOperations";
import { selectIsLoading, selectUser } from "../../redux/user/userSelectors";

import { profileValidationSchema } from "../../utils/validationSchemas";

import sprite from "../../assets/icons/sprite.svg";
import Input from "../Input/Input";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import CustomToast from "../CustomToast/CustomToast";
import BtnLoader from "../Loader/BtnLoader";

const firstName = nanoid();
const lastName = nanoid();
const emailPreview = nanoid();

const ProfileForm = () => {
  const {
    id,
    imagePreview,
    image,
    firstName: userFirstName,
    lastName: userLastName,
    emailPreview: userEmailPreview,
  } = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      image: imagePreview,
      firstName: "",
      lastName: "",
      emailPreview: "",
    },
    validationSchema: profileValidationSchema,
    onSubmit: async ({ image, firstName, lastName, emailPreview }) => {
      const formData = new FormData();

      try {
        if (image) {
          formData.append("avatarURL", image);

          await dispatch(updateUserAvatar(formData)).unwrap();
          toast.custom((t) => (
            <CustomToast
              t={t}
              text={"Your changes have been successfully saved!"}
              icon={"save"}
            />
          ));
        }

        if (firstName.trim() || lastName.trim() || emailPreview.trim()) {
          await dispatch(
            updateUserProfile({ firstName, lastName, emailPreview, id })
          ).unwrap();

          toast.custom((t) => (
            <CustomToast
              t={t}
              text={"Your changes have been successfully saved!"}
              icon={"save"}
            />
          ));
        }

        resetForm();
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.custom((t) => (
          <CustomToast t={t} text={message} icon={"warning"} />
        ));
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const fileSize = (file.size / 1024 / 1024).toFixed(4);

    if (fileSize >= 5) {
      return toast.custom((t) => (
        <CustomToast
          t={t}
          text={"Image size must be less than 5 MB"}
          icon={"warning"}
        />
      ));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      dispatch(updateUser({ imagePreview: reader.result }));
    };

    setFieldValue("image", file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    dispatch(updateUser({ [name]: value }));

    handleChange(e);
  };

  return (
    <form
      className=" bg-white  rounded-[12px]"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="mb-[24px] bg-light-grey p-[20px] rounded-[12px] md:flex md:items-center">
        <p className="mb-[16px] flex-1">Profile picture</p>
        <div className="profile-wrapper-input bg-light-purple text-center relative cursor-pointer w-[193px] h-[193px] mb-[24px] rounded-[12px] flex items-center justify-center flex-col gap-[8px] md:mr-[24px]">
          {imagePreview || image ? (
            <>
              <img
                src={imagePreview || image}
                className="w-full h-full absolute top-0 right-0 rounded-[12px] object-cover"
              />
              <div className="change-img opacity-0 transition-opacity duration-350">
                <svg
                  className="block mx-auto relative z-30 fill-white"
                  width={40}
                  height={40}
                >
                  <use href={`#${sprite}_img`}></use>
                </svg>
                <p className="font-semibold relative z-30 text-white">
                  Change Image
                </p>
              </div>
            </>
          ) : (
            <>
              <svg className="block fill-blue" width={40} height={40}>
                <use href={`#${sprite}_img`}></use>
              </svg>
              <p className="text-blue font-semibold">+ Upload Image</p>
            </>
          )}

          <input
            type="file"
            className="block h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
            name="avatar"
            onChange={handleImageChange}
            value={values.imagePreview}
            accept="image/png, image/jpeg"
          />
        </div>
        <p className="text-[12px] md:max-w-[127px]">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>

      <div className=" bg-light-grey p-[20px] rounded-[12px] mb-[61px] md:flex md:gap-[12px] md:flex-col md:mb-[113px]">
        <div className="md:flex md:items-center sm:mb-[12px] relative">
          <label
            htmlFor={firstName}
            className="mb-[4px] md:mb-0 text-grey text-[12px] md:text-[16px] md:w-[90px]"
          >
            First name
          </label>
          <Input
            id={firstName}
            name="firstName"
            onChange={handleInputChange}
            onBlur={handleBlur}
            value={userFirstName || values.firstName}
            type="text"
            placeholder={"e.g. John"}
            iconStyle={"hidden"}
            className={`profile-input md:ml-auto md:max-w-[344px] lg:max-w-[432px] focus:border-blue box-shadow-input ${
              errors.firstName && touched.firstName
                ? "border-red focus:border-red !pr-[230px]"
                : "focus:border-blue box-shadow-input"
            }`}
            wrapperStyles={"flex-grow"}
          />

          {touched.firstName && errors.firstName ? (
            <div className="absolute  top-[16px] right-[20px] ">
              <p className="text-red text-[12px]">{errors.firstName}</p>
            </div>
          ) : null}
        </div>

        <div className="md:flex md:items-center  sm:mb-[12px] relative">
          <label
            htmlFor={lastName}
            className="mb-[4px] md:mb-0 text-grey text-[12px]  md:text-[16px] md:w-[90px]"
          >
            Last name
          </label>
          <Input
            id={lastName}
            name="lastName"
            value={userLastName || values.lastName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="text"
            placeholder={"e.g. Appleseed"}
            iconStyle={"hidden"}
            className={`profile-input md:ml-auto md:max-w-[344px] lg:max-w-[432px] focus:border-blue box-shadow-input ${
              errors.lastName && touched.lastName
                ? "border-red focus:border-red !pr-[230px]"
                : "focus:border-blue box-shadow-input"
            }`}
            wrapperStyles={"flex-grow"}
          />

          {touched.lastName && errors.lastName ? (
            <div className="absolute  top-[16px] right-[20px] ">
              <p className="text-red text-[12px]">{errors.lastName}</p>
            </div>
          ) : null}
        </div>

        <div className="md:flex md:items-center relative">
          <label
            htmlFor={emailPreview}
            className="mb-[4px] md:mb-0 text-grey text-[12px] md:text-[16px] md:w-[90px]"
          >
            Email
          </label>
          <Input
            id={emailPreview}
            name="emailPreview"
            value={userEmailPreview || values.emailPreview}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="emailPreview"
            placeholder={"e.g. email@example.com"}
            iconStyle={"hidden"}
            className={`profile-input md:ml-auto md:max-w-[344px] lg:max-w-[432px] ${
              errors.emailPreview && touched.emailPreview
                ? "border-red focus:border-red !pr-[230px]"
                : "focus:border-blue box-shadow-input"
            }`}
            wrapperStyles={"flex-grow"}
          />

          {touched.emailPreview && errors.emailPreview ? (
            <div className="absolute  top-[16px] right-[20px] ">
              <p className="text-red text-[12px]">{errors.emailPreview}</p>
            </div>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        title={isLoading ? <BtnLoader /> : "Save"}
        disabled={isLoading}
        className={
          "block text-white sm:w-full hover:bg-active hover:shadow-active-shadow hover:text-white transition-all duration-350 md:py-[11px] md:px-[27px] md:w-[91px] md:ml-auto disabled:bg-blue disabled:opacity-[0.25]"
        }
      />
    </form>
  );
};

export default ProfileForm;
