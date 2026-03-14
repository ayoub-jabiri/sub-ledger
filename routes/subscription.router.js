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
    authenticationCheck,
} from "../middlewares/subscription.middleware.js";

const subscriptionRoutes = Router();

subscriptionRoutes.use(authenticationCheck);

subscriptionRoutes.get("/", getSubscriptions);
subscriptionRoutes.post(
    "/",
    subValidationRules,
    dataValidation,
    addSubscription
);

export default subscriptionRoutes;
