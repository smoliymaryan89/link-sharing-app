import { nanoid } from "nanoid";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";

import { registerValidationSchema } from "../../utils/validationSchemas";
import useAuth from "../../hooks/useAuth";

import Input from "../Input/Input";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import CustomToast from "../CustomToast/CustomToast";
import BtnLoader from "../Loader/BtnLoader";

const email = nanoid();
const password = nanoid();
const confirmPassword = nanoid();

const RegisterForm = () => {
  const dispatch = useDispatch();

  const { error, isLoading } = useAuth();

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async ({ email, password, confirmPassword }) => {
      if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
        return;
      }

      try {
        await dispatch(register({ email, password })).unwrap();

        toast.custom((t) => (
          <CustomToast
            t={t}
            text={"Registration is successful!"}
            icon={"check"}
          />
        ));

        resetForm();
      } catch (e) {
        toast.custom((t) => (
          <CustomToast t={t} text={"Registration failed!"} icon={"warning"} />
        ));
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mb-[24px]"
      noValidate
    >
      <label htmlFor={email} className="mb-[4px] text-dark-grey text-[12px] ">
        Email address
      </label>
      <div className="relative mb-[24px]">
        <Input
          id={email}
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder={"e.g. alex@email.com"}
          icon={"email"}
          iconStyle={"fill-grey w-[16px] h-[16px]"}
          className={
            errors.email && touched.email
              ? "border-red focus:border-red"
              : "focus:border-blue box-shadow-input"
          }
        />

        {(touched.email && errors.email) || error?.status === 409 ? (
          <div className="absolute  bottom-[54px] right-[16px] ">
            <p className="text-red text-[12px]">
              {error?.status === 409 ? "Email in use" : errors.email}
            </p>
          </div>
        ) : null}
      </div>

      <label htmlFor={password} className="mb-[4px] text-dark-grey text-[12px]">
        Create password
      </label>
      <div className="relative mb-[24px]">
        <Input
          id={password}
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          placeholder={"At least .8 characters"}
          icon={"password"}
          iconStyle={"fill-grey w-[16px] h-[16px]"}
          className={
            errors.password && touched.password
              ? "border-red focus:border-red"
              : "focus:border-blue box-shadow-input"
          }
        />
        {touched.password && errors.password ? (
          <div className="absolute bottom-[54px] right-[16px]">
            <p className="text-red text-[12px]"> {errors.password}</p>
          </div>
        ) : null}
      </div>

      <label
        htmlFor={confirmPassword}
        className="mb-[4px] text-dark-grey text-[12px]"
      >
        Confirm password
      </label>

      <div className="relative mb-[24px]">
        <Input
          id={confirmPassword}
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={values.confirmPassword}
          onBlur={handleBlur}
          placeholder={"At least .8 characters"}
          icon={"password"}
          iconStyle={"fill-grey w-[16px] h-[16px]"}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "border-red focus:border-red"
              : "focus:border-blue box-shadow-input"
          }
        />

        {touched.confirmPassword && errors.confirmPassword ? (
          <div className="absolute bottom-[54px] right-[16px] ">
            <p className="text-red text-[12px]">{errors.confirmPassword}</p>
          </div>
        ) : null}
      </div>

      <Button
        title={isLoading ? <BtnLoader /> : "Create new account"}
        disabled={isLoading}
        type="submit"
        className={
          "text-white hover:bg-active hover:shadow-active-shadow hover:text-white transition-all duration-350 disabled:bg-blue disabled:opacity-[0.25]"
        }
      />
    </form>
  );
};

export default RegisterForm;
