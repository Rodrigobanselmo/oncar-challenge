import axios from "axios";

//  baseURL: "http://localhost:3333",

const api = axios.create({
  baseURL: "https://oncar-api.herokuapp.com",
});

export default api;
