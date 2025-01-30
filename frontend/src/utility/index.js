import { toast } from "react-toastify";

export const configToast = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

export const showSuccessNotification = (message, configToast) => {
  return toast.success(message, configToast);
};

export const showErrorNotification = (message, configToast) => {
  return toast.error(message, configToast);
};

export const showDeleteNotification = (message, configToast) => {
  return toast.success(message, configToast);
};

export const getChangedValues = (values, initialValues) => {
  return Object
    .entries(values)
    .reduce((acc, [key, value]) => {
      const hasChanged = initialValues[key] !== value

      if (hasChanged) {
        acc[key] = value
      }

      return acc
    }, {})
}

export const combineClasses = (...classes) => {
  return classes.join(" ");
};

export const persistToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("to ken");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserData = () => {
  return localStorage.getItem("userData");
};


export const setUserData = (userData) => {
  return localStorage.setItem("userData", JSON.stringify(userData));
}