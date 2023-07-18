import React, { useState } from 'react'
import ExpenseForm from '../../component/common/ExpenseForm'
import classes from './Home.module.css'
import ExpensesList from '../../component/features/expenses_list/ExpensesList'
import { addExpense, updateExpense } from '../../store/features/expenseSlice'
import {useDispatch, useSelector} from 'react-redux'
import Helmet from '../../component/common/Helmet'
import CustomModal from '../../component/common/CustomModal'
import ExpenseView from '../../component/common/ExpenseView'
import { openModal } from '../../store/features/modalSlice'

const Home = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [expenseId, setExpenseId] = useState('');
  
    const dispatch = useDispatch();
    const expense = useSelector(state => state.expenses.expense)
  
    const handleFormSubmit = async (data) => {
		if (expenseId) {
			// If expenseId send data for update 
			try {
				const result = await dispatch(updateExpense({ expenseId, data })).unwrap();
				if (result && result.message) {
					setMessage(result.message);
				}
			} catch (error) {
				if (error && error.message) {
					setError(error.message);
				}
			}
			setExpenseId('');
		// If not expenseId create new data
		} else {
			try {
				const result = await dispatch(addExpense({ data })).unwrap();
				if (result && result.message) {
					setMessage(result.message);
				}
			} catch (error) {
				if (error && error.message) {
					setError(error.message);
				}
			}
		}
    };

    const populateDatatoForm = (id) => {
		setExpenseId(id);
		dispatch(openModal())

    };

	// When modal is close reset form data 
    const resetForm = () => {
      	setExpenseId('')
    }

	// Clear error and message after some time 
    if (error || message){
		setTimeout(() => {
			setMessage("")
			setError("")
		},10000)
  	}

    return (
      <Helmet title="Home">
        <ExpensesList onPopulateToForm={populateDatatoForm} />
        {expense && expense.id ? (
           <CustomModal 
           classes={classes}
           modalTitle = "Expense Detail"
           modalLaunchButtonText = "+"
         >
          <ExpenseView expense={expense} />
         </CustomModal>
        ) : (
          <CustomModal 
          classes={classes}
          modalTitle = "Add Expense"
          modalLaunchButtonText = "+"
          error={error}
          message={message}
          onResetForm={resetForm}
        >
          <ExpenseForm 
            classes={classes}
            onSubmit={handleFormSubmit}
            expenseId={expenseId}
          />
        </CustomModal>
        )}
        
      </Helmet>
    );
  };
  
  export default Home;