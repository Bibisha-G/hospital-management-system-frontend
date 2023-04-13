import { toast } from "react-toastify";
import { thirdPartyApiSlice } from "../app/api/thirdPartyApiSlice";
import { store } from "../app/store";

const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dsl-web");
  const id = toast.loading("Uploading media...");

  try {
    const promise = store.dispatch(
      thirdPartyApiSlice.endpoints.cloudinaryUpload.initiate(formData)
    );
    const response = await promise.unwrap();
    promise.reset();
    toast.update(id, {
      render: "Media uploaded successfully",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return response;
  } catch (error) {
    toast.update(id, {
      render: "Error uploading media",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    return error;
  }
};

export default uploadMedia;
