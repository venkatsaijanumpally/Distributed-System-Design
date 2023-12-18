import axios from "axios";
const api = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: api,
});

export default axiosInstance;
