// External Modules
import { Router } from "express";

// Internal Modules
import {
    getUsers,
    registerUser,
    login,
    getProfile,
} from "../controllers/user.controller.js";
import {
    userValidationRules,
    dataValidation,
    registerCheck,
    loginCheck,
} from "../middlewares/user.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post(
    "/register",
    userValidationRules,
    dataValidation,
    registerCheck,
    registerUser
);
userRoutes.post("/login", loginCheck, login);
userRoutes.get("/profile", authenticationCheck, authorizationCheck, getProfile);

export default userRoutes;
