export const roles = { patient: "PATIENT", doctor: "DOCTOR", admin: "ADMIN" };

export const BASE_URL = "http://127.0.0.1:8000/";
export const auth = {
  currentUser: "user",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const themes = {
  LIGHT: "light",
  DARK: "dark",
};

export const languages = {
  URDU: "ur",
  ENGLISH: "en",
};

export const uploadStates = {
  intialUploadState: { status: "UINTIALIZED", message: "" },
  successUploadState: {
    status: "SUCCESS",
    message: "Successfully uploaded",
  },
  errorUploadState: {
    status: "ERROR",
    message: "Upload failed",
  },
};
