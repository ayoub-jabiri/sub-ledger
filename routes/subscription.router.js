import { Router } from "express";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", (req, res) => {
    res.send("Hello World");
});

export default subscriptionRoutes;
