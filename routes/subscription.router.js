// External Modules
import { Router } from "express";

// Internal Modules
import { getSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getSubscriptions);

export default subscriptionRoutes;
