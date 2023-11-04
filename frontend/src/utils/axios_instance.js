import axios from "axios";

const axios_create = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL:'http://localhost:5000'
});

export default axios_create;
