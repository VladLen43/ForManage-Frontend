import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../reducers/todoSlice'
import { authReducer } from "../reducers/auth";

export const store =  configureStore ({
    reducer : {
        todos: todoReducer,
        auth: authReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch