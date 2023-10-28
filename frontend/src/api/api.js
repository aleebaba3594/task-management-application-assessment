// api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // backend code is deployed
  timeout: 5000, // Set a timeout for requests (milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// You can also add request interceptors, error handling, and other configurations here.

export default api;
