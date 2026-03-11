// 1. Modules:
// External Modules
import express from "express";
import dotenv from "dotenv";

// Internal Modules
import { connectDb } from "./config/db.js";
import subscriptionRoutes from "./routes/subscription.router.js";

// 2. Main Settings:

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const app = express();

// 3. Database Connection:

connectDb(DB_URL);

// 4. Server Set up

app.use(express.json());

app.use("/subscriptions", subscriptionRoutes);

app.listen(PORT, () => {
    console.log("The server is listening on port ", PORT);
});
