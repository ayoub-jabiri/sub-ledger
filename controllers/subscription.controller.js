import Subscription from "../models/subscription.schema.js";
import { errorResponse } from "../utils/error.response.js";

export const getSubscriptions = async (req, res) => {
    try {
        const sub = await Subscription.find({ userId: req.user._id });

        res.status(200).json(sub);
        res.status(200).json();
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const addSubscription = async (req, res) => {
    const { name, price, billingCycle } = req.body;

    try {
        // Add a new subscription
        const sub = await Subscription.create({
            name,
            price,
            billingCycle,
            userId: req.user._id,
        });

        res.status(201).json(sub);
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const updateSubscription = async (req, res) => {
    const { id } = req.params;
    const { name, price, billingCycle } = req.body;

    try {
        const sub = await Subscription.findById(id);

        sub.name = name;
        sub.price = price;
        sub.billingCycle = billingCycle;

        await sub.save();

        res.json(sub);
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const deleteSubscription = async (req, res) => {
    const { id } = req.params;

    try {
        await Subscription.findByIdAndDelete(id);

        res.json({
            message: "The subscription has been deleted successfully",
        });
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};
