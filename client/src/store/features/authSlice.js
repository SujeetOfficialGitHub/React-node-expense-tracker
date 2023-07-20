import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const signup = createAsyncThunk('auth/signup', async({enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/signup/`, enteredData);
        return res.data
    }catch(error){
        return rejectWithValue(error.response.data)
    }
})

export const login = createAsyncThunk('auth/login', async({enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/login/`, enteredData);
        return res.data
    }catch(error){
        // console.log(error)
        return rejectWithValue(error.response.data)
    }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async({email}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/password/forgot-password/`, {email});
        return res.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})

export const createNewPassword = createAsyncThunk('auth/createNewPassword', async({id, password1}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/password/create-new-password/${id}`, {password1});
        return res.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})

const authInitialState = {
    isLoggedIn: true ? localStorage.getItem('token') : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        logout(state){
            state.isLoggedIn = false;
            state.token = '';
            localStorage.removeItem('token')
        },
        updateToken(state, action){
            state.token = action.payload.token
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup 
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })

            // Login 
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            
            // Forgot Password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action)
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })

            // Create New Password 
            .addCase(createNewPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewPassword.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action)
            })
            .addCase(createNewPassword.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    }
})
export const {logout, updateToken} = authSlice.actions;
export default authSlice.reducer