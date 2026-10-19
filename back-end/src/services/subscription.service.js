import Subscription from "../models/subscription.schema.js";

export const getUserSubscriptions = (userId) => Subscription.find({ userId });

export const createSubscription = ({ name, price, billingCycle, userId }) =>
    Subscription.create({ name, price, billingCycle, userId });

export const updateSubscription = async (
    id,
    userId,
    { name, price, billingCycle }
) => {
    const sub = await Subscription.findOne({ _id: id, userId });

    sub.name = name;
    sub.price = price;
    sub.billingCycle = billingCycle;

    await sub.save();

    return sub;
};

export const deleteSubscription = async (id, userId) => {
    await Subscription.findOneAndDelete({ _id: id, userId });
};
