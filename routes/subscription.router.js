// External Modules
import { Router } from "express";

// Internal Modules
import {
    getSubscriptions,
    addSubscription,
} from "../controllers/subscription.controller.js";
import {
    subValidationRules,
    dataValidation,
} from "../middlewares/subscription.middleware.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getSubscriptions);
subscriptionRoutes.post(
    "/",
    subValidationRules,
    dataValidation,
    addSubscription
);

export default subscriptionRoutes;
