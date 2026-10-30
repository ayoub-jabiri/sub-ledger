import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice.ts";
import subscriptionSlice from "./slices/subscription.slice.ts";

const store = configureStore({
    reducer: {
        auth: authSlice,
        subscription: subscriptionSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
