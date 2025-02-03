import { useMatches } from "react-router-dom";
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


export const combineClasses = (...classes) => {
  return classes.join(" ");
};

export const persistToken = (token) => {
  localStorage.setItem("token", token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};


export const setUserData = (userData) => {
  return localStorage.setItem("userData", JSON.stringify(userData));
}


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

export const useRouteMetadata = () => {
  const matches = useMatches();  // Get all matched routes
  // Loop through the matches and find the relevant metadata (like permissionName)
  const route = matches[matches.length - 1];  // Get the last matched route
  return route?.handle?.pageName;  // Assuming permissionName is stored in handle
}
