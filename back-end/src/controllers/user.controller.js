import * as authService from "../services/auth.service.js";
import { errorResponse } from "../utils/error.response.js";

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const { user, accessToken } = await authService.registerUser({
            name,
            email,
            password,
            role,
        });

        res.status(201).json({
            message: "The user has been registered successfully!",
            user,
            accessToken,
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

        res.json(data);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error");
    }
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
