import axios from "axios";
const baseUrl = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BEURL,
});
baseUrl.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

export default baseUrl