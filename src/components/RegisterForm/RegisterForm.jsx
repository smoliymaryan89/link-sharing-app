import { useFormik } from "formik";
import { nanoid } from "nanoid";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as validationSchema from "../../utils/validationSchemas";

import Input from "../Input/Input";
import Button from "../Button/Button";
import { register } from "../../redux/auth/authOperations";
import useAuth from "../../hooks/useAuth";

const email = nanoid();
const password = nanoid();
const confirmPassword = nanoid();

const RegisterForm = () => {
  const dispatch = useDispatch();

  const { error } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema.registerValidationSchema,
    onSubmit: ({ email, password, confirmPassword }) => {
      if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
        return;
      }

      dispatch(register({ email, password }));

      if (error === null) {
        navigate("/login");
      }

      formik.resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
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
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={"e.g. alex@email.com"}
          icon={"email"}
          iconStyle={"fill-grey w-[16px] h-[16px]"}
          className={` ${
            formik.errors.email ? "pr-[160px]" : "pr-[44px]"
          } focus:border-blue box-shadow-input`}
        />

        {formik.touched.email && formik.errors.email ? (
          <div className="absolute top-[15px] right-[16px] ">
            <p className="text-red text-[12px]"> {formik.errors.email}</p>
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
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={"At least .8 characters"}
          icon={"password"}
          iconStyle={"fill-grey w-[16px] h-[16px]"}
          className={` ${
            formik.errors.password ? "pr-[160px]" : "pr-[44px]"
          } focus:border-blue box-shadow-input`}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="absolute top-[15px] right-[16px] ">
            <p className="text-red text-[12px]"> {formik.errors.password}</p>
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
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          placeholder={"At least .8 characters"}
          icon={"password"}
          iconStyle={"fill-grey w-[16px] h-[16px]"}
          className={` ${
            formik.errors.confirmPassword ? "pr-[160px]" : "pr-[44px]"
          } focus:border-blue box-shadow-input`}
        />

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="absolute top-[15px] right-[16px] ">
            <p className="text-red text-[12px]">
              {formik.errors.confirmPassword}
            </p>
          </div>
        ) : null}
      </div>

      <Button
        title={"Create new account"}
        type="submit"
        className={
          "text-white hover:bg-blue hover:opacity-50 hover:text-white transition-all duration-350"
        }
      />
    </form>
  );
};

export default RegisterForm;
