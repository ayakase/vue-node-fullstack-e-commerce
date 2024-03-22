import axios from "axios";
const baseUrl = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BEURL,
   
});
export default baseUrl