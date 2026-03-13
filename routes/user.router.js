// External Modules
import { Router } from "express";

// Internal Modules
import {
    getUsers,
    registerUser,
    login,
} from "../controllers/user.controller.js";
import {
    subValidationRules,
    dataValidation,
    registerCheck,
    loginCheck,
} from "../middlewares/user.middleware.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post(
    "/register",
    subValidationRules,
    dataValidation,
    registerCheck,
    registerUser
);
userRoutes.post("/login", loginCheck, login);

export default userRoutes;
