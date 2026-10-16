import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice.ts";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export default store;
