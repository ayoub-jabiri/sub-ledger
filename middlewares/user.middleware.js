import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

import User from "../models/user.schema.js";
import { errorResponse } from "../utils/error.response.js";

export const subValidationRules = [
    body("name").notEmpty().withMessage("The name is required"),
    body("email").isEmail().withMessage("The email must be a valide email"),
    body("password").notEmpty().withMessage("The password is required"),
    body("role")
        .isIn(["user", "admin"])
        .withMessage(
            "The role is required and must be either 'user' or 'admin'"
        ),
];

export const dataValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};

export const registerCheck = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.find({ email });

        // Check if the email is already taken
        if (user.length > 0)
            return errorResponse(res, 400, "The email is already taken!");

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const loginCheck = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.find({ email });

        // Check if the user is registred
        if (user.length == 0)
            return errorResponse(res, 404, "The user is not registred yet!");

        // Check if the password is correct
        if (!(await bcrypt.compare(password, user[0].password)))
            return errorResponse(res, 401, "The password is not correct!");

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};
