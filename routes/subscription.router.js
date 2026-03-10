import { Router } from "express";
import { getSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getSubscriptions);

export default subscriptionRoutes;
