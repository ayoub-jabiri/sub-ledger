import User from "../models/user.schema.js";
import Subscription from "../models/subscription.schema.js";

export const getOverview = async () => {
    const users = await User.find({});
    const subscriptions = await Subscription.find({});

    return { users, subscriptions };
};
