import axios from "axios";

const axios_create = axios.create({
  baseURL: "https://tan-weary-sparrow.cyclic.app",
  // baseURL:'http://localhost:5000'
});

export default axios_create;
