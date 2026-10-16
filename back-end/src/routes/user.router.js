// External Modules
import { Router } from "express";

// Internal Modules
import {
    registerUser,
    login,
    logout,
    getProfile,
} from "../controllers/user.controller.js";
import {
    dataValidation,
    registerCheck,
    loginCheck,
} from "../middlewares/user.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", dataValidation, registerCheck, registerUser);
userRoutes.post("/login", loginCheck, login);
userRoutes.post("/logout", logout);
userRoutes.get("/profile", authenticationCheck, authorizationCheck, getProfile);

export default userRoutes;
