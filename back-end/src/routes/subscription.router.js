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
    dataValidation,
    subCheck,
} from "../middlewares/subscription.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
    adminCheck,
} from "../middlewares/auth.middleware.js";
import { requestBodyCheck } from "../middlewares/global.middleware.js";

const subscriptionRoutes = Router();

subscriptionRoutes.use(authenticationCheck);
subscriptionRoutes.use(authorizationCheck);

subscriptionRoutes.get("/", getSubscriptions);
subscriptionRoutes.post("/", requestBodyCheck, dataValidation, addSubscription);
subscriptionRoutes.put(
    "/:id",
    subCheck,
    requestBodyCheck,
    dataValidation,
    updateSubscription
);
subscriptionRoutes.delete("/:id", subCheck, deleteSubscription);
subscriptionRoutes.get("/admin", adminCheck, adminstrativeRoute);

export default subscriptionRoutes;
