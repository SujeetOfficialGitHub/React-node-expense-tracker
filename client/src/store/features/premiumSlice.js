import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLeaderboard = createAsyncThunk('premium/getLeaderboard', async(_, {rejectWithValue}) => {
    try{
        const res = await axios.get(`/leaderboard`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        return res.data;
    }catch(error){
        return rejectWithValue(error.response.data)
    }
})

const premiumSlice = createSlice({
    name: 'premium',
    initialState: {
        loading: false,
        leaderboardList: []
    },
    extraReducers: (builder) => {
        builder
            // Leaderboard
            .addCase(getLeaderboard.pending, (state) => {
                state.loading = true
            })
            .addCase(getLeaderboard.fulfilled, (state, action) => {
                state.loading = false;
                state.leaderboardList = action.payload
                // console.log(action)
            })
            .addCase(getLeaderboard.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    }
})

export default premiumSlice.reducer;