import * as Yup from "Yup";

export const registerValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Can't be empty"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Can't be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Can't be empty"),
});
