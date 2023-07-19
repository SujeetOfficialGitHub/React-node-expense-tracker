import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const createOrder = createAsyncThunk('payment/createOrder', async({totalAmount}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`create-order/`, {amount: totalAmount}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        
        return res.data
    }catch(error){
        // console.log(error)
        return rejectWithValue(error.response.data)
    }
})

export const paymentSuccess = createAsyncThunk('payment/paymentSuccess', async({data}, {rejectWithValue}) => {
    try{
        const res = await axios.post(`/payment-success/`, data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        return res.data
    }catch(error){
        // console.log(error)
        return rejectWithValue(error.response.data)
    }
})


const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        loading: false
    },
    extraReducers: (builder) => {
        builder
            // Order Create 
            .addCase(createOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                // console.log(action)
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })

            // payment  success
            .addCase(paymentSuccess.pending, (state) => {
                state.loading = true
            })
            .addCase(paymentSuccess.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem('token', action.payload.token)
                // console.log(action)
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.loading = false
                // console.log(action)
            })
    }
})

export default paymentSlice.reducer