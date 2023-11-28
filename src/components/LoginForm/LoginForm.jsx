import { useFormik } from "formik";
import { nanoid } from "nanoid";

import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";

import { loginValidationSchema } from "../../utils/validationSchemas";
import useAuth from "../../hooks/useAuth";

import Input from "../Input/Input";
import Button from "../Button/Button";

const email = nanoid();
const password = nanoid();

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error } = useAuth();

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
    },
    validationSchema: loginValidationSchema,
    onSubmit: async ({ email, password }) => {
      if (!email.trim() || !password.trim()) {
        return;
      }

      try {
        await dispatch(login({ email, password })).unwrap();
        resetForm();
      } catch (error) {
        console.log(error);
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
          className={`${
            errors.email && touched.email
              ? "border-red focus:border-red"
              : "focus:border-blue"
          } focus:border-blue box-shadow-input`}
        />

        {(touched.email && errors.email) || error?.status === 401 ? (
          <div className="absolute bottom-[54px] right-[16px]  ">
            <p className="text-red text-[12px]">
              {error?.status === 401 ? error.message : errors.email}
            </p>
          </div>
        ) : null}
      </div>

      <label htmlFor={password} className="mb-[4px] text-dark-grey text-[12px]">
        Password
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
          className={`${
            errors.password && touched.password
              ? "border-red focus:border-red"
              : "focus:border-blue"
          } focus:border-blue box-shadow-input`}
        />
        {touched.password && errors.password ? (
          <div className="absolute bottom-[54px] right-[16px]  ">
            <p className="text-red text-[12px]"> {errors.password}</p>
          </div>
        ) : null}
      </div>

      <Button
        title={"Login"}
        type="submit"
        className={
          "text-white hover:bg-blue hover:opacity-50 hover:text-white transition-all duration-350"
        }
      />
    </form>
  );
};

export default LoginForm;
