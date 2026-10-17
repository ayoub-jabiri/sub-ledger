import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    userRegisterService,
    userLoginService,
    userLogoutService,
    getUserProfileService,
} from "../services/auth.services";
import type { Credentials } from "../../types/auth.types";

export const userRegister = createAsyncThunk(
    "user/register",
    async (
        userData: {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await userRegisterService(userData);
            return response;
        } catch (error: unknown) {
            const currentError = {
                message: error.response?.data?.message || "An error occurred",
                statusCode: error.response?.status,
            };

            if (error.response?.data?.errors) {
                currentError.errors = error.response?.data?.errors;
            }

            return rejectWithValue({
                ...currentError,
            });
        }
    }
);

export const userLogin = createAsyncThunk(
    "user/login",
    async (credentials: Credentials, { rejectWithValue }) => {
        try {
            const response = await userLoginService(credentials);

            return response;
        } catch (error: unknown) {
            const currentError = {
                message: error.response?.data?.message || "An error occurred",
                statusCode: error.response?.status,
            };

            if (error.response?.data?.errors) {
                currentError.errors = error.response?.data?.errors;
            }

            return rejectWithValue({
                ...currentError,
            });
        }
    }
);

export const userLogout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await userLogoutService();
            return response;
        } catch (error: unknown) {
            const currentError = {
                message: error.response?.data?.message || "An error occurred",
                statusCode: error.response?.status,
            };

            if (error.response?.data?.errors) {
                currentError.errors = error.response?.data?.errors;
            }

            return rejectWithValue({
                ...currentError,
            });
        }
    }
);

export const getUserProfile = createAsyncThunk(
    "user/profile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserProfileService();
            return response;
        } catch (error: unknown) {
            const currentError = {
                message: error.response?.data?.message || "An error occurred",
                statusCode: error.response?.status,
            };

            if (error.response?.data?.errors) {
                currentError.errors = error.response?.data?.errors;
            }

            return rejectWithValue({
                ...currentError,
            });
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle user registration actions
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            });

        // Handle user login actions
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            });

        // Handle user logout actions
        builder
            .addCase(userLogout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle get user profile actions
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
