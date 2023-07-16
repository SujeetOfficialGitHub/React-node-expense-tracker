import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const signup = createAsyncThunk('auth/signup', async({enteredData}, {rejectWithValue}) => {
    try{
        const res = await axios(``)
    }catch(error){
        return rejectWithValue(error.response.data.errors)
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
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                console.log(action)
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                console.log(action)
            })
    }
})

export default authSlice.reducer