import * as Yup from "yup";

const DoctorProfileSchema = () => {
  const validationSchema = Yup.object({
    specialization: Yup.string()
      .min(2, "Specialization must be more than 2 characters")
      .max(75, "Specialization must be less than 75 characters")
      .required("Specialization is required"),
    age: Yup.number()
      .min(1, "Age must be greater than or equal to 1")
      .max(100, "Age must be less than 100")
      .required("Age is required"),
    is_private: Yup.boolean(),
    info: Yup.string(),
    department: Yup.number().required("Please select a department"),
  });

  return validationSchema;
};

export default DoctorProfileSchema;
