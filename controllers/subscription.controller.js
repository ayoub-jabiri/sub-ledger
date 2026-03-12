import User from "../models/user.schema.js";
import Subscription from "../models/subscription.schema.js";

export const getSubscriptions = async (req, res) => {
    try {
        const subs = await Subscription.find({});

        res.status(201).json(subs);
    } catch (e) {
        console.error(e.message);
    }
};

export const addSubscription = async (req, res) => {
    const { name, price, billingCycle, userId } = req.body;

    try {
        // Get the user id
        const user = await User.find({ _id: userId });

        // Add a new subscription
        const sub = await Subscription.create({
            name: name,
            price: price,
            billingCycle: billingCycle,
            userId: user._id,
        });

        res.status(201).json(sub);
    } catch (e) {
        console.error(e.message);
    }
};
