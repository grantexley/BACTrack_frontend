import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["authorization"] = token;
  } else {
    delete API.defaults.headers.common["authorization"];
  }
};

export default API;
