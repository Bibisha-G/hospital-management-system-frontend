import * as Yup from "yup";

const PatientProfileSchema = () => {
  const validationSchema = Yup.object({
    height: Yup.number()
      .min(100, "Height must be greater than or equal to 100 cm")
      .max(250, "Height must be less than or equal to 250 cm")
      .required("Height is required"),
    weight: Yup.number()
      .min(30, "Weight must be greater than or equal to 30 kg")
      .max(500, "Weight must be less than or equal to 500 kg")
      .required("Weight is required"),
    age: Yup.number()
      .min(1, "Age must be greater than or equal to 1")
      .max(100, "Age must be less than 100")
      .required("Age is required"),
    is_private: Yup.boolean(),
    info: Yup.string(),
  });

  return validationSchema;
};

export default PatientProfileSchema;
