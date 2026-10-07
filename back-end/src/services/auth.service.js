import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.schema.js";

const JWT_SECRET = process.env.JWT_SECRET;

const signAccessToken = (user) =>
    jwt.sign(JSON.stringify(user), JWT_SECRET, {
        expiresIn: "7d",
    });

export const registerUser = async ({ name, email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    return { user, accessToken: signAccessToken(user) };
};

export const login = async (email) => {
    const user = await User.findOne({ email }).select("name email role");

    return { accessToken: signAccessToken(user) };
};
