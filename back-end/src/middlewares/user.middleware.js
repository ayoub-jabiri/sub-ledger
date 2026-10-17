// External Modules
import bcrypt from "bcrypt";
import { z } from "zod";

// Internal Modules
import User from "../models/user.schema.js";
import { errorResponse } from "../utils/error.response.js";

const registerSchema = z.object({
    name: z.string().min(1, "The name is required"),
    email: z.string().email("The email is required"),
    password: z.string().min(1, "The password is required"),
    role: z.enum(["user", "admin"], {
        message: "The role is required and must be either 'user' or 'admin'",
    }),
});

export const registerDataValidation = (req, res, next) => {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success)
        return res.status(400).json({ errors: validation.error.issues });

    req.body = validation.data;
    next();
};

const loginSchema = z.object({
    email: z.string().email("The email is required"),
    password: z.string().min(1, "The password is required"),
});

export const loginDataValidation = (req, res, next) => {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success)
        return res.status(400).json({ errors: validation.error.issues });

    req.body = validation.data;
    next();
};

export const registerCheck = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        // Check if the email is already taken
        if (user) return errorResponse(res, 400, "The email is already taken!");

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const loginCheck = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        // Check if the user is registred
        if (!user)
            return errorResponse(res, 401, "Incorrect email or password");

        // Check if the password is correct
        if (!(await bcrypt.compare(password, user.password)))
            return errorResponse(res, 401, "Incorrect email or password");

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};
