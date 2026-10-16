// 1. Modules:
// External Modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

// Internal Modules
import dns from "node:dns";
import userRoutes from "./routes/user.router.js";
import subscriptionRoutes from "./routes/subscription.router.js";

// 2. Main Settings:

if (process.env?.ENV !== "production") {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const app = express();

app.use(cors());

app.use(helmet());

if (process.env?.ENV === "production") {
    app.set("trust proxy", 1);

    app.use(async (req, res, next) => {
        try {
            await connectDb();
            next();
        } catch (error) {
            serverErrorResponse(res, error);
        }
    });
}

if (process.env?.ENV !== "testing") {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)

        handler: (req, res) => {
            res.status(429).json({
                message:
                    "You have exceeded the rate limit. Please try again later.",
            });
        },
    });

    app.use(limiter);
}

// 4. Server Set up

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);

export default app;
