import * as Yup from "yup";
import i18next from "i18next";

const AddHouseSchema = () => {
  const { t } = i18next;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    tagline: Yup.string().required().min(6),
  });

  return schema;
};

export default AddHouseSchema;
