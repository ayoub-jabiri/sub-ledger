import axios, { type AxiosResponse, type AxiosError } from "axios";
import router from "../../routes/router";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: VITE_API_BASE_URL,
    timeout: 5000,
    withCredentials: true,
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        console.error("Response error:", error.response);

        if (error.response && error.response.status === 401) {
            router.navigate("/login");
        }
        return Promise.reject(error);
    }
);

export default api;
