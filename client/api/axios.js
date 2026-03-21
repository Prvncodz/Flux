import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "https://flux-backend-r0u6.onrender.com/api/v1",
});
