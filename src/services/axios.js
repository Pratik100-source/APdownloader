import axios from "axios";

const APP_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const api = axios.create({
  baseURL: APP_API_URL,
});

export default api;
