import bcrypt from "bcrypt";

import User from "../models/user.schema.js";
import { errorResponse } from "../utils/error.response.js";

export const getUsers = async (req, res) => {
    res.send("Hello World!??");
};

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
            message: "The user register successfully!",
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};
