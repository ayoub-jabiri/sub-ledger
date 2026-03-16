// External Modules
import jwt from "jsonwebtoken";

// Internal Modules
import { errorResponse } from "../utils/error.response.js";

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

export const adminCheck = (req, res, next) => {
    if (req.user.role != "admin")
        return errorResponse(
            res,
            403,
            "This route is available only to the admins"
        );

    next();
};
