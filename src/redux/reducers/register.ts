import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'
import { user, userData } from "./types";


const data = {
    _id: '',
    fullName: '',
    email: '',
}

const initialState: userData = {
    data,
    status: 'loading',
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        
    }

})

export const regiserReducer = registerSlice.reducer