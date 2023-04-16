import * as Yup from "yup";

const DoctorProfileSchema = () => {
  const validationSchema = Yup.object({
    specialization: Yup.string()
      .min(2, "Field must be more than 2 characters")
      .max(75, "Field must be less than 75 characters")
      .required("Field is required"),
    qualifications: Yup.string()
      .min(2, "Field must be more than 2 characters")
      .max(75, "Field must be less than 75 characters")
      .required("Field is required"),
    treatments: Yup.string()
      .min(2, "Field must be more than 2 characters")
      .max(120, "Field must be less than 120 characters")
      .required("Field are required"),
    age: Yup.number()
      .min(20, "Age must be greater than or equal to 20")
      .max(100, "Age must be less than 100")
      .required("Age is required"),
    experience: Yup.number()
      .required("Experience is required")
      .test(
        "experience-lesser-than-age",
        "Experience must be less than Age",
        function (value) {
          const { age } = this.parent; // get the value of the `age` field
          return !value || !age || value < age; // return true if `experience` is less than `age`
        }
      ),
    is_private: Yup.boolean(),
    info: Yup.string(),
    department: Yup.number().required("Please select a department"),
  });

  return validationSchema;
};

export default DoctorProfileSchema;
