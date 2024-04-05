import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../reducers/todoSlice'
import { authReducer } from "../reducers/auth";
import { regiserReducer } from "../reducers/register";

export const store =  configureStore ({
    reducer : {
        todos: todoReducer,
        auth: authReducer,
        register: regiserReducer
    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch