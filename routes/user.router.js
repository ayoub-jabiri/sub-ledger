// External Modules
import { Router } from "express";

// Internal Modules
import {
    getUsers,
    registerUser,
    login,
} from "../controllers/user.controller.js";
import { loginCheck } from "../middlewares/user.middleware.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginCheck, login);

export default userRoutes;
