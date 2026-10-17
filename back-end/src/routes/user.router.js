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
    registerDataValidation,
    registerCheck,
    loginDataValidation,
    loginCheck,
} from "../middlewares/user.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";
import { requestBodyCheck } from "../middlewares/global.middleware.js";

const userRoutes = Router();

userRoutes.post(
    "/register",
    requestBodyCheck,
    registerDataValidation,
    registerCheck,
    registerUser
);
userRoutes.post(
    "/login",
    requestBodyCheck,
    loginDataValidation,
    loginCheck,
    login
);
userRoutes.post("/logout", logout);
userRoutes.get("/profile", authenticationCheck, authorizationCheck, getProfile);

export default userRoutes;
