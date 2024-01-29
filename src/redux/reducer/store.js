import { configureStore } from "@reduxjs/toolkit"
import {productApi } from "../api/productApi"
import { userReducer } from "./userReducer";
import { userApi } from "../api/userApi";

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
    reducer:{
        [productApi.reducerPath]:productApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [userReducer.name] :userReducer.reducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware,userApi.middleware),

}) 