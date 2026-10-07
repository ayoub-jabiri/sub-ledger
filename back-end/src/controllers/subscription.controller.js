import * as subscriptionService from "../services/subscription.service.js";
import * as adminService from "../services/admin.service.js";
import { errorResponse } from "../utils/error.response.js";

export const getSubscriptions = async (req, res) => {
    try {
        const sub = await subscriptionService.getUserSubscriptions(
            req.user._id
        );

        res.status(200).json(sub);
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const addSubscription = async (req, res) => {
    const { name, price, billingCycle } = req.body;

    try {
        const sub = await subscriptionService.createSubscription(req.user._id, {
            name,
            price,
            billingCycle,
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
        const sub = await subscriptionService.updateSubscription(id, {
            name,
            price,
            billingCycle,
        });

        res.json(sub);
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const deleteSubscription = async (req, res) => {
    const { id } = req.params;

    try {
        await subscriptionService.deleteSubscription(id);

        res.json({
            message: "The subscription has been deleted successfully",
        });
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const adminstrativeRoute = async (req, res) => {
    try {
        const overview = await adminService.getOverview();

        res.json(overview);
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};
