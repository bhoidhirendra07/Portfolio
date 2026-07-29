import axios from "axios";

const API = axios.create({
  baseURL: "https://portfolio-5ivb.vercel.app",
});

export default API;