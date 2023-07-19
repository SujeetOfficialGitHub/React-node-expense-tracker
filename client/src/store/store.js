import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import expenseSlice from "./features/expenseSlice";
import modalSlice from "./features/modalSlice";
import paymentSlice from "./features/paymentSlice";
import premiumSlice from "./features/premiumSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        expenses: expenseSlice,
        modal: modalSlice,
        payment: paymentSlice,
        premium: premiumSlice
    }
})

export default store