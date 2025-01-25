import axios from "axios";
import { getToken, showErrorNotification } from "../../utility/index";

export const privateRequest = axios.create({
  timeout: 20000,
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});


// Request handler: adds headers to the request
const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${getToken()}`;
  
  // Ensure Content-Type is set correctly for each request type
  if (request.headers['Content-Type'] !== 'multipart/form-data') {
    request.headers['Content-Type'] = 'application/json'; // Default
  }
  return request;
};

// Response handler
const responseHandler = (response) => {
  return response;
};

// Error handler with status code specific messages
const responseErrorHandler = (error) => {
  if (error.response) {
    const { status, data: { message } } = error.response;
    console.log('error', error);
    const errorMessage = message ?? "Some Error Occurred";

    switch (status) {
      case 401:
        showErrorNotification("Token Expired! Please Login again");
        setTimeout(() => {
          window.location = '/';
          localStorage.removeItem("authUser");
        }, 1000);
        break;
      case 400:
        showErrorNotification(errorMessage || "Invalid Input/ Bad Request");
        break;
      case 403:
        showErrorNotification(errorMessage || "Access Denied/ Forbidden");
        break;
      case 404:
        showErrorNotification(errorMessage || "Item doesn't exist");
        break;
      case 405:
        showErrorNotification(errorMessage || "Invalid Request");
        break;
      case 422:
        showErrorNotification(errorMessage || "Already Exists");
        break;
      case 504:
        showErrorNotification(errorMessage || "Network Error");
        break;
      default:
        showErrorNotification(errorMessage);
        break;
    }
  } else {
    showErrorNotification("Some Error Occurred");
  }
  return Promise.reject(error);
};

// Interceptors to handle request and response globally
privateRequest.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => Promise.reject(error)
);

privateRequest.interceptors.response.use(
  (response) => responseHandler(response),
  responseErrorHandler
);
