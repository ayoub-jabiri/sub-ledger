import * as authService from "../services/auth.service.js";
import { errorResponse } from "../utils/error.response.js";
import {
    ACCESS_TOKEN_COOKIE,
    accessTokenCookieOptions,
} from "../utils/auth.cookie.js";

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const { user, accessToken } = await authService.registerUser({
            name,
            email,
            password,
            role,
        });

        res.cookie(
            ACCESS_TOKEN_COOKIE,
            accessToken,
            accessTokenCookieOptions
        );

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
        const data = await authService.login(email);

        res.cookie(
            ACCESS_TOKEN_COOKIE,
            data.accessToken,
            accessTokenCookieOptions
        );

        res.json({ user: data.user });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};

export const logout = (req, res) => {
    res.clearCookie(ACCESS_TOKEN_COOKIE, {
        httpOnly: accessTokenCookieOptions.httpOnly,
        secure: accessTokenCookieOptions.secure,
        sameSite: accessTokenCookieOptions.sameSite,
        path: accessTokenCookieOptions.path,
    });

    res.json({ message: "The user has been logged out successfully!" });
};

export const getProfile = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);

        res.json(user);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
};
