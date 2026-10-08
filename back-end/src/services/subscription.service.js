import Subscription from "../models/subscription.schema.js";

export const getUserSubscriptions = (userId) => Subscription.find({ userId });

export const createSubscription = ({ name, price, billingCycle, userId }) =>
    Subscription.create({ name, price, billingCycle, userId });

export const updateSubscription = async (id, { name, price, billingCycle }) => {
    const sub = await Subscription.findById(id);

    sub.name = name;
    sub.price = price;
    sub.billingCycle = billingCycle;

    await sub.save();

    return sub;
};

export const deleteSubscription = async (id) => {
    await Subscription.findByIdAndDelete(id);
};
