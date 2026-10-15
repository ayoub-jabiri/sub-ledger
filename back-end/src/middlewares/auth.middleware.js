import jwt from "jsonwebtoken";

import { errorResponse } from "../utils/error.response.js";
import { ACCESS_TOKEN_COOKIE } from "../utils/auth.cookie.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticationCheck = (req, res, next) => {
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE];

    if (!token) {
        return errorResponse(
            res,
            401,
            "Access denied due to not being authenticated"
        );
    }

    next();
};

export const authorizationCheck = (req, res, next) => {
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE];

    if (!token) {
        return errorResponse(
            res,
            401,
            "Access denied due to not being authenticated"
        );
    }

    jwt.verify(token, JWT_SECRET, (error, user) => {
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
            "You are not authorized to access this route"
        );

    next();
};
