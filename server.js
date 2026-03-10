import express from "express";
import subscriptionRoutes from "./routes/subscription.router.js";

const app = express();

app.use(express.json());

app.use("/subscriptions", subscriptionRoutes);

app.listen(3000, () => {
    console.log("The server is listening on port 3000");
});
