import api from "../api/axios.instance";

export const userRegisterService = (userData: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}) => api.post("/users/register", userData);

export const userLoginService = (credentials: {
    email: string;
    password: string;
}) => api.post("/users/login", credentials);

export const userLogoutService = () => api.post("/users/logout");

export const getUserProfileService = () => api.get("/users/profile");
