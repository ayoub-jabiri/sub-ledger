// External Modules
import { Router } from "express";

// Internal Modules
import { getUsers, registerUser } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/register", registerUser);

export default userRoutes;
