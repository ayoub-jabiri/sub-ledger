import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getSubscriptionsService,
    addSubscriptionService,
    updateSubscriptionService,
    deleteSubscriptionService,
} from "../services/subscription.services";
import type { SliceErrorResponse } from "../../types/auth.types";
import type {
    Subscription,
    SubscriptionPayload,
    SubscriptionState,
} from "../../types/subscription.types";

export const getSubscriptions = createAsyncThunk(
    "subscription/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSubscriptionsService();
            return response;
        } catch (error: unknown) {
            const currentError: SliceErrorResponse = {
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

export const addSubscription = createAsyncThunk(
    "subscription/add",
    async (subscriptionData: SubscriptionPayload, { rejectWithValue }) => {
        try {
            const response = await addSubscriptionService(subscriptionData);
            return response;
        } catch (error: unknown) {
            const currentError: SliceErrorResponse = {
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

export const updateSubscription = createAsyncThunk(
    "subscription/update",
    async (
        {
            id,
            subscriptionData,
        }: { id: string; subscriptionData: SubscriptionPayload },
        { rejectWithValue }
    ) => {
        try {
            const response = await updateSubscriptionService(
                id,
                subscriptionData
            );
            return response;
        } catch (error: unknown) {
            const currentError: SliceErrorResponse = {
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

export const deleteSubscription = createAsyncThunk(
    "subscription/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteSubscriptionService(id);
            return id;
        } catch (error: unknown) {
            const currentError: SliceErrorResponse = {
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

const initialState: SubscriptionState = {
    subscriptions: [],
    loading: false,
    error: null,
};

export const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetching all subscriptions actions
        builder
            .addCase(getSubscriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload;
                state.error = null;
            })
            .addCase(getSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle adding a subscription actions
        builder
            .addCase(addSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions.push(action.payload);
                state.error = null;
            })
            .addCase(addSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle updating a subscription actions
        builder
            .addCase(updateSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = state.subscriptions.map(
                    (subscription: Subscription) =>
                        subscription._id === action.payload._id
                            ? action.payload
                            : subscription
                );
                state.error = null;
            })
            .addCase(updateSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle deleting a subscription actions
        builder
            .addCase(deleteSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = state.subscriptions.filter(
                    (subscription: Subscription) =>
                        subscription._id !== action.payload
                );
                state.error = null;
            })
            .addCase(deleteSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default subscriptionSlice.reducer;
