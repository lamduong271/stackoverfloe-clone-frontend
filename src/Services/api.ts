import axios from "axios";

const instance = axios.create({
  baseURL: "https://clone-stackoverflow-api-final.herokuapp.com/",
});

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.data.error.code === "Invalid SL Token") {
      localStorage.removeItem("slToken");
    }

    return Promise.reject(error);
  }
);

export { instance };
