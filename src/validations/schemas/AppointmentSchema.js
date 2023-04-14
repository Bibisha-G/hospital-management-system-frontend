import * as Yup from "yup";

const AppoitmentSchema = () => {
  const schema = Yup.object().shape({
    department: Yup.number()
      .required("Select a department"),
    doctor: Yup.number()
      .required("Select a doctor"),
    date: Yup.string().required("Date is required")
  });

  return schema;
};

export default AppoitmentSchema;
