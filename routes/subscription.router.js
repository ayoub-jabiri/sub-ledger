// External Modules
import { Router } from "express";

// Internal Modules
import {
    getSubscriptions,
    addSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getSubscriptions);
subscriptionRoutes.post("/", addSubscription);

export default subscriptionRoutes;
