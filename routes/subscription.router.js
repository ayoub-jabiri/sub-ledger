// External Modules
import { Router } from "express";

// Internal Modules
import {
    getSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    adminstrativeRoute,
} from "../controllers/subscription.controller.js";
import {
    subValidationRules,
    dataValidation,
    authenticationCheck,
    authorizationCheck,
    subCheck,
    adminCheck,
} from "../middlewares/subscription.middleware.js";

const subscriptionRoutes = Router();

subscriptionRoutes.use(authenticationCheck);
subscriptionRoutes.use(authorizationCheck);

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
subscriptionRoutes.get("/admin", adminCheck, adminstrativeRoute);

export default subscriptionRoutes;
