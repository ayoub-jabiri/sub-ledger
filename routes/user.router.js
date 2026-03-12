// External Modules
import { Router } from "express";

// Internal Modules
import { getUsers } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);

export default userRoutes;
