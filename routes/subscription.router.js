// External Modules
import { Router } from "express";

// Internal Modules
import {
    getSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
} from "../controllers/subscription.controller.js";
import {
    subValidationRules,
    dataValidation,
    authenticationCheck,
    subCheck,
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
subscriptionRoutes.put(
    "/:id",
    subCheck,
    subValidationRules,
    dataValidation,
    updateSubscription
);
subscriptionRoutes.delete("/:id", subCheck, deleteSubscription);

export default subscriptionRoutes;
