import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.schema.js";
import { errorResponse } from "../utils/error.response.js";

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: "The user has been registered successfully!",
            user,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const login = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.find({ email });

        const accessToken = jwt.sign(
            JSON.stringify(user[0]),
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({ accessToken });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const getProfile = (req, res) => {
    res.json(req.user);
};
