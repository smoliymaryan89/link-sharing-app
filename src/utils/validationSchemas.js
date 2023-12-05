import * as Yup from "yup";

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Can't be empty"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Can't be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Can't be empty"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Can't be empty"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Can't be empty"),
});

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().matches(
    /^[A-Za-z]+$/,
    "First name should only contain letters"
  ),

  lastName: Yup.string().matches(
    /^[A-Za-z]+$/,
    "Last name should only contain letters"
  ),
  emailPreview: Yup.string().matches(emailRegex, "Invalid email address"),
});
