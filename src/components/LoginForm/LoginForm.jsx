import { useFormik } from "formik";
import { nanoid } from "nanoid";

import * as validationSchema from "../../utils/validationSchemas";

import Input from "../Input/Input";
import Button from "../Button/Button";

const email = nanoid();
const password = nanoid();

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema.loginValidationSchema,
    onSubmit: ({ email, password }) => {
      if (!email.trim() || !password.trim()) {
        return;
      }
      console.log({ email, password });
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col" noValidate>
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

export default LoginForm;
