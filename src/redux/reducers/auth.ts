import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (params) => {
        const  { data }  = await axios.post('/auth/login', params)
        return data;
    }
)

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe',
    async () => {
        const { data } = await axios.get('/auth/me')
        return data;
    }
)

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserData.pending, (state) => {
            state.status ='loading';
            state.data = null;
        })
        .addCase(fetchUserData.fulfilled, (state,action) => {
            state.status = 'loaded';
            state.data = action.payload
        })
        .addCase(fetchUserData.rejected, (state,action) => {   
            state.status = 'error'
            state.data = null;
        })
        .addCase(fetchAuthMe.pending, (state) => {
            state.status ='loading';
            state.data = null;
        })
        .addCase(fetchAuthMe.fulfilled, (state,action) => {
            state.status = 'loaded';
            state.data = action.payload
        })
        .addCase(fetchAuthMe.rejected, (state,action) => {   
            state.status = 'error'
            state.data = null;
        })
    }
})

export const isAuth = (state: any) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const { logout} = authSlice.actions