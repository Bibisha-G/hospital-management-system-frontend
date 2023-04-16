import * as Yup from "yup";

const LoginSchema = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return schema;
};

export default LoginSchema;
