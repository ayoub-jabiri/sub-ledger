import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import Subscription from "../models/subscription.schema.js";
import { errorResponse } from "../utils/error.response.js";

export const subValidationRules = [
    body("name").notEmpty().withMessage("The name is required"),
    body("price")
        .notEmpty()
        .withMessage("The price is required")
        .isInt({ min: 0.1 })
        .withMessage("The price must greater than 0"),
    body("billingCycle")
        .isIn(["monthly", "yearly"])
        .withMessage(
            "The billing cycle is required and must be either 'monthly' or 'yearly'"
        ),
];

export const dataValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};

export const authenticationCheck = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return errorResponse(
            res,
            401,
            "Access denied due to not being authenticated"
        );
    }

    next();
};

export const authorizationCheck = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if (error) return errorResponse(res, 403, "Invalid token");

        req.user = user;
        next();
    });
};

export const subCheck = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        errorResponse(res, 400, "Invalid ID format");
    }

    try {
        const sub = await Subscription.find({ _id: id });

        if (!sub.length) {
            errorResponse(res, 404, "Subscription not found");
        }

        next();
    } catch (e) {
        console.error(e.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const adminCheck = (req, res, next) => {
    if (req.user.role != "admin")
        return errorResponse(
            res,
            403,
            "This route is available only to the admins"
        );

    next();
};
