import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './Expense.module.css';
import ExpenseDate from '../expense_date/ExpenseDate';
import {FaTrash} from 'react-icons/fa';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineEye} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteExpense, expenseView } from '../../../store/features/expenseSlice';
import { openModal } from '../../../store/features/modalSlice';
const Expense = (props) => {
    const {id, category, amount, date, onPopulateToForm} = props;
    const dispatch = useDispatch();
    
    const deleteHander = () => {
        try {
            dispatch(deleteExpense({id}));
        } catch (error) {
            // console.log(error)
        }
    }
    const handleExpenseDetailView = () => {
        dispatch(expenseView({id}))
        dispatch(openModal())
    }
    return (
        <div className={classes.expense}>
            <ExpenseDate date={date} />
            <div className={classes['expense-content']}>
                <div className={classes.category}>{category}</div>
                <div className={classes.amount}><span>&#8377;</span>{amount}</div>
            </div>
            <div className={classes.action}>
                <Button onClick={handleExpenseDetailView} className='bg-success text-light fs-3'><AiOutlineEye/></Button>
                <Button onClick={() => onPopulateToForm(id)} className='bg-warning text-light fs-3'><BiEdit/></Button>
                <Button onClick={deleteHander} className='bg-danger text-light fs-3'><FaTrash/></Button>
            </div>
        </div>
  )
}

export default Expense