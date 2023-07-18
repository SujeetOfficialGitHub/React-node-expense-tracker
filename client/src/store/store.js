import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import expenseSlice from "./features/expenseSlice";
import modalSlice from "./features/modalSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        expenses: expenseSlice,
        modal: modalSlice
    }
})

export default store