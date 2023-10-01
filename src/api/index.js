import axios from "axios";

const publicAxios = axios.create({
  baseURL: "http://localhost:4000",
});

const privateAxios = axios.create({
  baseURL: "http://localhost:4000",
});

privateAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { publicAxios, privateAxios };
