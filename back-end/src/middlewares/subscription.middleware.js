// External Modules
import mongoose from "mongoose";
import { z } from "zod";

// Internal Modules
import Subscription from "../models/subscription.schema.js";
import { errorResponse } from "../utils/error.response.js";

const subscriptionSchema = z.object({
    name: z.string().min(1, "The name is required"),
    price: z.coerce.number().min(0.01, "The price must be greater than 0"),
    billingCycle: z.enum(["monthly", "yearly"], {
        message:
            "The billing cycle is required and must be either 'monthly' or 'yearly'",
    }),
});

export const dataValidation = (req, res, next) => {
    const { name, price, billingCycle } = req.body;

    const validation = subscriptionSchema.safeParse({
        name,
        price,
        billingCycle,
    });

    if (!validation.success)
        return res
            .status(400)
            .json({
                message: "Validation failed",
                errors: validation.error.issues,
            });

    req.body = validation.data;
    next();
};

export const subCheck = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(res, 400, "Invalid ID format");
    }

    try {
        const sub = await Subscription.findOne({
            _id: id,
            userId: req.user.id,
        });

        if (!sub) {
            return errorResponse(res, 404, "Subscription not found");
        }

        next();
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};
