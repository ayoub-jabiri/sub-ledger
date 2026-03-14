import jwt from "jsonwebtoken";

import Subscription from "../models/subscription.schema.js";
import { errorResponse } from "../utils/error.response.js";

export const getSubscriptions = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (error, user) => {
                if (error) return res.status(403).send();

                // Add a new subscription
                const sub = await Subscription.find({ userId: user._id });

                res.status(201).json(sub);
            }
        );

        const subs = await Subscription.find({});

        res.status(200).json(subs);
    } catch (e) {
        console.error(e.message);
    }
};

export const addSubscription = async (req, res) => {
    const { name, price, billingCycle } = req.body;

    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (error, user) => {
                if (error) return res.status(403).send();

                // Add a new subscription
                const sub = await Subscription.create({
                    name,
                    price,
                    billingCycle,
                    userId: user._id,
                });

                res.status(201).json(sub);
            }
        );
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};
