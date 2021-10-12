import axios from "axios";

const api = axios.create({
  baseURL: "https://oncar-api.herokuapp.com",
});

export default api;
