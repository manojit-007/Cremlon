import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice.js"
import ServiceSlice from "./ServiceSlice.js";

const Store = configureStore({
    reducer: {
        auth: AuthReducer, 
        service: ServiceSlice, 
    },
});

export default Store;
