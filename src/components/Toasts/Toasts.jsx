import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toaster = (value) => toast(value);

export const SuccessToast = (value) => toast.success(value);

export const ErrorToast = (value) => toast.error(value);

export const InfoToast = (value) => toast.info(value);

export const WarningToast = (value) => toast.warn(value);

export const PromiseToast = (promise, value) => toast.promise(promise, value);

export default toaster;
