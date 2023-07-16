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
        return rejectWithValue(error.response.data)
    }
})

const authInitialState = {
    email: '',
    token: '',
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
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
                state.loading = false
                // console.log(action)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    }
})

export default authSlice.reducer