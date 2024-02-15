import axios from "axios";//ppppp

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

export default api;
