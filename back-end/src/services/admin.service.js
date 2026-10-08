import Subscription from "../models/subscription.schema.js";

export const getOverview = async () => {
    const subscriptions = await Subscription.find({})
        .sort({ createdAt: -1 })
        .populate("userId", "name email");

    return { subscriptions };
};
