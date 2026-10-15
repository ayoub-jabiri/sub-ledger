// 1. Modules:
// External Modules
import express from "express";
import cookieParser from "cookie-parser";

// Internal Modules
import userRoutes from "./routes/user.router.js";
import subscriptionRoutes from "./routes/subscription.router.js";

// 2. Main Settings:

import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// 4. Server Set up

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);

export default app;
