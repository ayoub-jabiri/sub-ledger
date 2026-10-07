import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.schema.js";

const JWT_SECRET = process.env.JWT_SECRET;

const signAccessToken = (user) =>
    jwt.sign(user, JWT_SECRET, {
        expiresIn: "15d",
    });

export const registerUser = async ({ name, email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    const newUser = user.toObject();
    delete newUser.password;

    return {
        user: newUser,
        accessToken: signAccessToken({ id: user._id, role: user.role }),
    };
};

export const login = async (email) => {
    const user = await User.findOne({ email }).select("name email role");

    return {
        user,
        accessToken: signAccessToken({ id: user._id, role: user.role }),
    };
};
