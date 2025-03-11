import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice.js"
import ServiceSlice from "./ServiceSlice.js";
import PostSlice from "./PostSlice.js";

const Store = configureStore({
    reducer: {
        auth: AuthReducer, 
        service: ServiceSlice, 
        post: PostSlice, 
    },
});

export default Store;
