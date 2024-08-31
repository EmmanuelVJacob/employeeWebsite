import axios from "axios";

const isBrowser = typeof window !== "undefined";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    authorization: isBrowser ? `Bearer ${localStorage?.getItem("accessToken")}` : "",
  },
});

export default axiosInstance;
