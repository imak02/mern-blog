import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const token = localStorage.getItem("token");
console.log(token);
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
