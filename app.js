// 1. Modules:
// External Modules
import express from "express";
import dotenv from "dotenv";

// Internal Modules
import userRoutes from "./routes/user.router.js";
import subscriptionRoutes from "./routes/subscription.router.js";

// 2. Main Settings:

import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

dotenv.config();

// 4. Server Set up

app.use(express.json());

app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);

app.get("/test", (req, res) => {
    res.send("test");
});

export default app;
