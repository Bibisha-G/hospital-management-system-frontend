import * as Yup from "yup";

const RegisterSchema = () => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be at least 30 characters")
      .matches(/^[a-za-z0-9._-]{1,20}$/, "Please enter valid name"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return schema;
};

export default RegisterSchema;
