import React from 'react'
import classes from './ExpenseDate.module.css'
const ExpenseDate = ({date}) => {
    const d = new Date(date)
    const day = d.getDate()
    const month = d.toLocaleString('en', {month: 'short'})
    const year = d.getFullYear()
  return (
    <div className={classes.date}>
        <div className={`${classes.day} fs-2`}><b>{day}</b></div>
        <div className={`${classes.month} fs-4`}>{month}</div>
        <div className={`${classes.year} fs-5`}>{year}</div>
    </div>
  )
}

export default ExpenseDate