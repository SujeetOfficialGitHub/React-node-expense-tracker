import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

// Add Expenses 
export const addExpense = createAsyncThunk('expense/addExpense', async({data},{rejectWithValue}) => {
    try{
        const res = await axios.post(`/add-expense`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        return res.data;
    }catch(error){
        // console.log(error);
        return rejectWithValue(error.response.data);
    }
});

// Get all expenses 
export const getExpenses = createAsyncThunk('expense/getExpenses', async(_,{rejectWithValue}) => {
    try{
        const res = await axios.get(`/get-expenses`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        return res.data;
    }catch(error){
        return rejectWithValue(error.response.data)
    }
});


// Delete expense 
export const deleteExpense = createAsyncThunk('expense/deleteExpense', async({id},{rejectWithValue}) => {
    try{
        const res = await axios.delete(`/delete-expense/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        return res.data;
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data)
    }
});

// Update expense 
export const updateExpense = createAsyncThunk('expense/updateExpense', async({expenseId, data},{rejectWithValue}) => {
    try{
        const res = await axios.put(`/update-expense/${expenseId}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        return res.data;
    }catch(error){
        return rejectWithValue(error.response.data)
    }
});

const expenseInitialState = {
    expenses: [],
    expense: {},
    loading: false
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: expenseInitialState,
    reducers: {
        expenseView(state, action){
            state.expense = state.expenses.find(expense => expense.id === action.payload.id)
        },
        resetExpensesState(state){
            state.expenses = []
            state.expense = {}
        },
    },
    extraReducers: (builder) => {
        builder
            // Add expenses 
            .addCase(addExpense.pending, (state) => {
                state.loading = false
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action)
                state.expenses = [action.payload.expense, ...state.expenses]
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.loading = false;
                // console.log(action)
            })


            // Get All Expenses 
            .addCase(getExpenses.pending, (state) => {
                state.loading = false
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload;
                // console.log(action)
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.loading = false;
                // console.log(action)
            })


            // Delete Expense 
            .addCase(deleteExpense.pending, (state) => {
                state.loading = false
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = state.expenses.filter(expense => expense.id !== action.payload.expense.id)
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.loading = false;
                // console.log(action)
            })


            // Update Expenses 
            .addCase(updateExpense.pending, (state) => {
                state.loading = false
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.loading = false;
                const updatedExpense = action.payload.expense;
                const index = state.expenses.findIndex(expense => expense.id === updatedExpense.id);
                if (index !== -1) {
                    state.expenses[index] = updatedExpense;
                }
                // console.log(action);
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.loading = false;
                // console.log(action)
            })
    }
})
export const {expenseView, resetExpensesState} = expenseSlice.actions;
export default expenseSlice.reducer