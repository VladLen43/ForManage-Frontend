import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'




const initialState = {
    data: null,
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