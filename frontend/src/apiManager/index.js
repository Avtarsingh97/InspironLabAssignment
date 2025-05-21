import axios from "axios";
import toast from "react-hot-toast";

import { USER_STORE_PERSIST } from "../const";
import { BASE_URL } from "../const";
import { getToken, removeToken } from "../helper";

// Declare AxiosInstances variable
let AxiosInstances;

// Immediately Invoked Function Expression (IIFE) to initialize Axios instance
(() => {
  // Create a custom Axios instance with a base URL
  AxiosInstances = axios.create({
    baseURL: BASE_URL,
  });

   // Request Interceptor - Adds Authorization header before each request is sent
  AxiosInstances.interceptors.request.use((config) => {
    const token = getToken();

     // If token exists, attach it to Authorization header
    token && (config.headers.Authorization = `Bearer ${token}`);

    return config;
  });

  // Response Interceptor - Handles global response errors
  AxiosInstances.interceptors.response.use(

    // If response is successful, just return it
    (response) => response,
    (error) => {

      // If API sends success: "false", show error toast
      if (error.response?.data.success === "false") {
        const message = error.response.data.message;

        // Show the error message if available, else show generic error
        message ? toast.error(message) : toast.error("Something Went Wrong");

        // Handle unauthorized access (401)
        if (error.response.status === 401) {
          removeToken();
          sessionStorage.removeItem(USER_STORE_PERSIST);
          window.location.href = "/signin";
        }
      } else {
        // Fallback generic error message
        toast.error("Something went wrong");
      }
      // Re-throw the error to handle it further if needed
      throw error;
    }
  );
})();

export default AxiosInstances;
