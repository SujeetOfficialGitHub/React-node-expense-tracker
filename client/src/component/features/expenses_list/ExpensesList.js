import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner} from 'react-bootstrap';

import classes from './ExpensesList.module.css';
import Expense from '../expense/Expense';
import FilterExpenses from '../filter_expenses/FilterExpenses';
import { getExpenses } from '../../../store/features/expenseSlice';


const ExpensesList = (props) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [error, setError] = useState('');

  
    
    const dispatch = useDispatch();
    
    // Fetch All Expenses 
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                await dispatch(getExpenses()).unwrap();
            }catch (error) {
                if (error && error.message){
                    setError(error.message)
                }
                // console.log(error);
            }
        };
        fetchExpenses();
    }, [dispatch]);

    const {expenses, loading} = useSelector(state => state.expenses);
    const [filteredData, setFilteredData] = useState(expenses);


    // Filter Data 
    useEffect(() => {
        let filteredExpenses = expenses;

        if (selectedYear && selectedYear !== 'all') {
          filteredExpenses = filteredExpenses.filter((expense) => {
            const itemYear = new Date(expense.createdAt).getFullYear();
            return itemYear.toString() === selectedYear;
          });
        }
    
        if (selectedMonth && selectedMonth !== 'all') {
          filteredExpenses = filteredExpenses.filter((expense) => {
            const itemMonth = (new Date(expense.createdAt).getMonth() + 1).toString().padStart(2, '0');
            return itemMonth === selectedMonth;
          });
        }
    
        if (selectedDay && selectedDay !== 'all') {
          filteredExpenses = filteredExpenses.filter((expense) => {
            const itemDay = new Date(expense.createdAt).getDate().toString().padStart(2, '0');
            return itemDay === selectedDay;
          });
        }
    
        setFilteredData(filteredExpenses);
      }, [expenses, selectedYear, selectedMonth, selectedDay]);

    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
        // console.log(selectedYear)
    };

    const handleMonthChange = (selectedMonth) => {
        setSelectedMonth(selectedMonth);
        // console.log(selectedMonth)
    };

    const handleDayChange = (selectedDay) => {
        setSelectedDay(selectedDay);
      };

    // const totalExpensesAmount = expenses.reduce((initialVal, currVal) => initialVal + parseInt(currVal.amount), 0 )
    return (
        <div className={classes['expense-list']}>
            <FilterExpenses 
                onYearChange={handleYearChange} 
                onMonthChange={handleMonthChange} 
                onDayChange={handleDayChange}
            />
            {error && filteredData.length === 0 ? (
                    <p className={classes['not-found']}>No expenses found.</p>
            ) : (
            filteredData.map(expense => (
                <Expense
                    key={expense.id}
                    id={expense.id}
                    category={expense.category}
                    amount={expense.amount}
                    description={expense.description}
                    date={expense.createdAt}
                    onPopulateToForm={props.onPopulateToForm}
                />
                ))
            )}
        {loading && <Spinner animation="border" className="d-block mx-auto m-3" variant="primary" />}
        </div>
  );
};

export default ExpensesList;
